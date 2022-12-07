import { DataSource, EntityManager } from 'typeorm';
import { Telemetry } from '../entities/Telemetry';

export class TelemetryService {
  static async collect(dataSource: DataSource, json: any): Promise<boolean> {
    await dataSource.transaction(async (transactionalEntityManager) => {
      let maxRequestId = await TelemetryService.getMaxRequestId(
        transactionalEntityManager
      );
      for (let code in json) {
        for (let key in json[code]) {
          let value = json[code][key];
          await TelemetryService.saveSingleTelemetry(
            transactionalEntityManager,
            code,
            key,
            value,
            maxRequestId
          );
        }
      }
    });
    return true;
  }

  private static async saveSingleTelemetry(
    entityManager: EntityManager,
    code: string,
    key: string,
    value: string,
    maxRequestId: number
  ): Promise<void> {
    const telemetry = new Telemetry();
    telemetry.code = code;
    telemetry.key = key;
    telemetry.value = value;
    telemetry.createdAt = new Date();
    telemetry.requestId = maxRequestId + 1;
    await entityManager.save(telemetry);
  }

  private static async getMaxRequestId(
    entityManager: EntityManager
  ): Promise<number> {
    const query = entityManager
      .createQueryBuilder()
      .select('MAX(telemetry.requestId)', 'max')
      .from(Telemetry, 'telemetry');
    const result = await query.getRawOne();
    return result.max || 0;
  }
}
