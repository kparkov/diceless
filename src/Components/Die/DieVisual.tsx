import * as React from 'react';

export interface IDieProps {
    value: number;
    sides: number;
}

export class DieVisual extends React.Component<IDieProps, {}> {
    public render() {
        return (
            <div style={{
                backgroundColor: '#EFEEDA',
                border: '2px solid black',
                borderRadius: '5px',
                fontSize: '18px',
                margin: '0 5px 0 0',
                minWidth: '30px',
                padding: '2px 5px',
            }}>
                <div style={{fontSize: '14px', color: '#333'}}>d{this.props.sides}</div>
                <div style={{fontSize: '18px'}}>{this.props.value}</div>
            </div>
        );
    }
}