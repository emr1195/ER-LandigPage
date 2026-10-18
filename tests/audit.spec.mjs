import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'
import pg from 'pg'

test('una publicación aparece en Actividad con autor y antes/después', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  await page
    .getByLabel('Título principal', {exact: true})
    .fill('Título con auditoría')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  await page.getByRole('link', {name: 'Actividad', exact: true}).click()
  await expect(page.getByText('admin@example.test').last()).toBeVisible()
  await page.getByRole('button', {name: 'Ver cambios'}).first().click()
  await expect(
    page.getByRole('heading', {name: 'Detalle de la actividad'}),
  ).toBeVisible()
  await expect(
    page.getByText('Título con auditoría', {exact: true}),
  ).toBeVisible()
  const list = await page.request.get('/api/activity')
  expect(list.ok()).toBeTruthy()
  const {items} = await list.json()
  expect(items[0].actor_email).toBe('admin@example.test')
  const detail = await (
    await page.request.get('/api/activity/' + items[0].id)
  ).json()
  expect(detail.after.textSection.title).toBe('Título con auditoría')
  expect(detail.before.textSection.title).not.toBe(
    detail.after.textSection.title,
  )
})

test('si falla el registro de auditoría no se confirma contenido ni revisión', async ({
  request,
}) => {
  await signIn(request)
  const current = await request.get('/api/site-sections/history')
  const before = await current.json()
  const eventsBefore = await (await request.get('/api/activity')).json()
  const control = new pg.Pool({
    connectionString:
      'postgresql://test_admin@127.0.0.1:55439/er_dashboard_test',
  })
  try {
    await control.query(
      "create or replace function test_reject_activity() returns trigger language plpgsql as $$ begin if new.after_data->>'title' = 'Atomicity failure marker' then raise exception 'Test audit unavailable'; end if; return new; end; $$",
    )
    await control.query(
      'create trigger test_reject_activity before insert on activity_events for each row execute function test_reject_activity()',
    )
    const response = await request.put('/api/site-sections/history', {
      headers: {'If-Match': current.headers().etag},
      data: {...before, title: 'Atomicity failure marker'},
    })
    expect(response.status()).toBe(500)
    const after = await request.get('/api/site-sections/history')
    expect(await after.json()).toEqual(before)
    expect(after.headers().etag).toBe(current.headers().etag)
    expect((await (await request.get('/api/activity')).json()).items).toEqual(
      eventsBefore.items,
    )
  } finally {
    await control.query(
      'drop trigger if exists test_reject_activity on activity_events',
    )
    await control.query('drop function if exists test_reject_activity()')
    await control.end()
  }
})
