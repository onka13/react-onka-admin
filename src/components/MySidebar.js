import React from 'react';
import { Sidebar } from 'react-admin';
import { getQueryParam } from '../helpers/moduleHelper';
import staticHelper from '../helpers/staticHelper';

export default props => {
	if (getQueryParam('dialog') == '1') return null;
	return <Sidebar {...props} closedSize={0} style={{ marginTop: 0, marginLeft: 0 }} />;
};
