import * as React from 'react';

import { storiesOf } from '@storybook/react';

import DieVisual from '../src/Components/Die/DieVisual';

storiesOf('DieVisual', module)
    .add('1d6', () => <DieVisual value={6} sides={6} />)
    .add('1d100', () => <DieVisual value={100} sides={100} />)
    .add('1d1000', () => <DieVisual value={1000} sides={1000} />);