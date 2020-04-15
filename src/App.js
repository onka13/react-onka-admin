import React from 'react';
import { Admin } from 'react-admin';
import { withRouter, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import ErpBusiness from './business/ErpBusiness';
import staticHelper from './helpers/staticHelper';
import dataProvider from './dataProvider';
import MyMenu from './components/MyMenu';
import MyAppBar from './components/MyAppBar';
import MySidebar from './components/MySidebar';
import MyLayout from './components/MyLayout';
// modules
import custom from './modules/custom';
import adminApi from './modules/adminApi';
import accountApi from './modules/accountApi';
import { getTheme } from './business/MyThemes';

const LayoutCustom = props => {
	return <MyLayout {...props} menu={MyMenu} appBar={MyAppBar} sidebar={MySidebar} />;
};

const BusinessComp = withRouter(ErpBusiness.Comp());

const ExtraComps = () => (
	<MuiThemeProvider theme={getTheme()}>
		<BusinessComp />
	</MuiThemeProvider>
);

const App = () => {
	return (
		<Admin
			theme={getTheme()}
			dataProvider={dataProvider()}
			authProvider={authProvider}
			dashboard={Dashboard}
			appLayout={LayoutCustom}
			i18nProvider={staticHelper.i18nProvider()}
			locale=""
			//customRoutes={[<Route exact path="/custom-route" component={CustomRouteComp} />]}
		>
			{custom}
			{adminApi}
			{accountApi}
			<ExtraComps />
		</Admin>
	);
};
export default App;
