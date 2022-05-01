import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'department'
})
export class DepartMentEntity {
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
}