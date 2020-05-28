import React from 'react';
import { UserMenu, AppBar, useTranslate } from 'react-admin';
import { withRouter } from 'react-router-dom';
import { ListItem, ListItemText, Typography, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import LocaleIcon from '@material-ui/icons/Language';
import Person from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles } from '@material-ui/core/styles';
import { getQueryParam } from '../helpers/moduleHelper';
import { changeLangDialog } from '../pages/LocaleList';
import staticHelper from '../helpers/staticHelper';
import { openAdminUserUpdate } from '../modules/custom/pages/AdminUserUpdate/business';

/*  */
const MyUserMenu = withRouter((props) => {
	const translate = useTranslate();
	return (
		<React.Fragment>
			<IconButton onClick={openAdminUserUpdate}>
				<Person />
			</IconButton>
			<UserMenu {...props} icon={<SettingsIcon />} logout={null} label="">
				<div>
					<ListItem button onClick={changeLangDialog} style={{ paddingLeft: 16 }}>
						<LocaleIcon />
						<ListItemText inset primary={translate('menu.changeLang')} />
					</ListItem>
				</div>
				<div>
					<ListItem
						button
						onClick={() => {
							staticHelper.clear();
							props.history.push({ pathname: '/login' });
						}}
						style={{ paddingLeft: 16 }}
					>
						<ExitToAppIcon />
						<ListItemText inset primary={translate('menu.logout')} />
					</ListItem>
				</div>
			</UserMenu>
		</React.Fragment>
	);
});
//const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} />;
const appBarStyles = () => {
	//console.log("theme", theme);

	return {
		title: {
			flex: 2,
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textAlign: 'center'
		},
		spacer: {
			flex: 1,
		},
	};
};
export default withStyles(appBarStyles)(({ classes, ...props }) => {
	if (getQueryParam('dialog') == '1') return null;
	return (
		<AppBar {...props} userMenu={<MyUserMenu />} color="primary">
			<div style={{ display: 'flex', alignItems: 'baseline' }}>
				<Typography variant="h5" style={{ marginRight: 15 }}>
					{/* Title */}
				</Typography>
				{/* <Typography variant="subtitle1">Sub title</Typography> */}
			</div>
			{/* <AppBarSearch /> */}
			<span className={classes.spacer} />
			<Typography variant="h6" color="inherit" className={classes.title} id="react-admin-title" />
			<span className={classes.spacer} />
		</AppBar>
	);
});
