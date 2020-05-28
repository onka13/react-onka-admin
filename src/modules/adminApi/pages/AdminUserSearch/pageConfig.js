
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
    route: 'AdminApi/AdminUserSearch',
    label: '',
    moduleKey: 'AdminApi',
    pageKey: 'AdminUser',
    hideMenu: false,
}

export const pageConfig = checkPageConfig({
	get: false,
	edit: true,
	new: true,
	delete: false,
	export: false,
    primaryKeys: ["id"]
}, Defaults);

export const filterFields = [
    <CC.TextInput key={0} alwaysOn source="name" validate={[maxLength(200)]} extraOptions={{ maxLength: 200 }} />,
	<CC.TextInput key={1} alwaysOn source="email" validate={[maxLength(200)]} extraOptions={{ maxLength: 200 }} />,
	<CC.SelectInput key={2} alwaysOn source="status" choices={toChoices(enums.Status, "Status")}  />,
	<CC.NumberInput key={3} source="id" validate={[maxValue(2147483647),maxLength(50)]} extraOptions={{ maxLength: 50 }} />
];

export const listFields = [
    <CC.TextField key={1} source="no" sortable={false} />,
	<CC.TextField key={2} source="name" sortable={false} />,
	<CC.TextField key={3} source="email" sortable={false} />,
	<CC.SelectField key={4} source="status" choices={toChoices(enums.Status, "Status")} sortable={false} />,
	<CC.BooleanField key={5} source="isSuper" sortable={false} />
];

export const exportHeaders = ['no','name','email','status','isSuper'];

export const exportFields = (data, get = _get) => [
    { value: get(data, 'no'), type: 'string' },
		{ value: get(data, 'name'), type: 'string' },
		{ value: get(data, 'email'), type: 'string' },
		{ value: toChoiceLabel(enums.Status, 'Status', get(data, 'status')), type: 'string' },
		{ value: get(data, 'isSuper'), type: 'string' }
];


export const detailFields = (prefix, extraProps) => {
	return [
        <CC.TextField key={0} source={prefix+"id"} sortable={true} {...extraProps}/>,
		<CC.TextField key={1} source={prefix+"name"} sortable={false} {...extraProps}/>,
		<CC.TextField key={2} source={prefix+"email"} sortable={false} {...extraProps}/>,
		<CC.TextField key={3} source={prefix+"pass"} sortable={false} {...extraProps}/>,
		<CC.TextField key={4} source={prefix+"language"} sortable={false} {...extraProps}/>,
		<CC.TextField key={5} source={prefix+"allowIpAddress"} sortable={false} {...extraProps}/>,
		<CC.SelectField key={6} source={prefix+"status"} choices={toChoices(enums.Status, "Status")} sortable={false} {...extraProps}/>,
		<CC.TextField key={7} source={prefix+"no"} sortable={false} {...extraProps}/>,
		<CC.SelectField key={8} source={prefix+"theme"} choices={toChoices(enums.AdminUserTheme, "AdminUserTheme")} sortable={false} {...extraProps}/>,
		<CC.BooleanField key={9} source={prefix+"isSuper"} sortable={false} {...extraProps}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <CC.TextInput disabled key={0} source={prefix+"id"} {...extraProps}/>,
		<CC.TextInput key={1} source={prefix+"name"} validate={[required(),maxLength(200)]} extraOptions={{ maxLength: 200 }} {...extraProps}/>,
		<CC.TextInput key={2} source={prefix+"email"} validate={[required(),email(),maxLength(200)]} extraOptions={{ maxLength: 200 }} {...extraProps}/>,
		<CC.TextInput key={3} source={prefix+"pass"} validate={[required(),maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.TextInput key={4} source={prefix+"language"} validate={[maxLength(10)]} extraOptions={{ maxLength: 10 }} {...extraProps}/>,
		<CC.TextInput key={5} source={prefix+"allowIpAddress"} validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.SelectInput key={6} source={prefix+"status"} choices={toChoices(enums.Status, "Status")} validate={[required()]} {...extraProps}/>,
		<CC.TextInput key={7} source={prefix+"no"} validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.SelectInput key={8} source={prefix+"theme"} choices={toChoices(enums.AdminUserTheme, "AdminUserTheme")} validate={[required()]} {...extraProps}/>,
		<CC.BooleanInput key={9} source={prefix+"isSuper"} {...extraProps}/>
	];
};
