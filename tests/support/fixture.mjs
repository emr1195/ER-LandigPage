import {test as base, expect} from '@playwright/test'
import pg from 'pg'
import {createDemoSiteSections} from '../../server/data/demo-site-sections.js'

// Each scenario owns fresh content/history/preferences in the harness-only DB.
// This URL is deliberately independent of the developer's .env.
export const test = base.extend({
  freshDashboard: [async ({}, use) => {
    const pool = new pg.Pool({connectionString: 'postgresql://test_admin@127.0.0.1:55439/er_dashboard_test'})
    try {
      await pool.query('truncate activity_events restart identity')
      await pool.query('truncate admin_preferences')
      await pool.query('delete from site_sections')
      for (const [key, data] of Object.entries(createDemoSiteSections())) await pool.query('insert into site_sections (id,data) values ($1,$2)', [key, data])
    } finally {await pool.end()}
    await use()
  }, {auto: true}],
})
export {expect}
