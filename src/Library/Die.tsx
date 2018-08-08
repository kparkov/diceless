import IdGenerator from "./IdGenerator";
import { IntGenerator } from "./IntGenerator";

export interface IDieArguments {
    sides: number;
    generator: IntGenerator;
    initialValue?: number;
}

export class Die {
    private _generator: IntGenerator;
    private _id: string;
    private _value: number;
    private readonly _sides: number;

    constructor(args: IDieArguments) {
        this._id = IdGenerator.id();
        this._generator = args.generator;
        this._sides = args.sides || 6;

        if (args.initialValue) {
            this._value = args.initialValue;
        } else {
            this.roll();
        }
    }

    public roll(): number {
        this._value = this._generator(1, this.sides);
        return this._value;
    }

    get value() {
        return this._value;
    }

    get sides() {
        return this._sides;
    }

    get id() {
        return this._id;
    }
}