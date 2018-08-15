import * as React from 'react';

interface ITextFieldProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    value: string,
    style?: object,
    type?: "text" | "password",
    placeholder?: string,
    hotkey?: string,
}

export default class TextField extends React.Component<ITextFieldProps, {}> {

    public static defaultProps: Partial<ITextFieldProps> = {
        style: {},
        type: "text"
    };

    private node: HTMLInputElement | null;

    public componentDidMount() {
        if (this.props.hotkey) {
            document.addEventListener('keyup', this.checkSetFocus);
        }
    }

    public componentWillUnmount() {
        if (this.props.hotkey) {
            document.removeEventListener('keyup', this.checkSetFocus);
        }
    }

    public render() {
        return (
            <input
                type="text"
                onChange={this.props.onChange}
                onKeyPress={this.props.onKeyPress}
                style={this.props.style}
                value={this.props.value}
                placeholder={this.props.placeholder}
                ref={n => this.node = n}
            />
        )
    }

    private checkSetFocus = (event: KeyboardEvent) => {
        if (this.props.hotkey && this.node && event.key.toLowerCase() === this.props.hotkey.toLowerCase()) {
            this.node.focus();
        }
    }
}