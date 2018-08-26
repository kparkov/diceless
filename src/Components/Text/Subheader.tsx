import * as React from 'react';

export default (props: { children: React.ReactNode }) => 
    <h2 style={{ borderBottom: '1px solid #ccc', marginTop: '1.5em' }}>{props.children}</h2>;