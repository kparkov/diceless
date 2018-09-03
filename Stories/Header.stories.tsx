import * as React from 'react';
import '../src/Fonts.css';

import { storiesOf } from '@storybook/react';
import ApplicationHeader from '../src/Components/Header/ApplicationHeader';

storiesOf('Header', module)
    .add('Diceless header', () => <ApplicationHeader />)