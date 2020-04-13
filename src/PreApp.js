import React from 'react';
import staticHelper from './helpers/staticHelper';
import App from './App';
import MyLoading from './components/MyLoading';

export default class PreApp extends React.Component {
	state = {
		loading: false,
	};
	componentDidMount() {
		this.init();
	}
	init() {
		// some logic
		staticHelper.loadDefaultLang().then(() => {
			this.setState({ loading: true });
		});
	}
	render() {
		if (!this.state.loading) return <MyLoading />;
		return <App />;
	}
}
