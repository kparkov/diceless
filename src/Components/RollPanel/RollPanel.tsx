import * as React from 'react';

import { Die } from '../../Library/Die';
import { IRoll } from '../../Library/IRoll';
import PoolStats from '../../Library/PoolStats';

import DicePanel from '../Die/DicePanel';
// import DistributionGraph from '../Distribution/DistributionGraph';
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
        this.state = { displayGraph: DisplayMode.atleast };
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

        const graph = this.state.displayGraph == null ? null : <DistributionGraph stats={this._stats} display={this.state.displayGraph} />

        // tslint:disable:jsx-no-lambda
        return (
            <div>
                <div>
                    <button style={{ marginRight: '5px' }} onClick={() => this.setState({ displayGraph: null })}>No distribution</button>
                    <button style={{ marginRight: '5px' }} onClick={() => this.setState({ displayGraph: DisplayMode.atleast })}>At least</button>
                    <button style={{ marginRight: '5px' }} onClick={() => this.setState({ displayGraph: DisplayMode.atmost })}>At most</button>
                    <button style={{ marginRight: '5px' }} onClick={() => this.setState({ displayGraph: DisplayMode.exact })}>Exact probability</button>
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
}