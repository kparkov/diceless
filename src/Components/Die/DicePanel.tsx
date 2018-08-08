import * as React from 'react';
import { IRoll } from '../../Library/IRoll';
import { DieVisual } from './DieVisual';

interface IDicePanelProps {
    roll: IRoll
}

export default class DicePanel extends React.Component<IDicePanelProps, {}> {
    public render() {

        const diceVisuals = this.props.roll.dice.map(d => <DieVisual key={d.id} value={d.value} sides={d.sides} />);

        return (
            <div style={{ display: 'flex' }}>
                {diceVisuals}
            </div>
        );
    }
}