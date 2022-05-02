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

  @Column({
    name: 'medicine_code',
    type: 'varchar',
    width: 255,
    nullable: false
  })
  public medicine_code!: string;

  @Column({
    name: 'medicine_name',
    type: 'varchar',
    nullable: false
  })
  public medicine_name!: string;

  @Column({
    name: 'medicine_category',
    type: 'int',
    nullable: false
  })
  public medicine_category!: number;

  @Column({
    name: 'medicine_used_total',
    type: 'int',
    nullable: true
  })
  public medicine_used_total!: number;
}