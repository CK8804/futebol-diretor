import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'futebol-diretor-sim-f5duup2o',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_tDBgVqlzSlamHIPbXhVFi6RnfMZTYiQ1',
  authRequired: false,
  auth: { mode: 'managed' },
})
