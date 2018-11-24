import { Role } from 'creep/Role';

export interface CreepConfigurationInterface {
  getConfiguration(): Role[];
}
