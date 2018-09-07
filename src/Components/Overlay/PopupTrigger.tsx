import * as React from 'react';

interface IPopupTriggerProps {
    children: React.ReactNode
    popup(): JSX.Element;
}

interface IPopupTriggerState {
    open: boolean
}

export default class PopupTrigger extends React.Component<IPopupTriggerProps, IPopupTriggerState> {

    constructor(props: IPopupTriggerProps) {
        super(props);
        this.state = { open: false };
    }

    public render() {

        const popup = this.state.open ? this.props.popup() : null;

        return (
            <div
                onClick={this.click}
                style={{ 
                    cursor: 'pointer',
                    position: 'relative' 
                }}
            >
                {this.props.children}
                {popup}
            </div>
        );
    }

    private click = () => {
        this.setState({ open: !this.state.open });
    }
}