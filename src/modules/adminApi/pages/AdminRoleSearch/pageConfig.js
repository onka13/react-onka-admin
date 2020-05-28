
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
    route: 'AdminApi/AdminRoleSearch',
    label: '',
    moduleKey: 'AdminApi',
    pageKey: 'AdminRole',
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
    <CC.TextInput key={0} alwaysOn source="name" validate={[maxLength(200)]} extraOptions={{ maxLength: 200 }} />
];

export const listFields = [
    <CC.TextField key={1} source="name" sortable={false} />
];

export const exportHeaders = ['name'];

export const exportFields = (data, get = _get) => [
    { value: get(data, 'name'), type: 'string' }
];


export const detailFields = (prefix, extraProps) => {
	return [
        <CC.TextField key={0} source={prefix+"id"} sortable={true} {...extraProps}/>,
		<CC.TextField key={1} source={prefix+"name"} sortable={false} {...extraProps}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <CC.TextInput disabled key={0} source={prefix+"id"} {...extraProps}/>,
		<CC.TextInput key={1} source={prefix+"name"} validate={[required(),maxLength(200)]} extraOptions={{ maxLength: 200 }} {...extraProps}/>
	];
};
