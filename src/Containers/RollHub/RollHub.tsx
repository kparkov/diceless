import * as React from 'react';

import DiceFactory from '../../Library/DiceFactory';
import Pool from '../../Library/Pool';

import ExpressionInput from '../../Components/Form/ExpressionInput';
import Introduction from '../../Components/Introduction/Introduction';
import { RollPanel } from '../../Components/RollPanel/RollPanel';

export interface IRollHubState {
    pools: Pool[],
}

export class RollHub extends React.Component<{}, IRollHubState> {

    private _factory : DiceFactory;

    constructor(props: {}) {
        super(props);
        
        this._factory = new DiceFactory();

        this.state = { 
            pools: []
        };
    }

    public render() {

        const rolls = this.state.pools.slice().reverse().map(roll =>
            <RollPanel key={roll.id} pool={roll} />
        );

        return (
            <div>
                <ExpressionInput submitExpression={this.submitExpression} onClearHistory={this.clearRolls} />
                <div>
                    {rolls}
                    <Introduction />
                </div>
            </div>
        );
    }

    private submitExpression = (expression: string): string | null => {
        const pool = this.createRoll(expression);

        if (pool) {
            this.addPool(pool);
            return pool.expression;
        }

        return null;
    }

    private addPool = (pool: Pool) => {
        const pools : Pool[] = [ ...this.state.pools.slice().reverse().slice(0, 20).reverse(), pool ];
        this.setState({ pools });
        window.scrollTo(0, 0);
    }

    private createRoll(expression: string) : Pool | null {
        const pool = this._factory.createFromExpression(expression);

        if (pool.dice && pool.dice.length > 0) {
            pool.dice.sort((a, b) => b.sides - a.sides);
            return pool;
        }

        return null;
    }

    private clearRolls = () => {
        this.setState({ pools: [] });
    }
}