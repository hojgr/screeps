import { CreepFactory } from './CreepFactory';
import { Generation } from 'generation/Generation';
import { OnTickInterface } from 'gameLoop/OnTickInterface';

export class CreepManager implements OnTickInterface {
  private creepFactory: CreepFactory;

  constructor(creepFactory: CreepFactory) {
    this.creepFactory = creepFactory;
  }
  public tick(roomName: string, generation: Generation): void {
    const creeps = Game.rooms[roomName].find(FIND_MY_CREEPS);

    for (const i in creeps) {
      const creep = creeps[i];
      const workerInstance = this.creepFactory.createFromRole(creep.memory.role, creep);
      workerInstance.tick(roomName);
    }
  }
}
