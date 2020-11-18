import './env';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import * as mongoSessionStore from 'connect-mongo';
import api from './api';
import { setupGoogle } from './google-auth';
// import logger from './logs';


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// initialization

mongoose.connect(process.env.MONGO_URL, options);

const server = express();

// Ensure all api-related responses have header
// Access-Control-Allow-Origin: http://localhost:3000
server.use(cors({ origin: process.env.URL_APP, credentials: true }));

server.use(express.json());
// session handling
// session handling

const MongoStore = mongoSessionStore(session);

const sessionOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60, // save session 14 days
    autoRemove: 'interval',
    autoRemoveInterval: 1440, // clears every day
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
    secure: false,
  }
};

const sessionMiddleware = session(sessionOptions);
server.use(sessionMiddleware);


// set up google 

setupGoogle({ server });

// api server

api(server);

// The * wildcard path/route is sending a response with 403 status on all possible routes.
server.get('*', (_, res) => {
  res.sendStatus(403);
});

server.on('error', (error) => {
  throw error
})

server.listen(process.env.PORT_API, () => {
  console.log(`> Ready on ${process.env.URL_API}`);
});
