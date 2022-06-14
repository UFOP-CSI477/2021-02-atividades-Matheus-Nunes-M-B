import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sheet } from 'src/sheets/sheet/entities/sheet.entity';
import { Session } from 'src/sessions/session/entities/session.entity';
import { Roll } from '~/rolls/roll/entities/roll.entity';

export enum UserType {
  MASTER = 'MASTER',
  PLAYER = 'PLAYER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true })
  @ApiProperty()
  name: string;

  @Column({ nullable: true, unique: true })
  @ApiProperty()
  @Index()
  username: string;

  @Column({ nullable: true })
  @ApiProperty()
  avatar: string;

  @Column({ nullable: true })
  @ApiProperty()
  type: UserType;

  @OneToMany(() => Sheet, (sheet) => sheet.owner)
  sheets: Sheet[];

  @ManyToMany(() => Session, (session) => session.master)
  mySessions: Session[];

  @ManyToMany(() => Session, (session) => session.players)
  sessions: Session[];

  @OneToMany(() => Roll, (roll) => roll.owner)
  rolls: Roll[];
}
