import * as React from 'react';

import { storiesOf } from '@storybook/react';

import DicePanel from '../src/Components/Die/DicePanel';
import DiceFactory from '../src/Library/DiceFactory';
import PoolStats from '../src/Library/PoolStats';

const factory = new DiceFactory('seed');
const pool = factory.createFromExpression('3d6 + 2');
const stats = new PoolStats(pool);


storiesOf('DicePanel', module)
    .add('3d6 + 2', () => <DicePanel pool={pool} stats={stats} />);