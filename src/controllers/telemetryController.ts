import { Request, Response } from 'express';
import { getMaxRequestId, saveTelemetry } from '../dao/telemetryDao';

const collect = async (_req: Request, res: Response) => {
  let maxRequestId = await getMaxRequestId();
  for (let code in _req.body) {
    for (let key in _req.body[code]) {
      let value = _req.body[code][key];
      await saveTelemetry(code, key, value, maxRequestId);
    }
  }
  return res.status(201).json({ status: true, result: true });
};

export default collect;
