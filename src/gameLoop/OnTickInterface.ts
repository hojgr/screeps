import { Generation } from 'generation/Generation';

export interface OnTickInterface {
  tick(roomName: string, generation: Generation): void;
}
