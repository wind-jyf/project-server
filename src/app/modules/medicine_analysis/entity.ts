import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'medicine_analysis'
})
export class MedicineAnalysisEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true
  })
  public id!: number;

  @PrimaryColumn({
    name: 'medicine_code',
    type: 'varchar',
    width: 255,
    nullable: false
  })
  public medicine_code!: string;

  @Column({
    name: 'medicine_used_total',
    type: 'int',
    nullable: true
  })
  public medicine_used_total!: number;
}