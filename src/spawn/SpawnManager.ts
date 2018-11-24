import { AliveCreepFinder } from 'creep/AliveCreepFinder';
import { CreepConfigurationResolver } from 'generation/CreepConfigurationResolver';
import { CreepToRoleTransformer } from 'creep/CreepToRoleTransformer';
import { Generation } from 'generation/Generation';
import { OnTickInterface } from 'gameLoop/OnTickInterface';
import { Role } from 'creep/Role';
import { RoleDiff } from 'creep/RoleDiff';
import { RoleToBodyTransformer } from 'creep/RoleToBodyTransformer';

export class SpawnManager implements OnTickInterface {
  private creepConfigurationResolver: CreepConfigurationResolver;
  private aliveCreepFinder: AliveCreepFinder;
  private creepToRoleTransformer: CreepToRoleTransformer;
  private roleDiff: RoleDiff;
  private roleToBodyTransformer: RoleToBodyTransformer;

  constructor(
    creepConfigurationResolver: CreepConfigurationResolver,
    aliveCreepFinder: AliveCreepFinder,
    creepToRoleTransformer: CreepToRoleTransformer,
    roleDiff: RoleDiff,
    roleToBodyTransformer: RoleToBodyTransformer
  ) {
    this.creepConfigurationResolver = creepConfigurationResolver;
    this.aliveCreepFinder = aliveCreepFinder;
    this.creepToRoleTransformer = creepToRoleTransformer;
    this.roleDiff = roleDiff;
    this.roleToBodyTransformer = roleToBodyTransformer;
  }

  public tick(roomName: string, generation: Generation): void {
    const generationCreepConfiguration = this.creepConfigurationResolver.getCreepConfigurationForGeneration(generation);
    const aliveCreeps = this.aliveCreepFinder.getAliveCreeps(roomName);
    const aliveCreepRoles = aliveCreeps.map(this.creepToRoleTransformer.getRole);

    const rolesToSpawn = this.roleDiff.getDiff(generationCreepConfiguration, aliveCreepRoles);

    if (rolesToSpawn.length === 0) {
      return;
    }

    const roleToSpawn = rolesToSpawn[0];
    const bodyToSpawn = this.roleToBodyTransformer.toBody(roleToSpawn);

    const spawns = Game.rooms[roomName].find(FIND_MY_SPAWNS);

    for (const i in spawns) {
      const spawn = spawns[i];

      const spawnResult = spawn.spawnCreep(bodyToSpawn, this.getName(roleToSpawn), { memory: { role: roleToSpawn } });

      if (spawnResult === OK) {
        break;
      }
    }
  }

  private getName(role: Role): string {
    const upper =
      role
        .toString()
        .charAt(0)
        .toUpperCase() + role.toString().substr(1);

    return upper + "_" + +new Date();
  }
}
