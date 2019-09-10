import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'hellow Rockeatseat' }));

export default routes;
