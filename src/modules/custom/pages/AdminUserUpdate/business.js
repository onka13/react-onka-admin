import React from 'react';
import { pageConfig, Defaults } from './pageConfig';
import { CustomEdit, MySimpleForm, MyEditCreateToolbar, getEditFormProps } from '../../../../helpers/moduleHelper';
import { fieldsFilterSort, MyListFilters } from '../../../../helpers/moduleHelper';
import { inputFields } from '../../../adminApi/pages/AdminUserSearch/pageConfig';
import ErpBusiness from '../../../../business/ErpBusiness';
import staticHelper from '../../../../helpers/staticHelper';

const validation = (values) => {
	const errors = {};
	//if (!values.title) {
	//  errors.title = ["The title is required"];
	//}
	return errors;
};

const customInputFields = () => {
	const fields = fieldsFilterSort(inputFields(''), '', ['name', 'pass', 'theme']);
	return [fields];
};

const MyEdit = (props) => {
	//console.log('MyEdit props', props);
	return (
		<MySimpleForm {...props} validate={validation} isEdit={true} toolbar={<MyEditCreateToolbar isEdit={true} pageConfig={pageConfig} redirect={false} />}>
			{customInputFields()}
		</MySimpleForm>
	);
};
const MyList = null;
const MyDetail = null;
const MyCreate = null;

export { MyList, MyDetail, MyEdit, MyCreate };

const dialog = (record) => {
	var props = getEditFormProps(true, record, Defaults.route, (response, newData) => {
		if (!response.success) return;
		staticHelper.setUserName(newData.name);
		if (newData.theme != record.theme) {
			staticHelper.setUserTheme(newData.theme);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
			return;
		}
		ErpBusiness.instance().drawer.close();
	});
	ErpBusiness.instance().openDrawer({
		title: 'Profile',
		hasAppBar: true,
		buttons: [],
		content: <MyEdit {...props} />,
	});
};

export const openAdminUserUpdate = () => {
	ErpBusiness.instance()
		.callApi(Defaults.route + '/get', null, { method: 'GET' })
		.then((response) => {
			console.log('ress', response);

			if (!response || !response.success) return;
			dialog(response.value);
		});
};
