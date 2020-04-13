import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	withStyles,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	MuiThemeProvider,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getTheme } from './MyThemes';

class ResponsiveDialog extends React.Component {
	state = {
		open: false,
	};
	options = {};
	constructor(props) {
		super(props);
		props.onRef && props.onRef(this);
		this.setDefaults();
	}
	setDefaults() {
		this.options = {
			dialogId: 0,
			url: '',
			title: '',
			content: '',
			buttons: [
				{ text: 'Yes', no: 1 },
				{ text: 'No', no: 2 },
			],
			fullScreen: true,
			maxWidth: 'md', // 'xs' | 'sm' | 'md' | false
			hasAppBar: false,
			callback: () => {},
			iframeCallback: () => {},
			addSelectField: false,
			hideActions: false,
			hideBreadCrumbs: true,
			hideFilters: false,
			hideDefaultFilters: false,
			disableBackdropClick: false,
			noback: false,
		};
	}
	open = opts => {
		this.options = { ...this.options, ...opts };
		if (this.options.url) {
			if (!this.options.dialogId) this.options.dialogId = new Date().getTime();
			var baseUrl = './?dialog=1&iframeCallback=' + this.options.dialogId;
			if (this.options.addSelectField) baseUrl += '&selectField=1';
			if (this.options.hideActions) baseUrl += '&hideActions=1';
			if (this.options.hideBreadCrumbs) baseUrl += '&hideBreadCrumbs=1';
			if (this.options.hideFilters) baseUrl += '&hideFilters=1';
			if (this.options.hideDefaultFilters) baseUrl += '&hideDefaultFilters=1';
			if (this.options.noback) baseUrl += '&noback=1';
			if (this.options.defaultValues) baseUrl += '&defaultValues=' + JSON.stringify(this.options.defaultValues);
			this.options.url = baseUrl + '#' + this.options.url;
		}
		window['iframeCallback' + this.options.dialogId] = record => {
			console.log('iframeCallback1', record, this.options.iframeCallback);
			this.options.iframeCallback(record);
			this.close();
		};
		this.setState({ open: true });
	};

	close = no => {
		this.setDefaults();
		this.setState({ open: false }, () => {
			this.options.callback(no);
		});
	};
	renderAppBar() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<AppBar className={classes.appBar} color="primary">
					<Toolbar>
						<IconButton color="inherit" onClick={this.close} aria-label="Close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h4" color="inherit" className={classes.title}>
							{this.options.title}
						</Typography>
						{this.options.buttons.map((x, i) => (
							<Button key={i} onClick={() => this.close(x.no)} color="inherit" autoFocus={i == 0}>
								{x.text}
							</Button>
						))}
					</Toolbar>
				</AppBar>
				{this.options.url ? this.renderIframe() : <div style={{ minWidth: 300 }}>{this.options.content}</div>}
			</React.Fragment>
		);
	}
	renderIframe() {
		return <iframe src={this.options.url} style={{ border: 'none', height: '100%', width: '100%' }} />;
	}
	renderInner() {
		if (this.options.hasAppBar) {
			return this.renderAppBar();
		}
		if (this.options.url) {
			return this.renderIframe();
		}
		return (
			<React.Fragment>
				<DialogTitle id="responsive-dialog-title">{this.options.title}</DialogTitle>
				<DialogContent style={{ minWidth: 300 }}>{this.options.content}</DialogContent>
				<DialogActions>
					{this.options.buttons.map((x, i) => (
						<Button key={i} onClick={() => this.close(x.no)} color="primary" autoFocus={i == 0}>
							{x.text}
						</Button>
					))}
				</DialogActions>
			</React.Fragment>
		);
	}
	render() {
		//console.log("ResponsiveDialog render", getTheme());
		return (
			<MuiThemeProvider theme={getTheme()}>
				{this.props.mode == 'drawer' ? (
					<Drawer
						open={this.state.open}
						anchor="right"
						onClose={() => this.close(-1)}
						ModalProps={{
							disableBackdropClick: this.options.disableBackdropClick,
						}}
					>
						{this.renderInner()}
					</Drawer>
				) : (
					<div>
						<Dialog
							fullScreen={this.options.fullScreen}
							maxWidth={this.options.maxWidth}
							open={this.state.open}
							onClose={() => this.close(-1)}
							aria-labelledby="responsive-dialog-title"
							disableBackdropClick={this.options.disableBackdropClick}
						>
							{this.renderInner()}
						</Dialog>
					</div>
				)}
			</MuiThemeProvider>
		);
	}
}

const styles = theme => ({
	appBar: {
		position: 'relative',
	},
	flex: {
		flex: 1,
	},
	flexCenter: {
		flex: 1,
		//alignItems: "center",
		//justifyContent: "center",
		textAlign: 'center',
	},
	title: {
		flex: 1,
		//alignItems: "center",
		//justifyContent: "center",
		textAlign: 'center',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		margin: 'auto',
		//width: "fit-content"
	},
	formControl: {
		marginTop: theme.spacing(2),
		minWidth: 120,
	},
	formControlLabel: {
		marginTop: theme.spacing(1),
	},
});


export default withStyles(styles)(ResponsiveDialog);