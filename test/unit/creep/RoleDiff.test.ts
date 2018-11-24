import { expect } from 'chai';
import { Role } from 'creep/Role';
import { RoleDiff } from 'creep/RoleDiff';

describe("RoleDiff", () => {
  it("should calculate role difference", () => {
    const roles = [Role.SimpleHarvester, Role.SimpleHarvester, Role.SimpleHarvester];
    const actual = [Role.SimpleHarvester];
    const expected = [Role.SimpleHarvester, Role.SimpleHarvester];

    const roleDiff = new RoleDiff();

    expect(roleDiff.getDiff(roles, actual)).to.eql(expected);
  });
});
