import * as React from 'react';

interface ITextFieldProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    value: string,
    style?: object,
    type?: "text" | "password",
    placeholder?: string
}

export default class TextField extends React.Component<ITextFieldProps, {}> {

    public static defaultProps: Partial<ITextFieldProps> = {
        style: {},
        type: "text"
    };

    public render() {
        return (
            <input
                type="text"
                onChange={this.props.onChange}
                onKeyPress={this.props.onKeyPress}
                style={this.props.style}
                value={this.props.value}
                placeholder={this.props.placeholder}
            />
        )
    }
}