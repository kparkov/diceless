import * as React from 'react';

const colors = {
    odd: '#DAD9C7',
    sides: {
        4: '#FCF6BD',
        6: '#EFEEDA',
        8: '#D0F4DE',
        10: '#A9DEF9',
        12: '#FF99C8',
        20: '#E4C1F9',
        100: '#B4DC7F',
    }
};

export interface IDieProps {
    value: number;
    sides: number;
}

export default class DieVisual extends React.Component<IDieProps, {}> {

    public render() {

        return (
            <div style={{
                backgroundColor: this.color(this.props.sides),
                border: '2px solid black',
                borderRadius: '5px',
                display: 'inline-block',
                fontFamily: 'Arial',
                margin: '0 5px 5px 0',
                minWidth: '30px',
                padding: '2px 5px',
                textAlign: 'center'
            }}>
                <div style={{fontSize: '12px', color: '#333'}}>d{this.props.sides}</div>
                <div style={{fontSize: '18px'}}>{this.props.value}</div>
            </div>
        );
    }

    private color(sides: number): string {
        if (colors.sides[sides]) {
            return colors.sides[sides];
        }

        return colors.odd;
    }
}