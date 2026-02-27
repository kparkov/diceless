import { Converter } from "./Converter";
import Die from "./Die";
import IdGenerator from "./IdGenerator";

export default class Pool {
    private _id : string;
    private _dice : Die[] = [];
    private _constant: number = 0;
    private _expression: string;

    constructor(dice: Die[], constant: number) {
        this._id = IdGenerator.id();
        this._dice = dice;
        this._constant = constant;

        const converter = new Converter();
        this._expression = converter.serializePool(this);
    }

    public get id(): string {
        return this._id;
    }

    public get dice(): Die[] {
        return this._dice;
    }

    public get expression(): string {
        return this._expression;
    }

    public get constant(): number {
        return this._constant;
    }

    public isEmpty(): boolean {
        return this._dice && this._dice.length > 0;
    }
}