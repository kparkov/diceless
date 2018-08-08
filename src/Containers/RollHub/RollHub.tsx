import * as React from 'react';

import { RollPanel } from '../../Components/RollPanel/RollPanel';
import DiceFactory from '../../Library/DiceFactory';
import { Die } from '../../Library/Die';
import { IRoll } from '../../Library/IRoll';

export interface IRollHubState {
    rolls: IRoll[],
    dieExpression: string
}

export class RollHub extends React.Component<{}, IRollHubState> {

    private _factory : DiceFactory;

    constructor(props: {}) {
        super(props);
        
        this._factory = new DiceFactory();

        this.state = { 
            dieExpression: '',
            rolls: [{ id: this.generateId(), dice: this._factory.createMultiple(3, 6) }]
        };

        this.addRoll = this.addRoll.bind(this);
        this.handleExpressionChange = this.handleExpressionChange.bind(this);
        this.submitExpressionChange = this.submitExpressionChange.bind(this);
    }

    public render() {
        return (
            <div>
                <input type="text" onChange={this.handleExpressionChange} value={this.state.dieExpression} /> <button onClick={this.submitExpressionChange}>Roll this!</button>
                <div>
                    {this.state.rolls.slice().reverse().map(roll => 
                        <RollPanel key={roll.id} roll={roll} onCopy={this.addRoll} />
                    )}
                </div>
            </div>
        );
    }

    private handleExpressionChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ dieExpression: e.target.value });
    }

    private async submitExpressionChange() {
        const dice = this._factory.createFromExpression(this.state.dieExpression);

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