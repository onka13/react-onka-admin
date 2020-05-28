import React, { Component } from 'react';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, ListItem, Collapse, ListItemText, ListItemIcon, Button } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { withStyles } from '@material-ui/core/styles';
import { menuList } from '../modules/menu';
// -- modules
import { getQueryParam, HasAccess } from '../helpers/moduleHelper';
import staticHelper from '../helpers/staticHelper';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ErpBusiness from '../business/ErpBusiness';
import { openAdminUserUpdate } from '../modules/custom/pages/AdminUserUpdate/business';

class Menu2 extends Component {
	resources;
	constructor(props) {
		super(props);
		this.state = { open: '' };
		this.init(props);
	}
	componentWillReceiveProps(props) {
		this.init(props);
	}
	init(props) {
		this.resources = props.resources;
		//console.log('resources', this.resources);
	}
	sort = (a, b) => {
		return parseFloat(a.options.menuOrder) - parseFloat(b.options.menuOrder);
	};
	render() {
		//console.log("menu2", this.props);
		const { onMenuClick, classes } = this.props;
		const translate = ErpBusiness.instance().translate;
		if (getQueryParam('dialog') == '1') return null;
		const name = staticHelper.getUserName();
		const avatarLetters = name
			.split(' ')
			.map(x => (x.length > 0 ? x[0].toLocaleUpperCase() : ''))
			.join('');
		return (
			<div className={classes.menu2}>
				<div className={classes.top}>
					<Grid container spacing={0} justify="center" alignItems="center" direction="row" className={classes.avatarDiv}>
						<Avatar className={classes.orangeAvatar}>{avatarLetters}</Avatar>
						<Button onClick={() => {
							openAdminUserUpdate();
						}} variant="text" size="small">
							{name}
						</Button>
					</Grid>
				</div>
				<List component="nav" aria-labelledby="nested-list-subheader">
					{/* <DashboardMenuItem onClick={onMenuClick} /> */}
					<ListItem
						button
						onClick={() => {
							this.props.history.push({ pathname: '/' });
						}}
					>
						<ExpandLess className={classes.menuExpand} style={{ visibility: 'hidden' }} />
						<ListItemIcon>
							<DashboardIcon color="inherit" />
						</ListItemIcon>
						<ListItemText primary={translate('menu.dashboard')} />
					</ListItem>
					{menuList.map(menu => {
						//console.log('resources', menu, resources);

						var subMenus = this.resources
							.filter(x => x.options.menu == menu.name)
							.sort(this.sort)
							.map((resource, i) => {
								if (resource.options.hideMenu) return null;
								//console.log('r', resource.name, resource.options.menuOrder);
								if (!HasAccess(resource.options.moduleKey, resource.options.pageKey, 'list')) return null;
								//if(resource.name == "AdminApi/RoleMap") return null
								return (
									<MenuItemLink
										key={'m' + i}
										to={`/${resource.name}`}
										primaryText={translate(resource.options.label || 'resources.' + resource.name + '.name')}
										//leftIcon={resource.icon ? createElement(resource.icon) : undefined}

										onClick={onMenuClick}
										className={this.props.classes.nested}
									/>
								);
							})
							.filter(x => !!x);

						if (subMenus.length == 0) return null;
						return (
							<div key={menu.name}>
								<ListItem button onClick={() => this.setState(state => ({ open: state.open == menu.name ? '' : menu.name }))}>
									{this.state.open == menu.name ? <ExpandLess className={classes.menuExpand} /> : <ExpandMore className={classes.menuExpand} />}
									<ListItemIcon>{menu.icon}</ListItemIcon>
									<ListItemText primary={translate('menu.' + menu.name)} />
								</ListItem>
								<Collapse in={this.state.open == menu.name} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										{subMenus}
									</List>
								</Collapse>
							</div>
						);
					})}
				</List>
			</div>
		);
	}
}


const menuStyles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(8),
		//paddingBottom: 0
	},
	avatar: {
		margin: 10,
	},
	orangeAvatar: {
		color: '#fff',
		backgroundColor: theme.mixins.vs.color1,
		width: 40,
		height: 40,
	},
	image: {
		width: 64,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
	firmTitle: {
		fontSize: '1.175rem',
		fontWeight: 600,
		color: '#212529',
	},
	chip: {
		float: 'right',
	},
	menu2: {},
	currency: {
		position: 'absolute',
		right: 0,
		top: 0,
		backgroundColor: theme.palette.secondary.main,
		padding: 6,
		borderLeft: '1px solid',
		borderRight: '1px solid',
		borderColor: '#CCC',
	},
	top: {
		backgroundImage: 'linear-gradient(' + theme.mixins.vs.menuTopColors + ')',
		paddingTop: 10,
	},
	menuExpand: {
		width: '0.9em',
		height: '0.9em',
		marginRight: 6,
	},
	avatarDiv: {
		margin: 20,
		width: 'auto',
		paddingBottom: 20,
		borderBottom: '1px solid #eee',
	},
});


const mapStateToProps = state => ({
	resources: getResources(state),
});

var Menu2WithStyles = withStyles(menuStyles)(Menu2);

export default withRouter(connect(mapStateToProps, null, null, { forwardRef: true })(Menu2WithStyles));
