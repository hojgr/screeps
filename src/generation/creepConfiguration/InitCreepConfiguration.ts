import { CreepConfigurationInterface } from './CreepConfigurationInterface';
import { Role } from 'creep/Role';

export class InitCreepConfiguration implements CreepConfigurationInterface {
  public getConfiguration(): Role[] {
    return [Role.SimpleHarvester, Role.SimpleHarvester, Role.SimpleHarvester];
  }
}
