import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('telemetry_pkey', ['id'], { unique: true })
@Entity('telemetry', { schema: 'public' })
export class Telemetry extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'request_id' })
  requestId: number;

  @Column('character varying', { name: 'code', length: 50 })
  code: string;

  @Column('character varying', { name: 'key', length: 50 })
  key: string;

  @Column('character varying', { name: 'value', length: 255 })
  value: string;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;
}
