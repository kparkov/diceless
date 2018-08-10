import * as React from 'react';

import PoolStats from '../../Library/PoolStats';

import KeyValueLabel from '../Label/KeyValueLabel';

interface IStatHeadlinesProps {
    stats: PoolStats
}

const palette = {
    color1: "rgba(38, 84, 124, 1)",
    color2: "rgba(239, 71, 111, 1)",
    color3: "rgba(255, 140, 66, 1)",
    color4: "rgba(3, 71, 50, 1)",
    color5: "rgba(234, 23, 68, 1)",
}

export default class StatHeadlines extends React.Component<IStatHeadlinesProps, {}> {
    public render() {

        const aggregates = this.props.stats.aggregates;

        if (aggregates.length === 1) {
            return null;
        }

        return (
            <div style={{ margin: '10px 0', textAlign: 'left', fontSize: '12px' }}>
                <KeyValueLabel background={palette.color1} color="white" title="sum" value={aggregates.sum} />
                <KeyValueLabel background={palette.color2} color="white" title="avg" value={aggregates.average}/>
                <KeyValueLabel background={palette.color4} color="white" title="hi" value={aggregates.maximum}/>
                <KeyValueLabel background={palette.color5} color="white" title="lo" value={aggregates.minimum}/>
                <KeyValueLabel background={palette.color3} color="black" title="exp" value={aggregates.expected}/>
            </div>
        );
    }
}