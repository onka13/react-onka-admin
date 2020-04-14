import React from 'react';
import { ReferenceArrayInput, SelectArrayInput } from 'react-admin';
import { Button, Typography } from '@material-ui/core';
import { pageConfig, Defaults, inputFields, filterFields, listFields, detailFields } from './pageConfig';
import MyList from './list';
import MyDetail from './detail';
import { MyEdit, MyCreate } from './upsert';
import { fieldsFilterSort, MyListFilters, HasAccess, getEditFormProps, MySimpleForm, MyEditCreateToolbar } from '../../../../helpers/moduleHelper';
import enums from '../../enums';
import ErpBusiness from '../../../../business/ErpBusiness';

const hasAccessRoles = HasAccess(Defaults.moduleKey, Defaults.pageKey, 'assignRole');

export const ListExtraButtons = ({ record = {} }) => {
	const title = ErpBusiness.instance().translate('other.adminUser.roles');
	return (
		<span>
			{hasAccessRoles && (
				<Button
					onClick={() => {
						ErpBusiness.instance().openDrawer({
							title: title,
							hasAppBar: true,
							buttons: [],
							content: <UserRolesMap userId={record.id} isSuper={record.isSuper} />,
						});
					}}
					color="primary"
					variant="text"
				>
					{title}
				</Button>
			)}
		</span>
	);
};

export const extraActions = () => (
	<React.Fragment>
		<span />
	</React.Fragment>
);

export const defaultValue = {};

export const validation = (values) => {
	const errors = {};
	//if (!values.title) {
	//  errors.title = ["The title is required"];
	//}
	return errors;
};

export const customInputFields = (isEdit, prefix) => {
	const fields = fieldsFilterSort(inputFields(prefix), prefix);
	return [fields];
};

export const customFilterFields = () => {
	return MyListFilters(filterFields);
};

export const customListFields = () => {
	return listFields;
};

export const customDetailFields = () => {
	const fields = fieldsFilterSort(detailFields(''));
	return [fields];
};

export { MyList, MyDetail, MyEdit, MyCreate };

export class UserRolesMap extends React.Component {
	userId;
	isSuper;
	record;
	constructor(props) {
		super(props);
		this.userId = props.userId;
		this.isSuper = props.isSuper;
	}
	componentDidMount() {
		ErpBusiness.instance()
			.callApi(
				Defaults.route + '/getRoles',
				{
					userId: this.userId,
				},
				{ method: 'POST' },
			)
			.then((response) => {
				console.log('getRoles response', response);
				if (!response || !response.success) return;
				this.record = { ids: response.value.map((x) => x.roleId) };
				this.forceUpdate();
			});
	}
	save = (newData) => {
		ErpBusiness.instance()
			.callApi(
				Defaults.route + '/assignRole',
				{
					userId: this.userId,
					roles: newData.ids,
				},
				{ method: 'POST' },
			)
			.then((response) => {
				console.log('save response', response);
				if (!response || !response.success) return;
			});
	};
	render() {
		console.log('UserRolesMap render', this.props);
		if (this.isSuper)
			return (
				<div style={{ padding: 20 }}>
					<Typography variant="h4"> Super Admin</Typography>
				</div>
			);
		if (!this.record) return ErpBusiness.instance().renderLoading();

		var props = getEditFormProps(true, this.record, Defaults.route, this.props.callback, this.userId);
		props.save = this.save;
		return (
			<MySimpleForm {...props} toolbar={<MyEditCreateToolbar isEdit={true} pageConfig={pageConfig} />}>
				<ReferenceArrayInput label="Roles" source="ids" reference="admin/AdminRoleSearch" filter={{}} allowEmpty={true}>
					<SelectArrayInput optionText="name" />
				</ReferenceArrayInput>
			</MySimpleForm>
		);
	}
}
