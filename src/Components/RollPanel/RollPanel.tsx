import * as React from 'react';

import { Die } from '../../Library/Die';
import { IRoll } from '../../Library/IRoll';
import { DieVisual } from '../Die/DieVisual';

export interface IRollPanelProps {
    roll: IRoll;
    onCopy: (d: Die[]) => void
}

export interface INumberArrayAggregate {
    sum: number;
    average: number;
    max: number;
    min: number;
    median: number;
    expected: number;
}

export class RollPanel extends React.Component<IRollPanelProps, {}> {

    private _aggregates: INumberArrayAggregate;

    constructor(props: IRollPanelProps) {
        super(props);
        this.handleCopy = this.handleCopy.bind(this);

        this._aggregates = this.calculateAggregates(props.roll.dice.map(d => d.value));
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

        return <span>= {this._aggregates.sum} (total) / {this._aggregates.max} (high) / {this._aggregates.min} (low) / {this._aggregates.median} (median) / {this._aggregates.average} (avg.) / {this._aggregates.expected} (expected)</span>;
    }

    private handleCopy(): void {
        this.props.onCopy(this.props.roll.dice);
    }

    private calculateAggregates(numbers: number[]): INumberArrayAggregate {
        const sorted = numbers.slice().sort();
        const length = sorted.length;

        let median = 0;
        let max = 0;
        let min = 0;

        if (length > 0) {
            median = length % 2 === 0 ? (sorted[length / 2] + sorted[(length / 2) + 1]) / 2 : sorted[Math.floor(length / 2)];
            max = sorted[length - 1];
            min = sorted[0];
        }        

        return {
            average: Math.round(this.numberArrayAverage(numbers) * 100) / 100,
            expected: this.numberArraySum(this.props.roll.dice.map(d => (d.sides + 1) / 2)),
            max,
            median,
            min,
            sum: this.numberArraySum(numbers),
        };
    }

    private numberArraySum(numbers: number[]): number {
        return numbers.reduce((previous, current) => previous + current);
    }

    private numberArrayAverage(numbers: number[]): number {
        return numbers.length === 0 ? 0 : this.numberArraySum(numbers) / numbers.length;
    }
}