import * as React from 'react';

import TextField from './TextField';

interface IExpressionInputProps {
    submitExpression: (expression: string) => string | null,
    onClearHistory: () => void,
}

interface IExpressionInputState {
    expression: string,
    windowWidth: number,
    history: string[]
}

export default class ExpressionInput extends React.Component<IExpressionInputProps, IExpressionInputState> {
    constructor(props: IExpressionInputProps) {
        super(props);

        this.state = { 
            expression: '', 
            history: [ '3d6', '4d6', '5d6', '1d4', '1d6', '1d8', '1d10', '1d12', '1d20', '1d100' ],
            windowWidth: 0 
        };
    }

    public componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    public render() {
        return (
            <div style={{textAlign: 'left', margin: '0 0 20px 0' }}>
                <TextField 
                    onChange={this.handleExpressionChange}
                    onKeyPress={this.handleKeyPress}
                    value={this.state.expression}
                    style={{
                        fontSize: '28px',
                        margin: '10px 0 20px 10px',
                        padding: '5px',
                        width: this.state.windowWidth - 45
                    }}
                    placeholder="Expression"
                />
                {this.renderHistory()}
            </div>
        )
    }

    private renderHistory() {
        const items = this.state.history.map((expression, index) => 
            <button 
                key={index} 
                style={{
                    backgroundColor: '#607B7D',
                    border: '1px solid #3A606E',
                    borderRadius: '5px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    margin: '0 5px 0 0',
                }}
                onClick={() => this.submitExpression(expression)} // tslint:disable-line
            >{expression}</button>
        );

        return (
            <div style={{ padding: '0 10px' }}>
                {items} <a onClick={this.clearHistory} href="#">clear history</a>
            </div>
        )
    }

    private handleExpressionChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ expression: e.target.value });

    private handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.submitExpression(this.state.expression);
        }
    }

    private updateWindowDimensions = () => this.setState({ windowWidth: window.innerWidth });

    private submitExpression(expression: string) {
        const actualizedExpression = this.props.submitExpression(expression);

        if (!actualizedExpression) {
            this.setState({ expression: '' });
            return;
        }

        let history = this.state.history.slice(0, 15);

        if (!history.some(exp => actualizedExpression === exp)) {
            history = [ actualizedExpression, ...history ];
        }
        
        this.setState({ expression: '', history });
    }

    private clearHistory = () => {
        this.props.onClearHistory();
        this.setState({ history: [] });
    }
}