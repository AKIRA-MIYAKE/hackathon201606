import main from '../controllers/main';
import dirtyWord from '../controllers/api/dirty-word';


function setup(app) {
  app.use('/', main);

  // API controllers is placed under "/api"
  app.use('/api/dirty-word', dirtyWord);
}


export const setupRoutes = setup;
