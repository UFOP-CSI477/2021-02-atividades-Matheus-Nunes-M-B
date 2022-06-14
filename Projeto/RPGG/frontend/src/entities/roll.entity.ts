import { UserEntity } from "./user.entity";



export interface RollEntity {
  
  id: number;
  expression: string;
  result: string;
  total: number;

  owner: UserEntity;
  ownerId: number;

  createdAt: string;
}