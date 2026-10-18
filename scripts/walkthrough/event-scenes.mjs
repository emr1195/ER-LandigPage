import {expect} from '@playwright/test'
import {demoTitle, demoDescription} from './portada-scenes.mjs'

export const eventName = 'Jornada de exploradores'
export async function eventScenes({page,c,scene,visit,assets,origin,checks,pause}) {
  await visit('/dashboard/events')
  const before=await (await page.request.get(origin+'/api/site-sections/events')).json()
  const removed=before.events.find(event=>event.title==='Encuentro de familias (demo)')
  expect(removed).toBeTruthy()
  await scene('crear-evento','09 / Prepara la próxima actividad',24,[
    'Agrega un evento con fecha, lugar, equipo organizador e imagen.',
    'Prepara todos los cambios antes de publicarlos.',
  ],async()=>{
    await c.click(page.getByRole('button',{name:'Agregar eventos',exact:true}))
    const row=page.locator('details.admin-record').last()
    await c.type(row.getByLabel('Nombre del evento',{exact:true}),eventName)
    await c.type(row.getByLabel('Lugar del evento',{exact:true}),'Parque de la comunidad')
    await c.type(row.getByLabel('Organiza',{exact:true}),'Equipo de demostración')
    await c.type(row.getByLabel('Fecha del evento',{exact:true}),'30 de noviembre de 2026')
    await c.type(row.getByLabel('Hora del evento',{exact:true}),'09:00 a. m.')
    await c.upload(row.getByLabel('Subir Imagen del evento',{exact:true}),assets+'/evento.png')
    await expect(row.getByLabel('Imagen del evento',{exact:true})).toHaveValue(/\/api\/uploads\/files\//)
    await c.click(row.locator(':scope > summary'))
  })
  await scene('eliminar-evento','10 / Una baja espera a la publicación',14,[
    'Confirma la eliminación del evento que ya no necesitas.',
    'La creación y la baja se hacen públicas al guardar y publicar.',
  ],async()=>{
    const row=page.locator('details.admin-record').filter({hasText:removed.title})
    await c.click(row.locator(':scope > summary'))
    await c.click(page.getByRole('button',{name:'Eliminar '+removed.title,exact:true}))
    await expect(page.getByRole('dialog',{name:'¿Eliminar este elemento?'})).toBeVisible()
    await pause(900)
    await c.click(page.getByRole('button',{name:'Confirmar eliminación',exact:true}))
    expect((await (await page.request.get(origin+'/api/site-sections/events')).json()).events).toEqual(before.events)
    await c.click(page.getByRole('button',{name:'Guardar y publicar',exact:true}))
    await expect(page.getByRole('status').filter({hasText:'Contenido publicado'})).toBeVisible()
    const after=await (await page.request.get(origin+'/api/site-sections/events')).json()
    const added=after.events.find(event=>event.title===eventName)
    expect(added).toBeTruthy()
    expect(after.events.some(event=>event.id===removed.id)).toBe(false)
    expect(after.events).toHaveLength(before.events.length)
    for(const event of before.events.filter(event=>event.id!==removed.id))
      expect(after.events.find(item=>item.id===event.id)).toEqual(event)
    checks.events={created:eventName,createdId:added.id,removed:removed.title,removedId:removed.id,count:after.events.length,pendingUntilPublication:true}
  })
  await c.nav('Actividad')
  await expect(page.getByRole('button',{name:'Ver cambios'}).first()).toBeVisible()
  await scene('auditoria','11 / Consulta quién publicó y qué cambió',22,[
    'Actividad muestra el autor y el momento de cada publicación.',
    'Compara Antes y Después, incluida la eliminación del evento.',
  ],async()=>{
    const panel=page.locator('[aria-label="Detalle de la actividad"]')
    const publicationRow = section => page.locator('.admin-activity-list article').filter({has:page.getByRole('heading',{name:'Contenido publicado · '+section,exact:true})})
    await c.click(publicationRow('Portada').getByRole('button',{name:'Ver cambios'}))
    await expect(panel.getByText(demoTitle,{exact:true})).toBeVisible()
    await c.highlight(panel.getByText(demoTitle,{exact:true}),1200)
    await pause(1000)
    await c.click(publicationRow('Eventos').getByRole('button',{name:'Ver cambios'}))
    await expect(panel.getByRole('heading',{name:/Encuentro de familias/}).first()).toBeVisible()
    await expect(panel).toBeVisible()
    await c.highlight(panel.getByRole('heading',{name:'Detalle de la actividad'}),1200)
    await c.highlight(panel.getByRole('heading',{name:'Después'}).first(),1000)
    const list=(await (await page.request.get(origin+'/api/activity')).json()).items
    const publications=list.filter(item=>item.action==='publication')
    expect(publications).toHaveLength(2)
    const eventPublication=publications.find(item=>item.section_key==='events')
    const heroPublication=publications.find(item=>item.section_key==='heroSection')
    const heroDetail=await (await page.request.get(origin+'/api/activity/'+heroPublication.id)).json()
    expect(heroDetail.actor_email).toBe('admin@example.test')
    expect(heroDetail.before.textSection.title).not.toBe(demoTitle)
    expect(heroDetail.after.textSection.title).toBe(demoTitle)
    expect(heroDetail.after.textSection.description).toBe(demoDescription)
    const eventDetail=await (await page.request.get(origin+'/api/activity/'+eventPublication.id)).json()
    expect(eventDetail.actor_email).toBe('admin@example.test')
    expect(eventDetail.before.events.some(event=>event.id===removed.id)).toBe(true)
    expect(eventDetail.after.events.some(event=>event.id===removed.id)).toBe(false)
    expect(eventDetail.after.events.some(event=>event.title===eventName)).toBe(true)
    checks.audit={publications:publications.length,actor:eventDetail.actor_email,eventId:eventPublication.id,heroEventId:heroPublication.id,beforeAfterVerified:true,heroBeforeAfterVerified:true,detailsShown:['heroSection','events']}
  },{camera:{x:.52,y:.58}})
}
