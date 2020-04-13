import React from 'react';
import { useTranslate } from 'react-admin';
import config from '../config';
import rest from '../rest';
import ResponsiveDialog from './ResponsiveDialog';
import { CircularProgress, Snackbar, SnackbarContent, withStyles, IconButton } from '@material-ui/core';
import { green, amber } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import staticHelper from '../helpers/staticHelper';

class ErpSnackBarClass extends React.Component {
	state = {
		snackbars: {},
	};
	constructor(props) {
		super(props);
		props.onRef && props.onRef(this);
	}
	add(snackbar) {
		if (!snackbar.type) snackbar.type = 'info';
		if (!snackbar.duration && snackbar.duration != 0) snackbar.duration = 3000;
		if (snackbar.text && snackbar.text.indexOf('.') > 0) {
			snackbar.text = ErpBusiness.instance().translate(snackbar.text) || snackbar.text;
		}
		this.state.snackbars[snackbar.id] = snackbar;
		this.setState(this.state);
	}
	remove(id) {
		delete this.state.snackbars[id];
		this.setState(this.state);
	}
	getSnackbars() {
		var comp = [];
		for (const key in this.state.snackbars) {
			var options = this.state.snackbars[key];
			if (options.type != 'error' && options.duration > 0) {
				setTimeout(() => {
					this.remove(key);
				}, options.duration);
			}
			comp.push(
				<Snackbar
					key={key}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					open={true}
					autoHideDuration={options.duration}
					onClose={() => {}}
					ContentProps={{
						'aria-describedby': 'client-snackbar',
					}}
				>
					<SnackbarContent
						className={this.props.classes[options.type]}
						aria-describedby="client-snackbar"
						message={
							<span id="client-snackbar" style={{ display: 'flex', alignItems: 'center' }}>
								{options.text}
							</span>
						}
						action={[
							<IconButton
								key="close"
								aria-label="Close"
								color="inherit"
								onClick={() => {
									this.remove(key);
								}}
							>
								<CloseIcon />
							</IconButton>,
						]}
					/>
				</Snackbar>,
			);
		}
		return comp;
	}
	render() {
		//console.log('ErpSnackBarClass render', this.state.snackbars);
		return <div style={{ display: 'flex' }}>{this.getSnackbars()}</div>;
	}
}

const styles = theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.dark,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});


const ErpSnackBar = withStyles(styles)(ErpSnackBarClass);

class ErpBusinessComp extends React.Component {
	state = {
		loading: false,
	};
	componentDidMount() {
		ErpBusiness.instance().displayLoading = this.displayLoading;
		this.props.didMount && this.props.didMount();
	}
	displayLoading = show => {
		this.setState({ loading: show });
	};
	render() {
		return (
			<div>
				<ErpSnackBar onRef={c => (ErpBusiness.instance().snackBar = c)} {...this.props} />
				<ResponsiveDialog onRef={c => (ErpBusiness.instance().dialog = c)} mode="dialog" />
				<ResponsiveDialog onRef={c => (ErpBusiness.instance().drawer = c)} mode="drawer" />
				{this.state.loading && (
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 999999,
							backgroundColor: '#00000044',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{ErpBusiness.instance().renderLoading()}
					</div>
				)}
			</div>
		);
	}
}

class ErpBusiness {
	static myInstance: ErpBusiness = null;
	static instance() {
		if (this.myInstance == null) {
			throw new Error('Init Business Comp');
		}
		return this.myInstance;
	}
	static Comp() {
		return props => {
			const translate = useTranslate();
			//console.log('ErpBusiness comp', props, this.myInstance);
			if (this.myInstance == null) {
				this.myInstance = new ErpBusiness();
				this.myInstance.userLogout = props.userLogout;
				this.myInstance.locale = props.locale;
				this.myInstance.translate = translate;
				this.myInstance.history = props.history;
			}
			return <ErpBusinessComp {...props} />;
		};
	}
	dialog;
	drawer;
	snackBar;
	userLogout;
	locale;
	translate;
	displayLoading;
	history;
	callApi(route, params, options) {
		return rest(config.API_URL)('CUSTOM', route, params, options)
			.then(response => {
				if (response) {
					if ([10, 11, 12].indexOf(response.code) != -1) {
						var msg = 'api.code' + response.code;
						ErpBusiness.instance().displayMessage(msg, 'success');
					}
				}
				return response;
			})
			.catch(error => {
				// error.status, error.body.code
				console.log('error', error, error.status, error.message, error.body);
				var msg = 'An error occured! ' + error.message;
				msg += ' Status: ' + error.status;
				if (error.status === 400 && error.body) {
					if (error.body.code == -30 || error.body.code == -21) {
						setTimeout(() => {
							staticHelper.clear();
							this.history.push({ pathname: '/login' });
						}, 2000);
					}
					msg = error.body.message || 'api.code' + error.body.code;
				} else if (error.code > 0) {
					msg = error.message || 'api.code' + error.code;
				}

				ErpBusiness.instance().displayMessage(msg, 'error');
			});
	}
	renderLoading() {
		return <CircularProgress color="secondary" />;
	}
	displayMessage(text, type, duration) {
		var id = new Date().getTime();
		this.snackBar.add({ id, text, type, duration });
		return id;
	}
	openDrawer(options) {
		this.drawer.open(options);
	}
	openDialog(options) {
		this.dialog.open(options);
	}
}

export default ErpBusiness;
