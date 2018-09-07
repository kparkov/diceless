import * as React from 'react';

interface IPopupProps {
    children: React.ReactNode,
    minWidth?: number,
    positionLeft?: number,
    positionTop?: number,
    positionRight?: number,
    positionBottom?: number,
}

export default class Popup extends React.Component<IPopupProps, {}> {
    
    public render() {
        return (
            <div style={this.buildStyle()}>
                {this.props.children}
            </div>
        );
    }

    private buildStyle() : React.CSSProperties {
        const result: React.CSSProperties = {
            backgroundColor: 'white',
            border: '1px solid #aaa',
            borderRadius: '5px',
            boxShadow: '1px 1px 3px #ccc',
            left: this.props.positionLeft,
            minWidth: this.props.minWidth,
            padding: '10px',
            position: 'absolute',
            right: this.props.positionRight,
            top: this.props.positionTop,
            transition: 'all 0.5s ease',
        };

        return result;
    }
}