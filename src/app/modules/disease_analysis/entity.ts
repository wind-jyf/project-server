import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'disease_analysis'
})
export class DiseaseAnalysisEntity {
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
    name: 'disease_ref_youth_total',
    type: 'int',
    nullable: true
  })
  public disease_ref_youth_total!: number;
  
  @Column({
    name: 'disease_ref_middle_total',
    type: 'int',
    nullable: true
  })
  public disease_ref_middle_total!: number;
  
  @Column({
    name: 'disease_ref_old_total',
    type: 'int',
    nullable: true
  })
  public disease_ref_old_total!: number;

  @Column({
    name: 'disease_ref_female_total',
    type: 'int',
    nullable: true
  })
  public disease_ref_femal_total!: number;
  
  @Column({
    name: 'disease_ref_male_total',
    type: 'int',
    nullable: true
  })
  public disease_ref_man_total!: number;
}