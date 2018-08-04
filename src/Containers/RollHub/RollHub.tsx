import * as React from 'react';

import { RollPanel } from '../../Components/RollPanel/RollPanel';
import { Converter } from '../../Library/Converter';
import { Die } from '../../Library/Die';
import { IRoll } from '../../Library/IRoll';

export interface IRollHubState {
    rolls: IRoll[],
    dieExpression: string
}

export class RollHub extends React.Component<{}, IRollHubState> {
    constructor(props: {}) {
        super(props);
        this.state = { 
            dieExpression: '',
            rolls: [{ id: this.generateId(), dice: [ new Die(6), new Die(6), new Die(6) ] }]
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
        const dice = Converter.parseString(this.state.dieExpression);

        if (dice && dice.length > 0) {
            // await this.setState({ ...this.state, dieExpression: '' });
            dice.sort((a, b) => b.sides - a.sides);
            this.addRoll(dice);
        }
    }

    private addRoll(dice: Die[]) {
        const dicepool = dice.map(d => new Die(d.sides));
        const newRoll : IRoll = { id: Math.random().toString(), dice: dicepool };
        const rolls : IRoll[] = [ ...this.state.rolls, newRoll ];

        this.setState({ rolls });
        window.scrollTo(0, 0);
    }

    private generateId(): string {
        return Math.random().toString();
    }
}