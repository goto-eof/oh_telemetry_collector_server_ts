import { Router } from 'express';
import collect from './controllers/telemetryController';

const routes = Router();

routes.post('/collect', collect);

export default routes;
