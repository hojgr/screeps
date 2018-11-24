export class Spawner {
  private spawn: StructureSpawn;

  constructor(spawn: StructureSpawn) {
    this.spawn = spawn;
  }
  public spawnCreep(body: BodyPartConstant[], name: string): void {
    this.spawn.createCreep(body, name);
  }
}
