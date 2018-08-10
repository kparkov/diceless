import * as React from 'react';
import PoolStats from '../../Library/PoolStats';

interface IDistributionGraphProps {
    stats: PoolStats
}

export default class DistributionGraph extends React.Component<IDistributionGraphProps, {}> {
    public render() {
        const combinationsTotal = this.props.stats.distribution.combinations();
        const bars = this.props.stats.distribution.combinationCounts().map(c => this.renderBar(c.value, c.combinations, combinationsTotal));

        return (
            <div>
                {bars}
            </div>
        )
    }

    private renderBar(value: number, combinations: number, total: number) {
        const fraction = Math.round((combinations / total) * 100) + '%';

        return (
            <div style={{
                backgroundColor: '#ccc',
                border: '1px solid black',
                height: '15px',
                margin: '5px 0',
            }}>
                <div style={{
                    backgroundColor: 'red',
                    fontSize: '10px',
                    height: '100%',
                    width: fraction,
                }}>{fraction}</div>
            </div>
        )
    }
}