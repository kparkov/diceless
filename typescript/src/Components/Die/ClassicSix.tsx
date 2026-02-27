import * as React from 'react';

import { IDieProps } from './DieVisual';

export class ClassicSix extends React.Component<IDieProps, {}> {
    public render() {
        return (
            <div style={{
                backgroundColor: '#ffdddd',
                border: '1px solid red',
                fontSize: '18px',
                margin: '0 5px 0 0',
                padding: '2px 5px'
            }}>{this.props.value}</div>
        );
    }
}