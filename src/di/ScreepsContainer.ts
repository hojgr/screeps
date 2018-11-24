import { AliveCreepFinder } from 'creep/AliveCreepFinder';
import { CreepConfigurationResolver } from 'generation/CreepConfigurationResolver';
import { CreepFactory } from 'creep/CreepFactory';
import { CreepManager } from 'creep/CreepManager';
import { CreepToRoleTransformer } from 'creep/CreepToRoleTransformer';
import { CurrentGenerationResolver } from 'generation/CurrentGenerationResolver';
import { DependencyInjectionContainer } from './DependencyInjectionContainer';
import { InitCreepConfiguration } from 'generation/creepConfiguration/InitCreepConfiguration';
import { RoleDiff } from 'creep/RoleDiff';
import { RoleToBodyTransformer } from 'creep/RoleToBodyTransformer';
import { SimpleHarvesterCreep } from 'creep/role/SimpleHarvesterCreep';
import { SpawnManager } from 'spawn/SpawnManager';

export class ScreepsContainer {
  private dic: DependencyInjectionContainer;

  constructor(dic: DependencyInjectionContainer) {
    this.dic = dic;
  }

  public getCurrentGenerationResolver(): CurrentGenerationResolver {
    if (this.dic.hasService(CurrentGenerationResolver.name) === false) {
      this.dic.addService(CurrentGenerationResolver.name, new CurrentGenerationResolver());
    }

    return this.dic.getService(CurrentGenerationResolver.name);
  }

  public getCreepManager(): CreepManager {
    if (this.dic.hasService(CreepManager.name) === false) {
      this.dic.addService(CreepManager.name, new CreepManager(this.getCreepFactory()));
    }

    return this.dic.getService(CreepManager.name);
  }

  public getCreepConfigurationResolver(): CreepConfigurationResolver {
    if (this.dic.hasService(CreepConfigurationResolver.name) === false) {
      this.dic.addService(
        CreepConfigurationResolver.name,
        new CreepConfigurationResolver(this.getInitCreepConfiguration())
      );
    }

    return this.dic.getService(CreepConfigurationResolver.name);
  }

  public getInitCreepConfiguration(): InitCreepConfiguration {
    if (this.dic.hasService(InitCreepConfiguration.name) === false) {
      this.dic.addService(InitCreepConfiguration.name, new InitCreepConfiguration());
    }

    return this.dic.getService(InitCreepConfiguration.name);
  }

  public getAliveCreepFinder(): AliveCreepFinder {
    if (this.dic.hasService(AliveCreepFinder.name) === false) {
      this.dic.addService(AliveCreepFinder.name, new AliveCreepFinder());
    }

    return this.dic.getService(AliveCreepFinder.name);
  }

  public getCreepToRoleTransformer(): CreepToRoleTransformer {
    if (this.dic.hasService(CreepToRoleTransformer.name) === false) {
      this.dic.addService(CreepToRoleTransformer.name, new CreepToRoleTransformer());
    }

    return this.dic.getService(CreepToRoleTransformer.name);
  }

  public getRoleDiff(): RoleDiff {
    if (this.dic.hasService(RoleDiff.name) === false) {
      this.dic.addService(RoleDiff.name, new RoleDiff());
    }

    return this.dic.getService(RoleDiff.name);
  }

  public getRoleToBodyTransformer(): RoleToBodyTransformer {
    if (this.dic.hasService(RoleToBodyTransformer.name) === false) {
      this.dic.addService(RoleToBodyTransformer.name, new RoleToBodyTransformer());
    }

    return this.dic.getService(RoleToBodyTransformer.name);
  }

  public getCreepFactory(): CreepFactory {
    if (this.dic.hasService(CreepFactory.name) === false) {
      this.dic.addService(CreepFactory.name, new CreepFactory(this));
    }

    return this.dic.getService(CreepFactory.name);
  }

  public createSimpleHarvesterCreep(creep: Creep): SimpleHarvesterCreep {
    return new SimpleHarvesterCreep(creep);
  }

  public getSpawnManager(): SpawnManager {
    if (this.dic.hasService(SpawnManager.name) === false) {
      this.dic.addService(
        SpawnManager.name,
        new SpawnManager(
          this.getCreepConfigurationResolver(),
          this.getAliveCreepFinder(),
          this.getCreepToRoleTransformer(),
          this.getRoleDiff(),
          this.getRoleToBodyTransformer()
        )
      );
    }

    return this.dic.getService(SpawnManager.name);
  }
}
