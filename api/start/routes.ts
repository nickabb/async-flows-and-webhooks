/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import axios from 'axios'
import DocumentReview from 'App/Models/DocumentReview'

const OUR_API = 'http://adonis_app:3333'
const HELP_DESK_API = 'http://external_api:8080'

Route.get('/', async () => {
  const documentToReview = 'https://boot.dev/community'
  const response = await axios.post(
    `${HELP_DESK_API}/document`,
    { documentUrl: documentToReview },
    { headers: { 'X-Callback-Url': `${OUR_API}/document/update` } }
  )

  await DocumentReview.create({
    documentUrl: documentToReview,
    agentId: response.data.agentId,
    documentId: response.data.documentId,
    documentStatus: 'PENDING_REVIEW',
  })
})

Route.post('/document/update', async ({ request }) => {
  const { agentId, documentId, documentStatus } = request.body()

  await DocumentReview.query()
    .where('documentId', documentId)
    .update({ agentId: agentId, documentStatus: documentStatus })
})

Route.group(() => {
  Route.post('authorizations', 'AuthorizationsController.process')
})
