
import React, { Fragment } from 'react';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices, ShowButton } from 'react-admin';
import { getDateOptions, getQueryParam, MySelectField, toChoices, toChoiceLabel } from '../../../../helpers/moduleHelper';
import enums from '../../enums';
import { checkPageConfig } from '../../../../helpers/moduleHelper';
import _get from 'lodash/get';
import CC from '../../../../components/CustomComponents';

export const Defaults = {
    menu: 'adminApi',
    menuOrder: 0,
    route: 'AdminApi/AdminRoleDefinitionSearch',
    label: '',
    moduleKey: 'AdminApi',
    pageKey: 'AdminRoleDefinition',
    hideMenu: true,
}

export const pageConfig = checkPageConfig({
	get: false,
	edit: false,
	new: false,
	delete: false,
	export: false,
    primaryKeys: ["id"]
}, Defaults);

export const filterFields = [
    <CC.NumberInput key={0} source="roleId" validate={[maxValue(2147483647),maxLength(50)]} extraOptions={{ maxLength: 50 }} />,
	<CC.TextInput key={1} source="moduleKey" validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} />,
	<CC.TextInput key={2} source="pageKey" validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} />,
	<CC.TextInput key={3} source="actionKey" validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} />
];

export const listFields = [
    <CC.TextField key={1} source="roleId" sortable={false} />,
	<CC.TextField key={2} source="moduleKey" sortable={false} />,
	<CC.TextField key={3} source="pageKey" sortable={false} />,
	<CC.TextField key={4} source="actionKey" sortable={false} />,
	<CC.SelectField key={5} source="action" choices={toChoices(enums.AdminRoleAction, "AdminRoleAction")} sortable={false} />
];

export const exportHeaders = ['roleId','moduleKey','pageKey','actionKey','action'];

export const exportFields = (data, get = _get) => [
    { value: get(data, 'roleId'), type: 'number' },
		{ value: get(data, 'moduleKey'), type: 'string' },
		{ value: get(data, 'pageKey'), type: 'string' },
		{ value: get(data, 'actionKey'), type: 'string' },
		{ value: toChoiceLabel(enums.AdminRoleAction, 'AdminRoleAction', get(data, 'action')), type: 'string' }
];


export const detailFields = (prefix, extraProps) => {
	return [
        <CC.TextField key={0} source={prefix+"id"} sortable={true} {...extraProps}/>,
		<CC.TextField key={1} source={prefix+"roleId"} sortable={false} {...extraProps}/>,
		<CC.TextField key={2} source={prefix+"moduleKey"} sortable={false} {...extraProps}/>,
		<CC.TextField key={3} source={prefix+"pageKey"} sortable={false} {...extraProps}/>,
		<CC.TextField key={4} source={prefix+"actionKey"} sortable={false} {...extraProps}/>,
		<CC.SelectField key={5} source={prefix+"action"} choices={toChoices(enums.AdminRoleAction, "AdminRoleAction")} sortable={false} {...extraProps}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <CC.TextInput disabled key={0} source={prefix+"id"} {...extraProps}/>,
		<CC.NumberInput key={1} source={prefix+"roleId"} validate={[required(),maxValue(2147483647),maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.TextInput key={2} source={prefix+"moduleKey"} validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.TextInput key={3} source={prefix+"pageKey"} validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.TextInput key={4} source={prefix+"actionKey"} validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.SelectInput key={5} source={prefix+"action"} choices={toChoices(enums.AdminRoleAction, "AdminRoleAction")} validate={[required()]} {...extraProps}/>
	];
};
