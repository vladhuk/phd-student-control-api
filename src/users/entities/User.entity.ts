import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'last_name' })
  firstName: string;

  @Column({ name: 'first_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
