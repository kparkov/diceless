import * as React from 'react';

import DiceFactory from '../../Library/DiceFactory';
import { Die } from '../../Library/Die';
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
            rolls: [{ id: this.generateId(), dice: this._factory.createMultiple(3, 6) }]
        };

        this.addRoll = this.addRoll.bind(this);
        this.submitExpression = this.submitExpression.bind(this);
    }

    public render() {

        const rolls = this.state.rolls.slice().reverse().map(roll =>
            <RollPanel key={roll.id} roll={roll} onCopy={this.addRoll} />
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

    private async submitExpression(expression: string) {
        const dice = this._factory.createFromExpression(expression);

        if (dice && dice.length > 0) {
            // await this.setState({ ...this.state, dieExpression: '' });
            dice.sort((a, b) => b.sides - a.sides);
            this.addRoll(dice);
        }
    }

    private addRoll(dice: Die[]) {
        const dicepool = dice.map(d => this._factory.createSingle(d.sides));
        const newRoll : IRoll = { id: Math.random().toString(), dice: dicepool };
        const rolls : IRoll[] = [ ...this.state.rolls, newRoll ];

        this.setState({ rolls });
        window.scrollTo(0, 0);
    }

    private generateId(): string {
        return Math.random().toString();
    }
}