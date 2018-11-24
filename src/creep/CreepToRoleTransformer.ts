import { Generation } from 'generation/Generation';
import { Role } from './Role';

export class CreepToRoleTransformer {
  public getRole(creep: Creep): Role {
    return creep.memory.role;
  }
}
