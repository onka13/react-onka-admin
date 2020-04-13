import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PreApp from './PreApp';

React.Component.prototype.componentDidMount = function() {
	//console.log('React.Component.prototype.componentDidMount', this.constructor.name);
	if (this.props && this.props.onRef) {
		this.props.onRef(this);
	}
};

var originalLog = console.error;
console.error = function log(...args) {
	if (args.length > 0 && typeof args[0] === 'string' && /^Warning: Missing translation/.test(args[0])) {
		return;
	}
	originalLog.apply(console, args);
};

ReactDOM.render(<PreApp />, document.getElementById('root'));