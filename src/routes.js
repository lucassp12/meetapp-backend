import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import validationMiddleware from './app/middlewares/validation';

import userStoreSchema from './app/schemas/User/Store';
import userUpdateSchema from './app/schemas/User/Update';

import sessionStoreSchema from './app/schemas/Session/Store';

import meetupStoreSchema from './app/schemas/Meetup/Store';
import meetupUpdateSchema from './app/schemas/Meetup/Update';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.json('Hellow');
});

routes.post(
  '/users',
  validationMiddleware(userStoreSchema),
  UserController.store
);
routes.post(
  '/sessions',
  validationMiddleware(sessionStoreSchema),
  SessionController.store
);

routes.use(authMiddleware);
routes.put(
  '/users',
  validationMiddleware(userUpdateSchema),
  UserController.update
);
routes.get('/user', UserController.show);

routes.get('/meetups', MeetupController.index);
routes.post(
  '/meetups',
  validationMiddleware(meetupStoreSchema),
  MeetupController.store
);
routes.put(
  '/meetups/:id',
  validationMiddleware(meetupUpdateSchema),
  MeetupController.update
);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/organizing', OrganizingController.index);

routes.get('/meetups/subscriptions', SubscriptionController.index);
routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
