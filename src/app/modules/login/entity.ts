import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'user'
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true
  })
  public id!: number;

  @PrimaryColumn({
    name: 'username',
    type: 'varchar',
    width: 255,
    nullable: false
  })
  public username!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false
  })
  public password!: string;
}
