import { Telemetry } from '../entities/Telemetry';

export const saveTelemetry = async (
  code: string,
  key: string,
  value: string,
  maxRequestId: number
) => {
  const telemetry = new Telemetry();
  telemetry.code = code;
  telemetry.key = key;
  telemetry.value = value;
  telemetry.createdAt = new Date();
  telemetry.requestId = maxRequestId + 1;
  await telemetry.save();
};

export const getMaxRequestId = async (): Promise<number> => {
  const query = Telemetry.createQueryBuilder('telemetry');
  query.select('MAX(telemetry.requestId)', 'max');
  const result = await query.getRawOne();
  return result.max || 0;
};
