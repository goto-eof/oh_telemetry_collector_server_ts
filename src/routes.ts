import { Router } from 'express';
import TelemetryController from './controllers/telemetry.controller';

const routes = Router();

routes.post('/collect', TelemetryController.collect);
routes.delete('/delete-all', TelemetryController.deleteAll);
routes.get('/num-comp-ram', TelemetryController.getNumCompRam);

export default routes;
