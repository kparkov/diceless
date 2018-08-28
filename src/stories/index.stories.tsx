import * as React from 'react';

// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';

import ExampleStoryItem from '../ExampleStoryItem';

storiesOf('Box', module)
    .add('simple', () => <ExampleStoryItem text="Press me!" color="black" />)
    .add('danger', () => <ExampleStoryItem text="Click me with caution!" color="red" />);