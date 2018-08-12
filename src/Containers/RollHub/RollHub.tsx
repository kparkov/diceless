import * as React from 'react';

import { Converter } from '../../Library/Converter';
import DiceFactory from '../../Library/DiceFactory';
import IdGenerator from '../../Library/IdGenerator';
import { IRoll } from '../../Library/IRoll';

import ExpressionInput from '../../Components/Form/ExpressionInput';
import { RollPanel } from '../../Components/RollPanel/RollPanel';

export interface IRollHubState {
    rolls: IRoll[],
}

export class RollHub extends React.Component<{}, IRollHubState> {

    private _factory : DiceFactory;

    constructor(props: {}) {
        super(props);
        
        this._factory = new DiceFactory();

        this.state = { 
            rolls: [ this.createRoll('4d6') as IRoll ]
        };
    }

    public render() {

        const rolls = this.state.rolls.slice().reverse().map(roll =>
            <RollPanel key={roll.id} roll={roll} />
        );

        return (
            <div>
                <ExpressionInput submitExpression={this.submitExpression} />
                <div>
                    {rolls}
                </div>
            </div>
        );
    }

    private submitExpression = (expression: string): string | null => {
        const roll = this.createRoll(expression);

        if (roll) {
            this.addRoll(roll);
            const converter = new Converter(this._factory);
            return converter.serialize(roll.dice);
        }

        return null;
    }

    private addRoll = (roll: IRoll) => {
        const rolls : IRoll[] = [ ...this.state.rolls.slice().reverse().slice(0, 20).reverse(), roll ];
        this.setState({ rolls });
        window.scrollTo(0, 0);
    }

    private createRoll(expression: string) : IRoll | null {
        const dice = this._factory.createFromExpression(expression);
        const converter = new Converter(this._factory);

        if (dice && dice.length > 0) {
            dice.sort((a, b) => b.sides - a.sides);
            const roll : IRoll = { id: IdGenerator.id(), dice, expression: converter.serialize(dice) };
            return roll;
        }

        return null;
    }
}