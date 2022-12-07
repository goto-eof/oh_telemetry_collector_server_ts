import { MigrationInterface, QueryRunner } from 'typeorm';

const table = 'telemetry';

export class migration1670357171735 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE ${table} (
      id serial PRIMARY KEY,
      request_id INT NOT NULL,
      code VARCHAR ( 255 ) NOT NULL,
      property VARCHAR ( 255 ) NOT NULL,
      value VARCHAR ( 255 ) NOT NULL,
      created_at TIMESTAMP NOT NULL
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${table}`);
  }
}
