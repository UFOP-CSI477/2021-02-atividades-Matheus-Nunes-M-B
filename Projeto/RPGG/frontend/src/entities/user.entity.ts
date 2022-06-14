import { SessionEntity } from "./session.entity";


export enum UserTypeEnum {
  PLAYER = 'player',
  MASTER = 'master',
}


export const userMessages = {
  [UserTypeEnum.MASTER]: 'Mestre',
  [UserTypeEnum.PLAYER]: 'Jogador',
}


export interface UserEntity {
  id: number;
  name: string;
  username: string;
  avatar: string;
  type: UserTypeEnum;

  sessions: SessionEntity[];
  mySessions: SessionEntity[];

  createdAt: Date;
  updatedAt: Date;
}