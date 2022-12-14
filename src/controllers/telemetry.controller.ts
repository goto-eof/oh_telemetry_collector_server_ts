import { Request, Response } from 'express';
import { TelemetryService } from '../service/telemetry.service';

export default class TelemetryController {
  static async collect(req: Request, res: Response) {
    const json = req.body;
    const dataSource = req.dataSource;
    await TelemetryService.collect(dataSource, json);
    return res.status(200).json({ status: true, result: true });
  }

  static async deleteAll(req: Request, res: Response) {
    const dataSource = req.dataSource;
    await TelemetryService.deleteAll(dataSource);
    return res.status(200).json({ status: true, result: true });
  }

  static async getNumCompRam(req: Request, res: Response) {
    const dataSource = await req.dataSource;
    let result = await TelemetryService.getNumCompRam(dataSource);
    console.log('RESULT: ' + result);
    return res.status(200).json({ status: true, result });
  }
}
