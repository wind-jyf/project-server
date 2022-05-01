import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'disease'
})
export class DiseaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true
  })
  public id!: number;

  @PrimaryColumn({
    name: 'disease_code',
    type: 'varchar',
    width: 255,
    nullable: false
  })
  public disease_code!: string;

  @Column({
    name: 'disease_ref_department',
    type: 'varchar',
    nullable: false
  })
  public disease_ref_department!: string;

  @Column({
    name: 'disease_description',
    type: 'varchar',
    nullable: false
  })
  public disease_description!: string;
}