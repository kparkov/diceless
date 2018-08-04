export class Die {
    private _id: string;
    private _value: number;
    private readonly _sides: number;

    constructor(sides: number) {
        this._id = Math.random().toString();
        this._sides = sides;
        this.roll();
    }

    public roll(): number {
        this._value = Math.floor(Math.random() * this.sides) + 1;
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