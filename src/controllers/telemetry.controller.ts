import { Request, Response } from 'express';
import { TelemetryService } from '../service/telemetry.service';

export default class TelemetryController {
  static async collect(req: Request, res: Response) {
    const json = req.body;
    const dataSource = req.dataSource;
    await TelemetryService.collect(dataSource, json);
    return res.status(201).json({ status: true, result: true });
  }
}
