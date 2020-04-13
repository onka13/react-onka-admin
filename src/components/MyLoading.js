import React from 'react';
import { CircularProgress } from "@material-ui/core";

export default class MyLoading extends React.Component {
	render() {
		return (
			<div
				style={{
					alignItems: 'center',
					flex: 1,
					justifyContent: 'center',
					position: 'absolute',
					right: 0,
					left: 0,
					bottom: 0,
					top: 0,
					display: 'flex',
				}}
			>
				<CircularProgress color="secondary" />
			</div>
		);
	}
}
