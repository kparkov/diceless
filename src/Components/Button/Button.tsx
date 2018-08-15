import * as React from 'react';
import './Button.css';

interface IButtonProps<T> {
    children: string,
    onClick: (item?: T) => void,
    item?: T,
    type?: 'default' | 'ok' | 'cancel' | 'warning',
}

export default class Button<T=any> extends React.Component<IButtonProps<T>, {}> {
    public render() {
        const classname = `button button-${(this.props.type || 'default')}`;

        return (
            <button
                className={classname}
                onClick={() => this.props.onClick(this.props.item)}
            >
                {this.props.children}
            </button>
        )
    }
}