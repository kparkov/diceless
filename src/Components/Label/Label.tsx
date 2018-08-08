import * as React from 'react';

interface ILabelProps {
    background: string,
    color: string,
    children: React.ReactNode
}
export default class Label extends React.Component<ILabelProps, {}> {
    public render() {
        return (
            <span
                style={{
                    backgroundColor: this.props.background,
                    borderRadius: '5px',
                    color: this.props.color,
                    margin: '0 5px 0 0',
                    padding: '2px 5px',
                }}
            >
                {this.props.children}
            </span>
        )
    }
}