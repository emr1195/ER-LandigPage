import {spawn, spawnSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {randomUUID} from 'node:crypto'
import {resolvePostgresBin} from '../../tests/support/postgres.mjs'

export async function startDemoStack(output) {
  const pgBin = resolvePostgresBin()
  for (const port of [3410, 3411]) {
    try {
      await fetch(`http://127.0.0.1:${port}/api/health`, {signal: AbortSignal.timeout(1000)})
      throw new Error(`El puerto ${port} está ocupado. No ejecutes pruebas y captura a la vez.`)
    } catch (error) {
      if (error.message.includes('ocupado')) throw error
    }
  }
  const scratch = path.resolve('.tmp/dashboard-test.local')
  fs.mkdirSync(scratch, {recursive: true})
  const lock = path.join(scratch, 'walkthrough.lock')
  const token = randomUUID()
  fs.writeFileSync(lock, JSON.stringify({pid: process.pid, token}), {flag: 'wx'})
  const log = fs.openSync(path.join(output, 'stack.log'), 'a')
  const child = spawn(process.execPath, ['tests/support/run-stack.mjs'], {
    env: {...process.env, WALKTHROUGH_LEASE: token}, windowsHide: true,
    stdio: ['ignore', log, log],
  })
  let spawnError
  let stopped = false
  child.on('error', error => { spawnError = error })
  const stop = () => {
    if (stopped) return
    stopped = true
    if (child.pid && child.exitCode === null)
      spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], {windowsHide: true, stdio: 'ignore'})
    const data = path.join(scratch, 'postgres')
    spawnSync(path.join(pgBin, 'pg_ctl.exe'), ['-D', data, '-m', 'fast', '-w', 'stop'], {windowsHide: true, stdio: 'ignore'})
    if (fs.existsSync(lock) && JSON.parse(fs.readFileSync(lock, 'utf8')).token === token) fs.unlinkSync(lock)
    fs.closeSync(log)
  }
  process.once('exit', stop)
  try {
    for (let attempt = 0; attempt < 150; attempt++) {
      if (spawnError) throw spawnError
      if (child.exitCode !== null) throw new Error('El entorno de demostración terminó; revisa stack.log.')
      try {
        if ((await fetch('http://127.0.0.1:3410/api/health', {signal: AbortSignal.timeout(1000)})).ok) return stop
      } catch { /* The harness is still starting. */ }
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    throw new Error('No inició el entorno de demostración; revisa stack.log.')
  } catch (error) {
    stop()
    throw error
  }
}
