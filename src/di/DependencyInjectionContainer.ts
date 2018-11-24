export class DependencyInjectionContainer {
  private services: Map<string, any>;

  constructor() {
    this.services = new Map<string, any>();
  }

  public hasService(name: string): boolean {
    return this.services.has(name);
  }

  public addService(name: string, object: any): void {
    if (this.hasService(name) === true) {
      throw new Error(
        `Service ${name} is already registered! Perhaps there are two services in different folders with same name?`
      );
    }

    this.services.set(name, object);
  }

  public getService(name: string): any {
    if (this.hasService(name) === false) {
      throw new Error(`Service ${name} is not registered!`);
    }

    return this.services.get(name);
  }
}
