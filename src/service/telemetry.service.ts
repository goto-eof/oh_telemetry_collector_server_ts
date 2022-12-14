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

  static async deleteAll(dataSource: DataSource): Promise<void> {
    await dataSource.createQueryBuilder().delete().from(Telemetry).execute();
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

  static async getNumCompRam(dataSource: DataSource): Promise<any> {
    const qb = await dataSource
      .getRepository(Telemetry)
      .createQueryBuilder('t');
    let result = qb
      .select('count(t.value)', 'num')
      .addSelect('t.value')
      .where(
        't.requestId IN ' +
          (await qb
            .subQuery()
            .addSelect('max(t2.requestId)')
            .from(Telemetry, 't2')
            .where("t2.property = 'hw_cpu_idientifier'")
            .groupBy('t2.property')
            .groupBy('t2.value')
            .getQuery())
      )
      .andWhere("property = 'hw_mem_total_memory'")
      .groupBy('code')
      .addGroupBy('property')
      .addGroupBy('value')
      .orderBy('value')
      .getRawMany();

    console.log(result);
    return result;
  }
}
