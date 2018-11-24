import { Role } from './Role';

export class RoleDiff {
  public getDiff(base: Role[], subtract: Role[]): Role[] {
    const remaining: Role[] = [];

    for (const roleIndex in base) {
      const role = base[roleIndex];

      const indexOfRoleInSubtract = subtract.indexOf(role);

      if (indexOfRoleInSubtract === -1) {
        remaining.push(role);
      } else {
        subtract.splice(indexOfRoleInSubtract, 1);
      }
    }

    return remaining;
  }
}
