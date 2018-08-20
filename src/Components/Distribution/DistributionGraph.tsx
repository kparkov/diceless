import * as React from 'react';

import { IPermutationCount } from '../../Library/Distribution';
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

const SCIENTIFIC_NOTATION_CUTOFF : number = 8;

export default class DistributionGraph extends React.Component<IDistributionGraphProps, {}> {

    public render() {
        const permutationsTotal = this.props.stats.distribution.permutations();
        const orderOfTotal = this.getNumberOrder(permutationsTotal);
        const displayPermutations = orderOfTotal < 15;
        const rows = this.props.stats.distribution.permutationCounts().map(c => 
            this.renderBar(c.value, this.selectNumber(c), permutationsTotal, displayPermutations)
        );

        return (
            <div style={{ margin: '25px 0 0 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                        <tr>
                            <th style={headerRowStyle}>Sum</th>
                            <th style={headerRowStyle}>Percent</th>
                            {orderOfTotal < 16 ? <th style={headerRowStyle}>Permutations</th> : null}
                            <th style={{ ...headerRowStyle, width: 'auto' }}>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }

    private selectNumber(c: IPermutationCount) {
        switch(this.props.display) {
            case DisplayMode.atleast:
                return c.atLeast;
            
            case DisplayMode.atmost:
                return c.atMost;

            case DisplayMode.exact:
                return c.permutations;
        }
    }

    private renderBar(value: number, permutations: number, total: number, displayPermutations: boolean) {
        const fraction = ((permutations / total) * 100);

        const fractionString = fraction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
        const cssFraction = fraction + '%';
        const rowStyle = this.props.stats.aggregates.sum === value ? { ...columnStyle, ...highlight } : columnStyle;

        let permutationColumn : JSX.Element | null = null;

        if (displayPermutations) {
            const order = this.getNumberOrder(permutations);

            if (order > SCIENTIFIC_NOTATION_CUTOFF) {
                const firstThree = (parseInt(permutations.toString().replace(/[\.,]/g, '').slice(0, 3), 10) / 100).toLocaleString();
                permutationColumn = <span>{firstThree} &times; 10<sup>{order - 1}</sup></span>;
            } else {
                permutationColumn = <span>{permutations.toLocaleString()}</span>;
            }

            permutationColumn = <td style={rowStyle}>{permutationColumn}</td>;
        }

        return (
            <tr key={value}>
                <td style={rowStyle}>{value}</td>
                <td style={rowStyle}>{fractionString}</td>
                {permutationColumn}
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

    private getNumberOrder(number: number): number {
        return Math.log(number) * Math.LOG10E + 1 | 0; // tslint:disable-line
    }
}