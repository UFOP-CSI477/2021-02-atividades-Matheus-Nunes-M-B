import { UserEntity } from "./user.entity";

export enum SessionStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED',
}

export interface SessionEntity {
  id: number;
  name: string;
  avatar: string;

  status: SessionStatus;

  master?: UserEntity;
  masterId: number;
}