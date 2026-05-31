import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

app.post('/api/extract-invoice', async (c) => {
  await new Promise(r => setTimeout(r, 2000))
  return c.json({
    status: 'success',
    data: {
      equipmentType: 'Caterpillar 320 Excavator',
      amount: 150000,
      dealer: 'Foley INC',
      wireInstructions: {
        bankName: 'JPMorgan Chase',
        accountEnd: '8842',
        routingEnd: '1102'
      }
    }
  })
})

app.post('/api/match-lenders', async (c) => {
  await new Promise(r => setTimeout(r, 2500))
  return c.json({
    status: 'success',
    data: [
      { id: 'l_1', name: 'Meridian Credit Partners', type: 'Direct Lender', fit: 98, yieldSpread: '2.4%' },
      { id: 'l_2', name: 'Blackford Harbor BDC', type: 'Senior Secured', fit: 89, yieldSpread: '2.8%' },
      { id: 'l_3', name: 'Northbank Capital', type: 'Commercial Bank', fit: 75, yieldSpread: '1.9%' },
    ]
  })
})

app.post('/api/execute-wire', async (c) => {
  await new Promise(r => setTimeout(r, 2000))
  return c.json({
    status: 'success',
    data: {
      transactionId: 'fed_9938472948',
      network: 'Fedwire',
      status: 'settled',
      amount: 150000,
      timestamp: new Date().toISOString()
    }
  })
})

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
