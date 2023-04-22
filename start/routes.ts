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

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.get('/crud', 'CrudappsController.index')
  Route.post('/crud', 'CrudappsController.store')
  Route.delete('/crud/:id', 'CrudappsController.destroy')
  Route.put('/crud/:id', 'CrudappsController.update')
  Route.get('/crud/:id', 'CrudappsController.show')

  // Route.resource('/crud', 'CrudappsController').apiOnly()
}).prefix('api')
