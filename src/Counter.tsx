import * as React from 'react';

export interface ICounterProps {
    startNumber: number;
    interval: number;
}

export interface ICounterState {
    value: number;
}


export class Counter extends React.Component<ICounterProps, ICounterState> {
    constructor(props: ICounterProps) {
        super(props);
        this.state = { value: props.startNumber };
        setInterval(() => this.incrementCounter(), props.interval);
    }

    public render() {
        return <span>{this.state.value}</span>;
    }

    private incrementCounter(): void {
        this.setState({ value: this.state.value + 1 });
    }
}