import * as React from 'react';

import { Die } from '../../Library/Die';
import { IRoll } from '../../Library/IRoll';
import PoolStats from '../../Library/PoolStats';

import Button from '../Button/Button';
import DicePanel from '../Die/DicePanel';
import DistributionGraph, { DisplayMode } from '../Distribution/DistributionGraph';
import StatHeadlines from '../StatHeadlines/StatHeadlines';

export interface IRollPanelProps {
    roll: IRoll;
    onCopy?: (d: Die[]) => void
}

interface IRollPanelState {
    displayGraph: DisplayMode | null;
}

export class RollPanel extends React.Component<IRollPanelProps, IRollPanelState> {

    private _stats: PoolStats;

    constructor(props: IRollPanelProps) {
        super(props);
        this.handleCopy = this.handleCopy.bind(this);

        this._stats = new PoolStats(props.roll.dice);
        this.state = { displayGraph: null };
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
                <DicePanel roll={this.props.roll} stats={this._stats} />
                <StatHeadlines stats={this._stats} />
                {this.renderGraph()}
            </div>
        );
    }

    private renderGraph() {

        if (this.props.roll.dice.length <= 1) {
            return null;
        }

        const graph = this.state.displayGraph == null ? null : <DistributionGraph stats={this._stats} display={this.state.displayGraph} />

        return (
            <div>
                <div>
                    <Button<DisplayMode> onClick={this.setGraphDisplay} type="cancel">No distribution</Button>
                    <Button<DisplayMode> onClick={this.setGraphDisplay} item={DisplayMode.atleast} type="ok">At least</Button>
                    <Button<DisplayMode> onClick={this.setGraphDisplay} item={DisplayMode.atmost} type="ok">At most</Button>
                    <Button<DisplayMode> onClick={this.setGraphDisplay} item={DisplayMode.exact} type="ok">Exact</Button>
                </div>
                <div>
                    {graph}
                </div>
            </div>
        );
    }

    private handleCopy(): void {
        if (this.props.onCopy) {
            this.props.onCopy(this.props.roll.dice);
        }
    }

    private setGraphDisplay = (mode?: DisplayMode) => {
        if (mode === undefined) {
            this.setState({ displayGraph: null });
        } else {
            this.setState({ displayGraph: mode });
        }
    }
}