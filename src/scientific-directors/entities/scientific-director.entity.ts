import { PhdStudent } from 'src/phd-students/entities/phd-student.entity';
import { User } from 'src/users/entities/user.entity';
import {
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity('scientific_directors')
export class ScientificDirector {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userData: User;

  @OneToMany(() => PhdStudent, (phdStudent) => phdStudent.scientificDirector)
  phdStudents: PhdStudent[];
}
