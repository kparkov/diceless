import * as React from 'react';

interface IKeyValueLabelProps {
    background: string,
    color: string,
    title: string,
    value: React.ReactNode
}
export default class KeyValueLabel extends React.Component<IKeyValueLabelProps, {}> {
    public render() {
        return (
            <span
                style={{
                    margin: '0 5px 0 0',
                }}
            >
                <span
                    style={{
                        backgroundColor: this.props.background,
                        borderBottomLeftRadius: '5px',
                        borderTopLeftRadius: '5px',
                        color: this.props.color,
                        padding: '2px 5px',
                    }}
                >
                    {this.props.title}
                </span>
                <span
                    style={{
                        backgroundColor: '#333',
                        borderBottomRightRadius: '5px',
                        borderTopRightRadius: '5px',
                        color: 'white',
                        padding: '2px 5px',
                    }}
                >
                    {this.props.value}
                </span>
            </span>
        )
    }
}