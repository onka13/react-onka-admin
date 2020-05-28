
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
    route: 'AdminApi/AdminUserRoleMapSearch',
    label: '',
    moduleKey: 'AdminApi',
    pageKey: 'AdminUserRoleMap',
    hideMenu: true,
}

export const pageConfig = checkPageConfig({
	get: false,
	edit: false,
	new: true,
	delete: true,
	export: false,
    primaryKeys: ["id"]
}, Defaults);

export const filterFields = [
    <CC.NumberInput key={0} source="userId" validate={[maxValue(2147483647),maxLength(50)]} extraOptions={{ maxLength: 50 }} />,
	<CC.NumberInput key={1} source="roleId" validate={[maxValue(2147483647),maxLength(50)]} extraOptions={{ maxLength: 50 }} />
];

export const listFields = [
    <CC.TextField key={1} source="userId" sortable={true} />,
	<CC.TextField key={2} source="roleId" sortable={false} />
];

export const exportHeaders = ['userId','roleId'];

export const exportFields = (data, get = _get) => [
    { value: get(data, 'userId'), type: 'number' },
		{ value: get(data, 'roleId'), type: 'number' }
];


export const detailFields = (prefix, extraProps) => {
	return [
        <CC.TextField key={0} source={prefix+"id"} sortable={true} {...extraProps}/>,
		<CC.TextField key={1} source={prefix+"userId"} sortable={true} {...extraProps}/>,
		<CC.TextField key={2} source={prefix+"roleId"} sortable={false} {...extraProps}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <CC.TextInput disabled key={0} source={prefix+"id"} {...extraProps}/>,
		<CC.NumberInput key={1} source={prefix+"userId"} validate={[required(),maxValue(2147483647),maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.NumberInput key={2} source={prefix+"roleId"} validate={[required(),maxValue(2147483647),maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>
	];
};
