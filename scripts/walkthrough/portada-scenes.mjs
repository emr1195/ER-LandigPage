import {expect} from '@playwright/test'

export const demoTitle = 'Una nueva aventura comienza aquí'
export const demoDescription = 'Una comunidad donde cada aventura nos invita a aprender, compartir y servir juntos.'

export async function portadaScenes({page, c, scene, visit, pause, assets, origin, checks}) {
  const title = () => page.getByLabel('Título principal', {exact:true})
  const save = () => page.getByRole('button', {name:'Guardar y publicar',exact:true})
  const original = await (await page.request.get(origin+'/api/site-sections/heroSection')).json()
  await scene('acceso','01 / Un espacio para tu comunidad',16,[
    'Exploradores del Rey · Administración del sitio',
    'Actualiza el contenido de tu comunidad sin editar código. Datos ficticios de demostración.',
  ],async()=>{
    await c.type(page.getByLabel('Correo electrónico'), 'admin@example.test')
    await c.type(page.getByLabel('Contraseña',{exact:true}), 'Dashboard-test-2026!')
    await c.click(page.getByRole('button',{name:'Ingresar',exact:true}))
    await expect(page.locator('.admin-sidebar')).toBeVisible()
  })
  await scene('inicio','02 / Elige qué quieres actualizar',10,[
    'Nueve secciones para mantener tu sitio desde un mismo lugar.',
  ],async()=>{
    await c.highlight(page.getByRole('link',{name:'Portada',exact:true}),1200)
    await c.nav('Portada')
    await expect(title()).toBeVisible()
    await expect(page.frameLocator('iframe').getByText(original.textSection.title, {exact:true})).toBeAttached()
  })
  await scene('texto','03 / Dale voz a tu portada',24,[
    'Edita el mensaje principal y su descripción.',
    'Tus cambios todavía son un borrador: los visitantes aún no los ven.',
  ],async()=>{
    await c.type(title(),demoTitle)
    await c.type(page.getByLabel('Descripción',{exact:true}),demoDescription)
    await c.highlight(title(),1200)
    expect((await (await page.request.get(origin+'/api/site-sections/heroSection')).json()).textSection.title).toBe(original.textSection.title)
  },{camera:{x:.42,y:.48}})
  let uploaded
  await scene('imagen','04 / Actualiza también las imágenes',14,[
    'Sube una imagen y revisa cómo acompaña tu mensaje.',
  ],async()=>{
    await c.click(page.getByRole('tab',{name:'Imágenes',exact:true}))
    await c.upload(page.getByLabel('Subir Imagen superior izquierda',{exact:true}),assets+'/portada.png')
    const url=page.getByLabel('Imagen superior izquierda',{exact:true})
    await expect(url).toHaveValue(/\/api\/uploads\/files\//)
    uploaded=await url.inputValue()
    await expect(page.getByAltText('Imagen actual: Imagen superior izquierda',{exact:true})).toHaveAttribute('src',uploaded)
    await pause(1000)
    await c.click(page.getByRole('tab',{name:'Texto',exact:true}))
  })
  await scene('preview','05 / Mira el resultado antes de publicar',20,[
    'Comprueba la vista previa en distintos tamaños de pantalla.',
    'Amplía el resultado y vuelve a la edición cuando quieras.',
  ],async()=>{
    await c.select(page.getByLabel('Dispositivo de vista previa'),'mobile')
    await pause(1600)
    await c.select(page.getByLabel('Dispositivo de vista previa'),'desktop')
    await c.click(page.getByRole('button',{name:'Ampliar vista previa'}))
    await expect(page.getByRole('dialog',{name:'Vista previa ampliada'})).toBeVisible()
    await pause(1800)
    await c.click(page.getByRole('button',{name:'Cerrar vista ampliada'}))
  })
  await scene('proteccion','06 / Continúa con confianza',18,[
    'El panel avisa si intentas salir con cambios sin guardar.',
    'Corrige los campos necesarios antes de publicar.',
  ],async()=>{
    await c.click(page.getByRole('link',{name:'Historia',exact:true}))
    await expect(page.getByRole('dialog',{name:'Cambios sin guardar'})).toBeVisible()
    await pause(1000)
    await c.click(page.getByRole('button',{name:'Seguir editando'}))
    await c.type(title(),'')
    await c.click(save())
    await expect(title()).toHaveAttribute('aria-invalid','true')
    await pause(1400)
    await c.type(title(),demoTitle)
  })
  await scene('publicar','07 / Comparte los cambios con tu comunidad',10,[
    'Guardar y publicar hace visibles los cambios en tu sitio.',
  ],async()=>{
    await c.click(save())
    await expect(page.getByRole('status').filter({hasText:'Contenido publicado'})).toBeVisible()
    await c.highlight(page.getByRole('status').filter({hasText:'Contenido publicado'}),1000)
    const saved=await (await page.request.get(origin+'/api/site-sections/heroSection')).json()
    expect(saved.textSection.title).toBe(demoTitle)
    expect(saved.imageSection.imageTopLeft.imageURL).toBe(uploaded)
    checks.portada={title:demoTitle,image:uploaded,draftWasPrivate:true}
  },{camera:{x:.60,y:.86}})
  await visit('/')
  await expect(page.getByText(demoTitle,{exact:true})).toBeVisible()
  await scene('sitio','08 / El resultado ya está en la página pública',12,[
    'El título y la imagen publicados aparecen en la página que ven tus visitantes.',
  ],async()=>{
    await c.highlight(page.getByText(demoTitle,{exact:true}),1400)
    await expect.poll(()=>page.locator('*').evaluateAll((els,url)=>els.some(el=>el.getAttribute('src')===url||getComputedStyle(el).backgroundImage.includes(url)),uploaded)).toBe(true)
  })
}
