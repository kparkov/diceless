import * as React from 'react';
import Emphasis from '../Text/Emphasis';
import Header from '../Text/Header';

export default function Introduction() {
    return (
        <div style={{ margin: '4em auto', maxWidth: '800px' }}>
            <Header>Welcome</Header>
            <p>To get started, write an expression in the dice expression input box, or select one of the pre-made from the history shortcuts.</p>
            <p>Tip: press <strong>L</strong> to focus on the dice expression input.</p>
            <p> An example of a valid expression is:</p>
            <blockquote>
                4d6 + 3d8
            </blockquote>
            <p>A roll will be made, and some stats will appear about that roll.</p>
            <dl>
                <dt>at least</dt>
                <dd>The chance of getting this result <Emphasis>or higher</Emphasis>.</dd>
            </dl>
        </div>
    );
}