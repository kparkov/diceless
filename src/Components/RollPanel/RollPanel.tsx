import * as React from 'react';

import { Die } from '../../Library/Die';
import { IRoll } from '../../Library/IRoll';
import PoolStats from '../../Library/PoolStats';

import DicePanel from '../Die/DicePanel';
import StatHeadlines from '../StatHeadlines/StatHeadlines';

export interface IRollPanelProps {
    roll: IRoll;
    onCopy?: (d: Die[]) => void
}

export class RollPanel extends React.Component<IRollPanelProps, {}> {

    private _stats: PoolStats;

    constructor(props: IRollPanelProps) {
        super(props);
        this.handleCopy = this.handleCopy.bind(this);

        this._stats = new PoolStats(props.roll.dice);
    }

    public render() : JSX.Element {

        return (
            <div style={{ padding: '10px 10px', borderBottom: '1px solid black', textAlign: 'left' }}>
                <div 
                    style={{ 
                        fontSize: '18px',
                        fontWeight: 'bold',
                        margin: '0 0 10px 0'
                    }}
                >
                    {this.props.roll.expression}
                </div>
                <DicePanel roll={this.props.roll} />
                <StatHeadlines stats={this._stats} />
            </div>
        );
    }

    private handleCopy(): void {
        if (this.props.onCopy) {
            this.props.onCopy(this.props.roll.dice);
        }
    }
}