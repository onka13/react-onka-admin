
import React, { Fragment } from 'react';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices, ShowButton } from 'react-admin';
import { getDateOptions, getQueryParam, MySelectField, toChoices, toChoiceLabel } from '../../../../helpers/moduleHelper';
import enums from '../../enums';
import { checkPageConfig } from '../../../../helpers/moduleHelper';
import _get from 'lodash/get';
import CC from '../../../../components/CustomComponents';

export const Defaults = {
    menu: 'testApi',
    menuOrder: 0,
    route: 'TestApi/BookMongoSearch',
    label: '',
    moduleKey: 'TestApi',
    pageKey: 'BookMongo',
    hideMenu: false,
}

export const pageConfig = checkPageConfig({
	get: true,
	edit: true,
	new: true,
	delete: true,
	export: true,
    primaryKeys: ["id"]
}, Defaults);

export const filterFields = [
    <CC.TextInput key={0} source="id" validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} />,
	<CC.TextInput key={1} source="name" validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} />,
	<CC.NumberInput key={2} source="price" validate={[maxValue(79228162514264337593543950335),maxLength(50)]} extraOptions={{ maxLength: 50 }} />,
	<CC.TextInput key={3} source="category" validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} />,
	<CC.TextInput key={4} source="author" validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} />
];

export const listFields = [
    <CC.TextField key={0} source="id" sortable={true} />,
	<CC.TextField key={1} source="name" sortable={false} />,
	<CC.TextField key={2} source="price" sortable={false} />,
	<CC.TextField key={3} source="category" sortable={false} />,
	<CC.TextField key={4} source="author" sortable={false} />
];

export const exportHeaders = ['id','name','price','category','author'];

export const exportFields = (data, get = _get) => [
    { value: get(data, 'id'), type: 'string' },
		{ value: get(data, 'name'), type: 'string' },
		{ value: get(data, 'price'), type: 'number' },
		{ value: get(data, 'category'), type: 'string' },
		{ value: get(data, 'author'), type: 'string' }
];


export const detailFields = (prefix, extraProps) => {
	return [
        <CC.TextField key={0} source={prefix+"id"} sortable={true} {...extraProps}/>,
		<CC.TextField key={1} source={prefix+"name"} sortable={false} {...extraProps}/>,
		<CC.TextField key={2} source={prefix+"price"} sortable={false} {...extraProps}/>,
		<CC.TextField key={3} source={prefix+"category"} sortable={false} {...extraProps}/>,
		<CC.TextField key={4} source={prefix+"author"} sortable={false} {...extraProps}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <CC.TextInput disabled key={0} source={prefix+"id"} {...extraProps}/>,
		<CC.TextInput key={1} source={prefix+"name"} validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.NumberInput key={2} source={prefix+"price"} validate={[maxValue(79228162514264337593543950335),maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.TextInput key={3} source={prefix+"category"} validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>,
		<CC.TextInput key={4} source={prefix+"author"} validate={[maxLength(50)]} extraOptions={{ maxLength: 50 }} {...extraProps}/>
	];
};
