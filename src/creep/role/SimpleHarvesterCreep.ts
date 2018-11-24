import { CreepInterface } from './CreepInterface';
import { Role } from '../Role';

export const BODY = [WORK, CARRY, MOVE];

export class SimpleHarvesterCreep implements CreepInterface {
  private creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public getRole(): Role {
    return Role.SimpleHarvester;
  }

  public getBody(): BodyPartConstant[] {
    return BODY;
  }

  public tick(roomName: string): void {
    const stdHarvestFlag = Game.flags[roomName.toUpperCase() + "_STD_HARVEST"];
    if (stdHarvestFlag === undefined) {
      this.error("Flag " + roomName.toUpperCase() + "_STD_HARVEST" + " not found. Simple harvester cant work.");
      return;
    }

    let sourceAtFlag;

    const sources = Game.rooms[roomName].find(FIND_SOURCES);

    for (const i in sources) {
      const source = sources[i];

      if (source.pos.isEqualTo(stdHarvestFlag.pos) === true) {
        sourceAtFlag = source;
        break;
      }
    }

    if (sourceAtFlag === undefined) {
      // if there are no sources at flag, he has nothing to do
      return;
    }

    const spawn = Game.rooms[roomName].find(FIND_MY_SPAWNS)[0];

    if (this.creep.carryCapacity === this.creep.carry.energy) {
      if (this.creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(spawn);
      }
    } else {
      if (this.creep.harvest(sourceAtFlag) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sourceAtFlag);
      }
    }
  }

  public error(msg: string) {
    console.log(this.creep.name + ": ERROR - " + msg);
  }
}
