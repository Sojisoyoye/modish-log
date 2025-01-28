import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['username']) // Ensure usernames are unique
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: string; // e.g., 'Admin', 'Manager', 'Salesperson'
}