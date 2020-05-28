
import React, { Fragment } from 'react';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices, ShowButton } from 'react-admin';
import { getDateOptions, getQueryParam, MySelectField, toChoices, toChoiceLabel } from '../../../../helpers/moduleHelper';
import enums from '../../enums';
import { checkPageConfig } from '../../../../helpers/moduleHelper';
import _get from 'lodash/get';
import CC from '../../../../components/CustomComponents';

export const Defaults = {
    menu: 'accountApi',
    menuOrder: 0,
    route: 'AccountApi/UserSearch',
    label: '',
    moduleKey: 'AccountApi',
    pageKey: 'User',
    hideMenu: false,
}

export const pageConfig = checkPageConfig({
	get: true,
	edit: true,
	new: true,
	delete: false,
	export: true,
    primaryKeys: ["id"]
}, Defaults);

export const filterFields = [
    <CC.NumberInput key={0} source="id" validate={[maxValue(2147483647),maxLength(50)]} extraOptions={{ maxLength: 50 }} />,
	<CC.TextInput key={1} source="name" validate={[maxLength(150)]} extraOptions={{ maxLength: 150 }} />,
	<CC.TextInput key={2} source="email" validate={[maxLength(200)]} extraOptions={{ maxLength: 200 }} />,
	<CC.BooleanInput key={3} source="emailConfirmed" />,
	<CC.SelectInput key={4} source="status" choices={toChoices(enums.Status, "Status")}  />
];

export const listFields = [
    <CC.TextField key={0} source="id" sortable={true} />,
	<CC.TextField key={1} source="name" sortable={false} />,
	<CC.TextField key={2} source="email" sortable={true} />,
	<CC.BooleanField key={3} source="emailConfirmed" sortable={false} />,
	<CC.SelectField key={4} source="status" choices={toChoices(enums.Status, "Status")} sortable={false} />
];

export const exportHeaders = ['id','name','email','emailConfirmed','status'];

export const exportFields = (data, get = _get) => [
    { value: get(data, 'id'), type: 'number' },
		{ value: get(data, 'name'), type: 'string' },
		{ value: get(data, 'email'), type: 'string' },
		{ value: get(data, 'emailConfirmed'), type: 'string' },
		{ value: toChoiceLabel(enums.Status, 'Status', get(data, 'status')), type: 'string' }
];


export const detailFields = (prefix, extraProps) => {
	return [
        <CC.TextField key={0} source={prefix+"id"} sortable={true} {...extraProps}/>,
		<CC.TextField key={1} source={prefix+"name"} sortable={false} {...extraProps}/>,
		<CC.TextField key={2} source={prefix+"email"} sortable={true} {...extraProps}/>,
		<CC.TextField key={3} source={prefix+"passwordHash"} sortable={false} {...extraProps}/>,
		<CC.BooleanField key={4} source={prefix+"emailConfirmed"} sortable={false} {...extraProps}/>,
		<CC.DateField key={5} source={prefix+"lockoutEndDateUtc"} showTime={true} options={getDateOptions()} sortable={false} {...extraProps}/>,
		<CC.TextField key={6} source={prefix+"accessFailedCount"} sortable={false} {...extraProps}/>,
		<CC.SelectField key={7} source={prefix+"status"} choices={toChoices(enums.Status, "Status")} sortable={false} {...extraProps}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <CC.TextInput disabled key={0} source={prefix+"id"} {...extraProps}/>,
		<CC.TextInput key={1} source={prefix+"name"} validate={[required(),maxLength(150)]} extraOptions={{ maxLength: 150 }} {...extraProps}/>,
		<CC.TextInput key={2} source={prefix+"email"} validate={[email(),maxLength(200)]} extraOptions={{ maxLength: 200 }} {...extraProps}/>,
		<CC.TextInput key={3} source={prefix+"passwordHash"} validate={[required(),maxLength(200)]} extraOptions={{ maxLength: 200 }} {...extraProps}/>,
		<CC.BooleanInput key={4} source={prefix+"emailConfirmed"} {...extraProps}/>,
		<CC.DateInput key={5} source={prefix+"lockoutEndDateUtc"}  {...extraProps}/>,
		<CC.NumberInput key={6} source={prefix+"accessFailedCount"} validate={[required(),maxValue(2147483647),maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.SelectInput key={7} source={prefix+"status"} choices={toChoices(enums.Status, "Status")} validate={[required()]} {...extraProps}/>
	];
};
