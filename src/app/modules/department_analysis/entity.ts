import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'department_analysis'
})
export class DepartMentAnalysisEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true
  })
  public id!: number;

  @Column({
    name: 'department_code',
    type: 'varchar',
    width: 255,
    nullable: false
  })
  public department_code!: string;

  @Column({
    name: 'department_name',
    type: 'varchar',
    nullable: false
  })
  public department_name!: string;
  
  @Column({
    name: 'department_category',
    type: 'int',
    nullable: false
  })
  public department_category!: number;


  @Column({
    name: 'department_ref_youth_total',
    type: 'int',
    nullable: false
  })
  public department_ref_youth_total!: number;
  
  @Column({
    name: 'department_ref_middle_total',
    type: 'int',
    nullable: false
  })
  public department_ref_middle_total!: number;
  
  @Column({
    name: 'department_ref_old_total',
    type: 'int',
    nullable: false
  })
  public department_ref_old_total!: number;

  @Column({
    name: 'department_ref_female_total',
    type: 'int',
    nullable: false
  })
  public department_ref_female_total!: number;
  
  @Column({
    name: 'department_ref_male_total',
    type: 'int',
    nullable: false
  })
  public department_ref_male_total!: number;
  
  // json对象格式
  @Column({
    name: 'department_pv',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public department_pv!: string;
}