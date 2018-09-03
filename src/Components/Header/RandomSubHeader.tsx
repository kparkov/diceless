import * as React from 'react';

import DiceFactory from '../../Library/DiceFactory';
import quotes from './quotes';

interface IRandomSubHeaderState {
    text: string
}

export default class RandomSubHeader extends React.Component<{}, IRandomSubHeaderState> {

    constructor(props: {}) {
        super(props);

        this.state = { text: this.pickAQuote() };
        this.periodical();
    }

    public render() {
        return (
            <div style={{
                fontSize: '1.2em'
            }}>{this.state.text}</div>
        );
    }

    private pickAQuote(): string {
        console.log('called'); // tslint:disable-line
        const length = quotes.data.length;
        const die = new DiceFactory();
        const value = die.createSingle(length).value;
        return quotes.data[value - 1];
    }

    private periodical(): void {
        setTimeout(() => {
            this.setState({ text: this.pickAQuote() });
            this.periodical();
        }, 15000);
    }
}