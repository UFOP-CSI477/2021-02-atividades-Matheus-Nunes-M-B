import { SessionEntity } from "./session.entity";
import { UserEntity } from "./user.entity";
export type Law_Chaos = 'Lawful' | 'Neutral' | 'Chaotic';
export type Good_Evil = 'Good' | 'Neutral' | 'Evil';
export type Alignment = `${Law_Chaos} - ${Good_Evil}`;

export enum SheetRole {
  Mage = 'Mage',
  Warrior = 'Warrior',
  Rogue = 'Rogue',
  Cleric = 'Cleric',
}

export interface SheetEntity {
  id: number;
  // SCENARIO
  name: string;
  gender: string;
  image: string;
  alignment: Alignment;
  background: string;
  // DATA
  role: SheetRole;
  level: number;
  experience: number;
  health: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  constitution: number;
  owner?: UserEntity;
  ownerId: number;
  session?: SessionEntity;
  sessionId: number;
}
