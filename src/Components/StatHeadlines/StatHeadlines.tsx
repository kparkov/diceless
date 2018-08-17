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
    color6: "#C8553D",
}

interface IRarity {
    check: (fraction: number) => boolean;
    text: string;
    color: string;
    isRare: boolean;
}

const rarityChecks : IRarity[] = [
    { check: (fraction) => fraction < 0.001, text: 'Absurdly rare', color: '#F26419', isRare: true },
    { check: (fraction) => fraction < 0.01, text: 'Extremely rare', color: '#F6AE2D', isRare: true },
    { check: (fraction) => fraction < 0.02, text: 'Very rare', color: 'blue', isRare: true },
    { check: (fraction) => fraction < 0.05, text: 'Rare', color: '#027AD6', isRare: true },
    { check: (fraction) => fraction < 0.1, text: 'Uncommon', color: '#0160A8', isRare: true },
    { check: (fraction) => true, text: 'Common', color: 'gray', isRare: false },
];

export default class StatHeadlines extends React.Component<IStatHeadlinesProps, {}> {
    public render() {

        const aggregates = this.props.stats.aggregates;
        const distribution = this.props.stats.distribution;

        const atLeast = distribution.percentage(distribution.permutationCountsOf(aggregates.sum).atLeast);
        const atMost = distribution.percentage(distribution.permutationCountsOf(aggregates.sum).atMost);
        const rarity = this.getRarity(Math.min(atLeast, atMost));
        const isHigh = aggregates.sum > aggregates.expected;
        const hiloString = rarity.isRare ? `(${isHigh ? 'high' : 'low'})` : null;

        if (aggregates.length === 1) {
            return null;
        }

        return (
            <div style={{ margin: '10px 0', textAlign: 'left', fontSize: '12px' }}>
                <div style={{ 
                    color: rarity.color,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: '10px 0',
                }}>{rarity.text} {hiloString}</div>
                <KeyValueLabel background={palette.color1} color="white" title="sum" value={aggregates.sum} />
                <KeyValueLabel background={palette.color2} color="white" title="avg" value={aggregates.average}/>
                <KeyValueLabel background={palette.color5} color="white" title="lo" value={aggregates.minimum}/>
                <KeyValueLabel background={palette.color4} color="white" title="hi" value={aggregates.maximum}/>
                <KeyValueLabel background={palette.color6} color="white" title="bounds" value={`${aggregates.lowestPossible}-${aggregates.highestPossible}`} />
                <KeyValueLabel background={palette.color3} color="black" title="exp" value={aggregates.expected}/>
                <KeyValueLabel background="green" color="white" title="at least" value={this.percentageString(atLeast)} />
                <KeyValueLabel background="green" color="white" title="at most" value={this.percentageString(atMost)} />
            </div>
        );
    }

    private percentageString(fraction: number): string {
        return (Math.round(fraction * 10000) / 100) + '%';
    }

    private getRarity(loPercentage: number): IRarity {
        for (const rarity of rarityChecks) {
            if (rarity.check(loPercentage)) {
                return rarity;
            }
        }

        return {
            check: (x) => true,
            color: 'black',
            isRare: false,
            text: 'NOT FOUND',
        };
    }
}