
import React, { Fragment } from "react";
import { required,minLength,maxLength,minValue,maxValue,number,regex,email,choices,TextInput,ReferenceInput,SelectInput,ShowButton,NumberInput,DisabledInput,DateInput,LongTextInput,BooleanInput,AutocompleteInput,NullableBooleanInput,TextField,DateField,RichTextField,NumberField,BooleanField,SelectField,ReferenceField } from "react-admin";
import { getDateOptions, getQueryParam, MySelectField, toChoices } from "../../../../helpers/moduleHelper";
import enums from "../../enums";
import { checkPageConfig } from "../../../../helpers/moduleHelper";

export const Defaults = {
    menu: 'adminApi',
    menuOrder: 0,
    route: 'admin/AdminUserRoleMapSearch',
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
    <NumberInput key={0} source="userId" validate={[maxValue(2147483647),maxLength(50)]}/>,
	<NumberInput key={1} source="roleId" validate={[maxValue(2147483647),maxLength(50)]}/>
];

export const listFields = [
    <TextField key={1} source="userId" sortable={true}/>,
	<TextField key={2} source="roleId" sortable={false}/>
];


export const detailFields = (prefix, extraProps) => {
	return [
        <TextField key={0} {...extraProps} source={prefix+"id"} sortable={true}/>,
		<TextField key={1} {...extraProps} source={prefix+"userId"} sortable={true}/>,
		<TextField key={2} {...extraProps} source={prefix+"roleId"} sortable={false}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <TextInput disabled key={0} {...extraProps} source={prefix+"id"} />,
		<NumberInput key={1} {...extraProps} source={prefix+"userId"} validate={[required(),maxValue(2147483647),maxLength(50)]}/>,
		<NumberInput key={2} {...extraProps} source={prefix+"roleId"} validate={[required(),maxValue(2147483647),maxLength(50)]}/>
	];
};
