import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ name: 'is_active', default: true })
  is_active: boolean;
  @Column({ name: 'created_by' })
  created_by: string;
  @Column({ name: 'created_at' })
  created_at: Date;
  @Column({ name: 'updated_by' })
  updated_by: string;
  @Column({ name: 'updated_at' })
  updated_at: Date;
}
