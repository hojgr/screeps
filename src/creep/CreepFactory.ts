import { CreepInterface } from './role/CreepInterface';
import { Role } from './Role';
import { ScreepsContainer } from 'di/ScreepsContainer';

export class CreepFactory {
  private screepsContainer: ScreepsContainer;

  constructor(screepsContainer: ScreepsContainer) {
    this.screepsContainer = screepsContainer;
  }

  public createFromRole(role: Role, creep: Creep): CreepInterface {
    return this.screepsContainer.createSimpleHarvesterCreep(creep);
  }
}
