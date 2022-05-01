import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'medicine'
})
export class MedicineEntity {
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
    name: 'medicine_name',
    type: 'varchar',
    nullable: false
  })
  public medicine_name!: string;
  
  @Column({
    name: 'medicine_manufacturer',
    type: 'varchar',
    nullable: false
  })
  public medicine_manufacturer!: string;

  @Column({
    name: 'medicine_category',
    type: 'int',
    nullable: false
  })
  public medicine_category!: number;
  
  @Column({
    name: 'medicine_specifications',
    type: 'varchar',
    nullable: false
  })
  public medicine_specifications!: string;
  
  @Column({
    name: 'medicine_price',
    type: 'int',
    nullable: false
  })
  public medicine_price!: number;
  
  @Column({
    name: 'medicine_form',
    type: 'int',
    nullable: false
  })
  public medicine_form!: number;
  
  @Column({
    name: 'medicine_rest_total',
    type: 'int',
    nullable: false
  })
  public medicine_rest_total!: number;
}