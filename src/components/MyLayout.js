import React, { Component, createElement, useEffect, useRef, useState } from 'react';
//import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router';
import { createMuiTheme, withStyles, createStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import compose from 'recompose/compose';

import { AppBar, Menu, Notification, Sidebar, setSidebarVisibility, Error, Login } from 'react-admin';
import { Grid, Button } from '@material-ui/core';
import { VipLink } from '../helpers/componentHelper';
import staticHelper from '../helpers/staticHelper';
import { getQueryParam } from '../helpers/moduleHelper';
import ErpBusiness from '../business/ErpBusiness';
import config from '../config';

const styles = (theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			zIndex: 1,
			minHeight: '100vh',
			backgroundColor: theme.palette.background.default,
			color: theme.palette.text.primary,
			position: 'relative',
			//minWidth: 'fit-content',
			width: '100%',
		},
		appFrame: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
		},
		contentWithSidebar: {
			display: 'flex',
			flexGrow: 1,
			marginTop: 48,
		},
		content: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			flexGrow: 1,
			flexBasis: 0,
			backgroundImage: 'linear-gradient(' + theme.mixins.vs.rightSideBgColors + ')',
			//padding: theme.spacing(3),
			//[theme.breakpoints.up("xs")]: {
			//	paddingLeft: 5
			//},
			//[theme.breakpoints.down("sm")]: {
			//	padding: 0
			//}
		},
		contentInner: {
			paddingLeft: 30,
			paddingRight: 30,
			minHeight: 300,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			[theme.breakpoints.down("sm")]: {
				padding: 0,
				paddingTop: 15
			}
		},
		footer: {
			marginTop: 15,
			//marginLeft: 30,
			//marginRight: 30,
			marginBottom: 20,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingBottom: 100
		},
	});

const sanitizeRestProps = ({ staticContext, history, location, match, ...props }) => props;

class Layout extends Component {
	state = { hasError: false, errorMessage: null, errorInfo: null };

	constructor(props) {
		super(props);
		/**
		 * Reset the error state upon navigation
		 *
		 * @see https://stackoverflow.com/questions/48121750/browser-navigation-broken-by-use-of-react-error-boundaries
		 */
		props.history.listen(() => {
			if (this.state.hasError) {
				this.setState({ hasError: false });
			}
		});
	}

	componentDidCatch(errorMessage, errorInfo) {
		this.setState({ hasError: true, errorMessage, errorInfo });
	}
	_renderFooter() {
		if (getQueryParam('dialog') == '1') return null;
		return (
			<footer className={this.props.classes.footer}>
				<div>
					<Button href="#" size="small" target="_blank" color="primary">
						{ErpBusiness.instance().translate('footer.privacy')}
					</Button>
					<Button href="#" size="small" target="_blank" color="primary">
						{ErpBusiness.instance().translate('footer.support')}
					</Button>
					<Button href="#" size="small" target="_blank" color="primary">
						{ErpBusiness.instance().translate('footer.terms')}
					</Button>
					<VipLink to="#" size="small" color="primary">
						{ErpBusiness.instance().translate('footer.contact')}
					</VipLink>
				</div>
				<div>
					<Button href="#" size="small" target="_blank" color="primary">
						© 2020 - v{config.VERSION} - ONKA ADMIN
					</Button>
				</div>
			</footer>
		);
	}
	render() {
		const { appBar, children, classes, className, customRoutes, error, dashboard, logout, menu, notification, open, sidebar, title, ...props } = this.props;
		const { hasError, errorMessage, errorInfo } = this.state;
		return (
			<div className={classnames('layout', classes.root, className)} {...sanitizeRestProps(props)}>
				<div className={classes.appFrame}>
					<main className={classes.contentWithSidebar}>
						{createElement(sidebar, {
							children: createElement(menu, {
								logout,
								hasDashboard: !!dashboard,
							}),
						})}
						<div className={classes.content}>
							{createElement(appBar, { title, open, logout })}
							<div className={classes.contentInner}>
								{hasError
									? createElement(error || Error, {
											error: errorMessage,
											errorInfo,
											title,
									  })
									: children}
								{this._renderFooter()}
							</div>
						</div>
					</main>
					{createElement(notification || Notification)}
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	open: state.admin.ui.sidebarOpen,
});

const EnhancedLayout = compose(connect(mapStateToProps, {}), withRouter, withStyles(styles))(Layout);

const LayoutWithTheme = ({ theme: themeOverride, ...props }) => {
	const themeProp = useRef(themeOverride);
	const [theme, setTheme] = useState(createMuiTheme(themeOverride));

	useEffect(() => {
		if (themeProp.current !== themeOverride) {
			themeProp.current = themeOverride;
			setTheme(createMuiTheme(themeOverride));
		}
	}, [themeOverride, themeProp, theme, setTheme]);

	return (
		<ThemeProvider theme={theme}>
			<EnhancedLayout {...props} />
		</ThemeProvider>
	);
};


export default LayoutWithTheme;
