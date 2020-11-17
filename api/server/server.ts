import './env';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import api from './api';
// import logger from './logs';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGO_URL, options);

const server = express();

// Ensure all api-related responses have header
// Access-Control-Allow-Origin: http://localhost:3000
server.use(cors({ origin: process.env.URL_APP, credentials: true }));

server.use(express.json());

api(server);

// The * wildcard path/route is sending a response with 403 status on all possible routes.
server.get('*', (_, res) => {
  res.sendStatus(403);
});

server.listen(process.env.PORT_API, () => {
  // TODO: add error handling here
  console.log(`> Ready on ${process.env.URL_API}`);
});
