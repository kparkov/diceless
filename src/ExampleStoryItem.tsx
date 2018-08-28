import * as React from 'react';

interface IExampleStoryItemProps {
    text: string,
    color: string
}

export default class ExampleStoryItem extends React.Component<IExampleStoryItemProps, {}> {
    public render() {
        return <button style={{ color: this.props.color }}>{this.props.text}</button>;
    }
}