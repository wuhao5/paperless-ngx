/**
 * User entity - corresponds to Django's User model
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';
import { Group } from './Group';

@Entity('auth_user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  @MinLength(1)
  username!: string;

  @Column({ type: 'varchar', length: 254 })
  @IsEmail()
  email!: string;

  @Column({ type: 'varchar', length: 128, select: false })
  password!: string;

  @Column({ type: 'varchar', length: 150, name: 'first_name', default: '' })
  firstName!: string;

  @Column({ type: 'varchar', length: 150, name: 'last_name', default: '' })
  lastName!: string;

  @Column({ type: 'boolean', name: 'is_staff', default: false })
  isStaff!: boolean;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ type: 'boolean', name: 'is_superuser', default: false })
  isSuperuser!: boolean;

  @Column({ type: 'timestamp', name: 'last_login', nullable: true })
  lastLogin?: Date;

  @CreateDateColumn({ name: 'date_joined' })
  dateJoined!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable({
    name: 'auth_user_groups',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  groups!: Group[];

  /**
   * Get full name
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`.trim() || this.username;
  }
}

export default User;
