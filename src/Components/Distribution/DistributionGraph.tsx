import * as React from 'react';

import { ICombinationCount } from '../../Library/Distribution';
import PoolStats from '../../Library/PoolStats';

export enum DisplayMode {
    exact,
    atleast,
    atmost
}
interface IDistributionGraphProps {
    stats: PoolStats,
    display: DisplayMode
}

const columnStyle : React.CSSProperties = {
    textAlign: 'right',
    width: '100px',
}

const headerRowStyle : React.CSSProperties = {
    ...columnStyle,
    borderBottom: '1px solid black',
    borderTop: '1px solid black',
    textAlign: 'left'
}

const highlight : React.CSSProperties = {
    backgroundColor: '#96D5F7'
}

export default class DistributionGraph extends React.Component<IDistributionGraphProps, {}> {
    public render() {
        const combinationsTotal = this.props.stats.distribution.combinations();
        const rows = this.props.stats.distribution.combinationCounts().map(c => this.renderBar(c.value, this.selectNumber(c), combinationsTotal));

        return (
            <div style={{ margin: '25px 0 0 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <tr>
                        <th style={headerRowStyle}>Sum</th>
                        <th style={headerRowStyle}>Percent</th>
                        <th style={headerRowStyle}>Combinations</th>
                        <th style={{ ...headerRowStyle, width: 'auto' }}>&nbsp;</th>
                    </tr>
                    {rows}
                </table>
            </div>
        )
    }

    private selectNumber(c: ICombinationCount) {
        switch(this.props.display) {
            case DisplayMode.atleast:
                return c.atLeast;
            
            case DisplayMode.atmost:
                return c.atMost;

            case DisplayMode.exact:
                return c.combinations;
        }
    }

    private renderBar(value: number, combinations: number, total: number) {
        const fraction = ((combinations / total) * 100)
        const fractionString = fraction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
        const cssFraction = fraction + '%';
        const rowStyle = this.props.stats.aggregates.sum === value ? { ...columnStyle, ...highlight } : columnStyle;

        return (
            <tr>
                <td style={rowStyle}>{value}</td>
                <td style={rowStyle}>{fractionString}</td>
                <td style={rowStyle}>{combinations}</td>
                <td style={{ ...rowStyle, width: 'auto' }}>
                    <div style={{
                        backgroundColor: '#CEE5F2',
                        border: '1px solid black',
                        height: '15px',
                        margin: '5px 0',
                    }}>
                        <div style={{
                            backgroundColor: '#7C98B3',
                            fontSize: '10px',
                            height: '100%',
                            width: cssFraction,
                        }}>
                            &nbsp;
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}