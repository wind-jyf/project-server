import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'workbench'
})
export class WorkbenchEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true
  })
  public id!: number;

  @Column({
    name: 'patient_name',
    type: 'varchar',
    nullable: false
  })
  public patient_name!: string;
  
  @Column({
    name: 'patient_gender',
    type: 'varchar',
    nullable: false
  })
  public patient_gender!: string;
  
  @Column({
    name: 'patient_age',
    type: 'int',
    nullable: false
  })
  public patient_age!: number;
  
  @Column({
    name: 'patient_job',
    type: 'varchar',
    nullable: false
  })
  public patient_job!: string;
  
  @Column({
    name: 'main_suit',
    type: 'varchar',
    nullable: false
  })
  public main_suit!: string;
  
  @Column({
    name: 'main_symptom',
    type: 'varchar',
    nullable: false
  })
  public main_symptom!: string;
  
  @Column({
    name: 'patient_ref_department',
    type: 'varchar',
    nullable: false
  })
  public patient_ref_department!: string;
  
  @Column({
    name: 'patient_ref_medicine',
    type: 'varchar',
    nullable: false
  })
  public patient_ref_medicine!: string;

  @Column({
    name: 'medical_advice',
    type: 'varchar',
    nullable: true
  })
  public medical_advice!: string;
}