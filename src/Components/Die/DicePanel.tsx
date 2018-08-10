import * as React from 'react';
import { IRoll } from '../../Library/IRoll';
import PoolStats from '../../Library/PoolStats';

import { DieVisual } from './DieVisual';

interface IDicePanelProps {
    roll: IRoll,
    stats: PoolStats
}

function Sum(props: { stats: PoolStats }) {
    return (
        <span 
            style={{ 
                fontSize: '22px',
                left: '15px',
                position: 'relative',
                top: '11px',
            }}
        >= {props.stats.aggregates.sum}</span>
    );
}

export default class DicePanel extends React.Component<IDicePanelProps, {}> {
    public render() {

        const diceVisuals = this.props.roll.dice.map(d => <DieVisual key={d.id} value={d.value} sides={d.sides} />);

        return (
            <div 
                style={{ 
                    display: 'flex',
                    flexFlow: 'wrap'
                }}
            >
                {diceVisuals}
                <Sum stats={this.props.stats} />
            </div>
        );
    }
}