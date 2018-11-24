import { BODY as simpleHarvesterBody } from './role/SimpleHarvesterCreep';
import { Role } from './Role';

export class RoleToBodyTransformer {
  public toBody(role: Role): BodyPartConstant[] {
    return simpleHarvesterBody;
  }
}
