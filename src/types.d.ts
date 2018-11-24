import { Role } from 'creep/Role';

// example declaration file - remove these and add your own custom typings

// // memory extension samples
declare global {
  interface CreepMemory {
    role: Role;
    // room: string;
    // working: boolean;
  }
}

// interface Memory {
//   uuid: number;
//   log: any;
// }

// // `global` extension samples
// declare namespace NodeJS {
//   interface Global {
//     log: any;
//   }
// }
