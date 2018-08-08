import { Die } from './Die';

export interface IRoll {
    id: string;
    expression: string;
    dice: Die[];
}