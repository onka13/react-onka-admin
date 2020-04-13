
import React, { Fragment } from "react";
import { required,minLength,maxLength,minValue,maxValue,number,regex,email,choices,TextInput,ReferenceInput,SelectInput,ShowButton,NumberInput,DisabledInput,DateInput,LongTextInput,BooleanInput,AutocompleteInput,NullableBooleanInput,TextField,DateField,RichTextField,NumberField,BooleanField,SelectField,ReferenceField } from "react-admin";
import { getDateOptions, getQueryParam, MySelectField, toChoices } from "../../../../helpers/moduleHelper";
import enums from "../../enums";
import { checkPageConfig } from "../../../../helpers/moduleHelper";

export const Defaults = {
    menu: 'adminApi',
    menuOrder: 0,
    route: 'api/AdminUserSearch',
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
    <TextInput key={0} alwaysOn source="name" validate={[maxLength(200)]}/>,
	<TextInput key={1} alwaysOn source="email" validate={[maxLength(200)]}/>,
	<SelectInput key={2} alwaysOn source="status" choices={toChoices(enums.Status, "Status")}  />,
	<NumberInput key={3} source="id" validate={[maxValue(2147483647),maxLength(50)]}/>
];

export const listFields = [
    <TextField key={1} source="no" sortable={false}/>,
	<TextField key={2} source="name" sortable={false}/>,
	<TextField key={3} source="email" sortable={false}/>,
	<SelectField key={4} source="status" choices={toChoices(enums.Status, "Status")} sortable={false}/>
];


export const detailFields = (prefix, extraProps) => {
	return [
        <TextField key={0} {...extraProps} source={prefix+"id"} sortable={true}/>,
		<TextField key={1} {...extraProps} source={prefix+"name"} sortable={false}/>,
		<TextField key={2} {...extraProps} source={prefix+"email"} sortable={false}/>,
		<TextField key={3} {...extraProps} source={prefix+"pass"} sortable={false}/>,
		<TextField key={4} {...extraProps} source={prefix+"language"} sortable={false}/>,
		<TextField key={5} {...extraProps} source={prefix+"allowIpAddress"} sortable={false}/>,
		<SelectField key={6} {...extraProps} source={prefix+"status"} choices={toChoices(enums.Status, "Status")} sortable={false}/>,
		<TextField key={7} {...extraProps} source={prefix+"no"} sortable={false}/>,
		<SelectField key={8} {...extraProps} source={prefix+"theme"} choices={toChoices(enums.AdminUserTheme, "AdminUserTheme")} sortable={false}/>,
		<BooleanField key={9} {...extraProps} source={prefix+"isSuper"} sortable={false}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <TextInput disabled key={0} {...extraProps} source={prefix+"id"} />,
		<TextInput key={1} {...extraProps} source={prefix+"name"} validate={[required(),maxLength(200)]}/>,
		<TextInput key={2} {...extraProps} source={prefix+"email"} validate={[required(),email(),maxLength(200)]}/>,
		<TextInput key={3} {...extraProps} source={prefix+"pass"} validate={[required(),maxLength(50)]}/>,
		<TextInput key={4} {...extraProps} source={prefix+"language"} validate={[maxLength(10)]}/>,
		<TextInput key={5} {...extraProps} source={prefix+"allowIpAddress"} validate={[maxLength(50)]}/>,
		<SelectInput key={6} {...extraProps} source={prefix+"status"} choices={toChoices(enums.Status, "Status")} validate={[required()]} />,
		<TextInput key={7} {...extraProps} source={prefix+"no"} validate={[maxLength(50)]}/>,
		<SelectInput key={8} {...extraProps} source={prefix+"theme"} choices={toChoices(enums.AdminUserTheme, "AdminUserTheme")} validate={[required()]} />,
		<BooleanInput key={9} {...extraProps} source={prefix+"isSuper"}/>
	];
};
