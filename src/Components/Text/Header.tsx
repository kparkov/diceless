import * as React from 'react';

export default (props: { children: React.ReactNode }) => 
    <h1 style={{ borderBottom: '1px solid #ccc' }}>{props.children}</h1>;