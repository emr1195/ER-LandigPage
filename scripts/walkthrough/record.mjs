import {chromium,expect} from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import {execFileSync} from 'node:child_process'
import {createHash} from 'node:crypto'
import {installPointer} from './annotations.mjs'
import {createControls} from './controls.mjs'
import {startDemoStack} from './stack.mjs'
import {portadaScenes} from './portada-scenes.mjs'
import {eventScenes,eventName} from './event-scenes.mjs'

const rehearsal=process.argv.includes('--rehearsal')
const pilot=process.argv.includes('--pilot')
const speed=rehearsal?.025:pilot?.45:1
const origin='http://127.0.0.1:3410'
const output=path.resolve('.tmp/walkthrough.local',`${rehearsal?'rehearsal':pilot?'pilot':'take'}-${Date.now()}`)
fs.mkdirSync(output,{recursive:true})
const assets=path.join(output,'assets')
fs.mkdirSync(path.join(output,'screenshots'))
execFileSync('python',['-X','utf8','scripts/walkthrough/prepare_art.py',assets],{windowsHide:true})
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms*speed))
const checks={},scenes=[],sources={},errors=[]
const applicationCommit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()
const userContentHash=async()=>{
  try {const response=await fetch('http://localhost:3002/api/site-sections');return createHash('sha256').update(JSON.stringify(await response.json())).digest('hex')}
  catch{return null}
}

async function capture(browser,name,viewport,storageState) {
  const context=await browser.newContext({viewport,deviceScaleFactor:1,locale:'es-ES',reducedMotion:'reduce',storageState,
    ...(!rehearsal?{recordVideo:{dir:path.join(output,'raw'),size:viewport}}:{})})
  await context.addInitScript(installPointer)
  const wallStart=performance.now(),page=await context.newPage()
  page.on('pageerror',error=>errors.push(error.message))
  const c=await createControls(page,{pause,speed,rehearsal})
  const visit=async route=>{
    await page.goto(origin+route)
    await page.locator('h1,h2').first().waitFor()
    await page.evaluate(()=>document.fonts.ready)
    await c.reset()
  }
  const synchronize=async()=>{
    const before=performance.now()
    await page.evaluate(()=>window.captureAnnotations.sync())
    const syncWallTime=((before+performance.now())/2-wallStart)/1000
    await new Promise(resolve=>setTimeout(resolve,350))
    sources[name]={width:viewport.width,height:viewport.height,syncWallTime}
  }
  const scene=async(id,title,seconds,captions,action,options={})=>{
    const start=(performance.now()-wallStart)/1000
    console.log(`Escena ${id}: ${title}`)
    await pause(400)
    await action()
    const remaining=seconds*speed-((performance.now()-wallStart)/1000-start)
    if(remaining>0)await new Promise(resolve=>setTimeout(resolve,remaining*1000))
    scenes.push({id,title,seconds,start,rawSeconds:(performance.now()-wallStart)/1000-start,source:name,captions,...options})
    if(['texto','sitio','auditoria','preferencia','movil-edicion'].includes(id))
      await page.screenshot({path:path.join(output,'screenshots',id+'.png')})
  }
  const close=async()=>{
    const video=page.video()
    await context.close()
    if(video){const file=path.join(output,'raw',name+'.webm');await video.saveAs(file);sources[name].file=path.relative(output,file)}
  }
  return {context,page,c,visit,synchronize,scene,close}
}

const before=await userContentHash()
const stop=await startDemoStack(output)
let browser,desktop,mobile
try{
  browser=await chromium.launch({channel:'chrome'})
  desktop=await capture(browser,'desktop',{width:1440,height:760})
  await desktop.visit('/auth/login')
  await desktop.synchronize()
  await portadaScenes({...desktop,assets,origin,checks,pause})
  if(!pilot){
    await eventScenes({...desktop,assets,origin,checks,pause})
    await desktop.visit('/dashboard/heroSection')
    await desktop.scene('apariencias','12 / Tu apariencia, a tu manera',12,[
      'Carbon & Azure y Petrol & Apricot: dos apariencias claras.',
      'Tu cuenta recuerda la apariencia elegida.',
    ],async()=>{
      await desktop.c.select(desktop.page.getByLabel('Apariencia personal'),'petrol-apricot')
      await expect(desktop.page.getByText('Apariencia guardada.',{exact:true})).toBeVisible()
      await desktop.c.highlight(desktop.page.getByLabel('Apariencia personal'),1200)
    })
    await desktop.page.reload()
    await expect(desktop.page.getByLabel('Apariencia personal')).toHaveValue('petrol-apricot')
    await desktop.page.evaluate(()=>document.fonts.ready)
    await desktop.c.reset()
    await desktop.scene('preferencia','13 / La elección se conserva',6,[
      'Después de recargar, tu apariencia sigue aquí.',
    ],async()=>{checks.appearance='petrol-apricot';await pause(1500)})
    const storageState=await desktop.context.storageState()
    mobile=await capture(browser,'mobile',{width:390,height:844},storageState)
    await mobile.visit('/dashboard')
    await mobile.synchronize()
    await mobile.scene('movil-nav','14 / Tu comunidad, en cada pantalla',12,[
      'Navegación real en una pantalla móvil.',
    ],async()=>{
      await mobile.c.click(mobile.page.getByRole('button',{name:'Abrir navegación',exact:true}))
      await pause(1400)
      await mobile.c.click(mobile.page.getByRole('link',{name:'Eventos',exact:true}))
      await expect(mobile.page.getByRole('heading',{name:'Eventos',exact:true,level:1})).toBeVisible()
    })
    await mobile.scene('movil-edicion','15 / Edita y revisa desde el móvil',12,[
      'El evento publicado también está disponible desde el móvil.',
      'Revisa la vista previa con el mismo contenido.',
    ],async()=>{
      const row=mobile.page.locator('details.admin-record').filter({hasText:eventName})
      await mobile.c.click(row.locator(':scope > summary'))
      await expect(row.getByLabel('Nombre del evento',{exact:true})).toHaveValue(eventName)
      await mobile.c.highlight(row.getByLabel('Nombre del evento',{exact:true}),1000)
      await mobile.c.click(mobile.page.getByRole('button',{name:'Vista previa',exact:true}))
      await expect(mobile.page.frameLocator('iframe').getByRole('heading',{name:'Próximas aventuras · Demostración'})).toBeAttached()
      checks.mobile={width:390,height:844,event:eventName,realViewport:true}
    })
    await mobile.close();mobile=null
    await desktop.scene('cierre','Edita, revisa y publica',8,[
      'Cada publicación tiene un registro de sus cambios.',
      'Encuentra el video y la guía de configuración en el README.',
    ],async()=>{await desktop.c.highlight(desktop.page.getByRole('link',{name:'Actividad',exact:true}),1000)})
  }
  expect(errors).toEqual([])
  const after=await userContentHash()
  if(before)expect(after).toBe(before)
  checks.userContentUnchanged=before?true:'not running; no request was made to its database'
  checks.browserErrors=errors
  await desktop.close();desktop=null
  const manifest={applicationCommit,origin,rehearsal,pilot,checks,sources,scenes}
  fs.writeFileSync(path.join(output,'manifest.json'),JSON.stringify(manifest,null,2)+'\n')
  fs.writeFileSync('.tmp/walkthrough.local/latest.json',JSON.stringify({output},null,2))
  console.log(JSON.stringify({output,checks,scenes:scenes.length,targetSeconds:scenes.reduce((sum,s)=>sum+s.seconds,0)}))
}catch(error){
  if(desktop)await desktop.page.screenshot({path:path.join(output,'failure.png'),fullPage:true}).catch(()=>{})
  throw error
}finally{
  await mobile?.context.close();await desktop?.context.close();await browser?.close();stop()
}
