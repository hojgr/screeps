import { Role } from 'creep/Role';

export interface CreepInterface {
  getRole(): Role;

  getBody(): BodyPartConstant[];

  tick(roomName: string): void;
}
