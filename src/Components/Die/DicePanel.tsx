import * as React from 'react';

import Pool from '../../Library/Pool';
import PoolStats from '../../Library/PoolStats';

import DieVisual from './DieVisual';

interface IDicePanelProps {
    pool: Pool,
    stats: PoolStats
}

function Sum(props: { stats: PoolStats, constant: number }) {

    let cString = null;

    if (props.constant !== 0) {
        cString = (props.constant < 0 ? ' - ' : ' + ') + Math.abs(props.constant) + ' ';
    }

    return (
        <span 
            style={{ 
                fontSize: '22px',
                left: '10px',
                position: 'relative',
                top: '11px',
            }}
        >{cString} = {props.stats.aggregates.sum}</span>
    );
}

export default class DicePanel extends React.Component<IDicePanelProps, {}> {
    public render() {

        const diceVisuals = this.props.pool.dice.map(d => <DieVisual key={d.id} value={d.value} sides={d.sides} />);

        return (
            <div 
                style={{ 
                    display: 'flex',
                    flexFlow: 'wrap'
                }}
            >
                {diceVisuals}
                <Sum stats={this.props.stats} constant={this.props.pool.constant} />
            </div>
        );
    }
}