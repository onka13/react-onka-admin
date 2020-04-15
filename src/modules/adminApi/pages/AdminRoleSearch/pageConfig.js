
import React, { Fragment } from "react";
import { required,minLength,maxLength,minValue,maxValue,number,regex,email,choices,TextInput,ReferenceInput,SelectInput,ShowButton,NumberInput,DisabledInput,DateInput,LongTextInput,BooleanInput,AutocompleteInput,NullableBooleanInput,TextField,DateField,RichTextField,NumberField,BooleanField,SelectField,ReferenceField } from "react-admin";
import { getDateOptions, getQueryParam, MySelectField, toChoices } from "../../../../helpers/moduleHelper";
import enums from "../../enums";
import { checkPageConfig } from "../../../../helpers/moduleHelper";

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
    <TextInput key={0} alwaysOn source="name" validate={[maxLength(200)]}/>
];

export const listFields = [
    <TextField key={1} source="name" sortable={false}/>
];


export const detailFields = (prefix, extraProps) => {
	return [
        <TextField key={0} {...extraProps} source={prefix+"id"} sortable={true}/>,
		<TextField key={1} {...extraProps} source={prefix+"name"} sortable={false}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <TextInput disabled key={0} {...extraProps} source={prefix+"id"} />,
		<TextInput key={1} {...extraProps} source={prefix+"name"} validate={[required(),maxLength(200)]}/>
	];
};
