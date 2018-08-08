import * as React from 'react';

import { Die } from '../../Library/Die';
import { IRoll } from '../../Library/IRoll';
import PoolStats from '../../Library/PoolStats';

import { DieVisual } from '../Die/DieVisual';

export interface IRollPanelProps {
    roll: IRoll;
    onCopy: (d: Die[]) => void
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
            <div style={{ padding: '10px 0', borderBottom: '1px solid black' }}>
                <div style={{ display: 'flex' }}>
                    {this.props.roll.dice.map(d => <DieVisual key={d.id} value={d.value} sides={d.sides} />)}
                    {this.renderAggregates()}
                </div>
                <div style={{ float: 'right', position: 'relative', top: '-15px' }}>
                    <button onClick={this.handleCopy}>Roll again</button>
                </div>
            </div>
        );
    }

    private renderAggregates() : JSX.Element | null {
        if (this.props.roll.dice.length <= 1) {
            return null;
        }

        const ag = this._stats.aggregates;

        return <span>= {ag.sum} (total) / {ag.maximum} (high) / {ag.minimum} (low) / {ag.median} (median) / {ag.average} (avg.) / {ag.expected} (expected)</span>;
    }

    private handleCopy(): void {
        this.props.onCopy(this.props.roll.dice);
    }
}