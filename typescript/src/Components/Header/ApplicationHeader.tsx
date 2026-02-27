import * as React from 'react';
import Changelog from '../Introduction/Changelog';
import Popup from '../Overlay/Popup';
import PopupTrigger from '../Overlay/PopupTrigger';

const headerStyle : React.CSSProperties = {
    backgroundColor: '#fff',
    color: 'black',
    fontFamily: '"Roboto", Arial',
    padding: '10px 10px 10px 10px',
};

const titleStyle : React.CSSProperties = {
    fontSize: '4em',
    margin: '0',
};

export default class ApplicationHeader extends React.Component<{}, {}> {
    public render() {

        const popup = () => (
            <Popup 
                positionRight={0} 
                positionTop={30}
                minWidth={300}
            >
                <Changelog />
            </Popup>
        );

        return (
            <header style={headerStyle}>
                <div 
                    style={{
                        float: 'right',
                    }}
                >
                    <PopupTrigger popup={popup}>
                        <span style={{ color: '#009' }}>Changelog</span>
                    </PopupTrigger>
                </div>
                <h1 style={titleStyle}>diceless<span style={{ color: '#008D76' }}>.io</span></h1>
            </header>
        );
    }
}    