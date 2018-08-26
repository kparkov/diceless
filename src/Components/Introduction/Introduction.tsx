import * as React from 'react';
import Header from '../Text/Header';
import Subheader from '../Text/Subheader';

export default function Introduction() {
    return (
        <div style={{ margin: '4em auto', maxWidth: '800px' }}>
            <Header>Help</Header>
            <p>To get started, write an expression in the dice expression input box, or select one of the pre-made from the history shortcuts.</p>
            <p>Tip: press <strong>L</strong> to focus on the dice expression input.</p>
            <p> An example of a valid expression is:</p>
            <blockquote>
                4d6 + 3d8 + 4
            </blockquote>
            <p>Your roll will be shown in the history shortcuts. If you press <code>enter</code> in an empty expression box, your last pool will
            be re-rolled.</p>
            
            <Subheader>Quick stats</Subheader>
            <p>Quick stats will appear for every roll with more than 1 die.</p>
            <ul>
                <li><strong>sum:</strong> the sum of all dice and the constant.</li>
                <li><strong>avg:</strong> average of dice values.</li>
                <li><strong>lo:</strong> the minimum dice value in this roll.</li>
                <li><strong>hi:</strong> the maximum dice value in this roll.</li>
                <li><strong>bounds:</strong> the possible sum range of this roll (including constant).</li>
                <li><strong>exp:</strong> expected value (average sum in an infinite series).</li>
                <li><strong>at least:</strong> the chance to get <em>at least</em> this sum or higher.</li>
                <li><strong>at most:</strong> the chance to get <em>at most</em> this sum or lower.</li>
            </ul>

            <Subheader>Distribution graph</Subheader>
            <p>You can expand distributions for the roll, which will show you probabilities of every possible sum in the <em>bounds</em> range.</p>
            <p>This distribution can be for the <em>at least</em> probability, the <em>at most</em> probability, or the probability to
            get the <em>exact</em> sum.</p>
            <ul>
                <li><strong>sum:</strong> the sum of all dice and the constant.</li>
                <li><strong>percent:</strong> the percent chance associated with this sum and distribution.</li>
                <li><strong>permutations:</strong> the number of ways this dice pool can end up resulting in this sum.</li>
            </ul>
            <p>The total number of permutations in a given dice-pool is equal to the product of dice number of sides. For instance, 3d6 has</p>
            <blockquote>
                6<sup>3</sup> = 6 &times; 6 &times; 6 = 216 total permutations
            </blockquote>
            <p>The percent chance for a given sum is equal to the number of permutations that can result in the sum, divided by the total number of
            permutations.</p>
            <p>For example, there is only one way 3d6 can be 18 (6-6-6). But there are three ways it can be 17 (5-6-6, 6-5-6, 6-6-5). The chance
            of 18 is therefore 1/216, while the chance of 17 is 3/216. The chance of getting <em>at least</em> 17 is therefore 4/216 (1/216 + 3/216).</p>
            
        </div>
    );
}