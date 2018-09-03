import * as React from 'react';

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

export default (props: {}) =>
    <header style={headerStyle}>
        <h1 style={titleStyle}>diceless<span style={{ color: '#008D76' }}>.io</span></h1>
    </header>;