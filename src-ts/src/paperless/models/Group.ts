/**
 * Group entity - corresponds to Django's Group model
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { User } from './User';

@Entity('auth_group')
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  name!: string;

  @ManyToMany(() => User, (user) => user.groups)
  users!: User[];
}

export default Group;
