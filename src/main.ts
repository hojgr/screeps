import { DependencyInjectionContainer } from 'di/DependencyInjectionContainer';
import { ErrorMapper } from 'utils/ErrorMapper';
import { ScreepsContainer } from 'di/ScreepsContainer';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  const roomName = "sim";

  const container = new ScreepsContainer(new DependencyInjectionContainer());

  const currentGenerationResolver = container.getCurrentGenerationResolver();
  const currentGeneration = currentGenerationResolver.getCurrentGeneration();

  const spawnManager = container.getSpawnManager();
  const creepManager = container.getCreepManager();

  creepManager.tick(roomName, currentGeneration);
  spawnManager.tick(roomName, currentGeneration);
});
