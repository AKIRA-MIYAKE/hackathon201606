import main from '../controllers/main';


function setup(app) {
  app.use('/', main);

  // API controllers is placed under "/api"
}


export const setupRoutes = setup;
