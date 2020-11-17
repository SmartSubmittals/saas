import * as express from 'express';

 import publicExpressRoutes from './public';
 import teamMemberExpressRoutes from './team-member';

 function handleError(err, _, res, __) {
   console.error(err.stack);

   res.json({ error: err.message || err.toString() });
 }

 export default function api(server: express.Express) {
   server.use('/api/v1/public', publicExpressRoutes, handleError);
   server.use('/api/v1/team-member', teamMemberExpressRoutes, handleError);
 }

 /**
  * Notes:
  * - This function takes our Express server as an argument and mounts three Express middlewares. For each middleware, we prepend the path with a string and call the handleError function if any of the Express routes in the corresponding Express router returns an error.
  */