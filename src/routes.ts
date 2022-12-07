import { Router } from 'express';
import TelemetryController from './controllers/telemetry.controller';

const routes = Router();

routes.post('/collect', TelemetryController.collect);

export default routes;
