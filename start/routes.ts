import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return 'Funciona ws'
})

Route.group(() => {
  Route.group(() => {
    Route.get('/articles', 'ArticlesController.index');
    Route.get('/articles/:id', 'ArticlesController.show');
    Route.post('/articles', 'ArticlesController.store');
    Route.put('/articles/:id', 'ArticlesController.update');
    Route.delete('/articles/:id', 'ArticlesController.destroy');
  })
  .middleware('jwt');

  Route.post('/login', 'AuthController.login');
  Route.post('/register', 'AuthController.register');

}).prefix('api');
