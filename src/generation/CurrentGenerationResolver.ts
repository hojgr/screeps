import { Generation } from './Generation';

export class CurrentGenerationResolver {
  public getCurrentGeneration(): Generation {
    return Generation.INIT;
  }
}
