import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Button, Confirm, changeLocale as changeLocaleAction, useSetLocale } from 'react-admin';
import { ListItem, List, ListItemText } from '@material-ui/core';
import ErpBusiness from '../business/ErpBusiness';
import staticHelper from '../helpers/staticHelper';

const LocaleList = () => {
	const setLocale = useSetLocale();
	const handleListItemClick = (locale) => {
		staticHelper.setCurrentLang(locale);
		//this.props.changeLocale(locale);
		//changeLocaleAction(locale);
		setLocale(locale);
		ErpBusiness.instance().dialog.close();
	};
	return (
		<div style={{ width: 400 }}>
			<List>
				<ListItem button onClick={() => handleListItemClick('tr')}>
					<img src={process.env.PUBLIC_URL + '/img/flags/Turkey.png'} style={{ marginRight: 10 }} />
					<ListItemText primary={'  Türkçe'} />
				</ListItem>
				<ListItem button onClick={() => handleListItemClick('en')}>
					<img src={process.env.PUBLIC_URL + '/img/flags/United-States.png'} style={{ marginRight: 10 }} />
					<ListItemText primary={'  English'} />
				</ListItem>
			</List>
		</div>
	);
};

const LocaleListComp = connect(
	undefined,
	{ changeLocale: changeLocaleAction },
	null,
	{ forwardRef: true },
)(LocaleList);

export const changeLangDialog = () => {
	ErpBusiness.instance().openDialog({
		buttons: [],
		fullScreen: false,
		disableBackdropClick: false,
		content: <LocaleList />,
	});
};
