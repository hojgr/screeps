export class AliveCreepFinder {
  public getAliveCreeps(roomName: string): Creep[] {
    const myCreeps = Game.rooms[roomName].find(FIND_MY_CREEPS);

    return myCreeps;
  }
}
