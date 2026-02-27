import * as React from 'react';
import './App.css';

import ApplicationHeader from './Components/Header/ApplicationHeader';
import { RollHub } from './Containers/RollHub/RollHub';

class App extends React.Component {
	public render() {
		return (
			<div className="App">
				<ApplicationHeader />
				<RollHub />
			</div>
		);
	}
}

export default App;
