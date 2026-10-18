import {existsSync} from 'node:fs'
import path from 'node:path'

export function resolvePostgresBin() {
  const binaryDirectory = [
    process.env.PG_BIN,
    'C:/Program Files/PostgreSQL/18/bin',
    'C:/Program Files/PostgreSQL/17/bin',
  ].find(directory => directory && ['initdb.exe', 'pg_ctl.exe'].every(binary => existsSync(path.join(directory, binary))))
  if (!binaryDirectory)
    throw new Error('Configura PG_BIN para ejecutar PostgreSQL de prueba aislado.')
  return binaryDirectory
}
