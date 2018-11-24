import { CreepConfigurationInterface } from './creepConfiguration/CreepConfigurationInterface';
import { Generation } from './Generation';
import { InitCreepConfiguration } from './creepConfiguration/InitCreepConfiguration';
import { Role } from 'creep/Role';

export class CreepConfigurationResolver {
  private initCreepConfiguration: InitCreepConfiguration;

  constructor(initCreepConfiguration: InitCreepConfiguration) {
    this.initCreepConfiguration = initCreepConfiguration;
  }

  public getCreepConfigurationForGeneration(generation: Generation): Role[] {
    switch (generation) {
      case Generation.INIT:
        return this.initCreepConfiguration.getConfiguration();
    }

    throw new Error("Creep configuration could not be resolved for generation: " + generation);
  }
}
