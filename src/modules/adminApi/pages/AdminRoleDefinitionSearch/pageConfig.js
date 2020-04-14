
import React, { Fragment } from "react";
import { required,minLength,maxLength,minValue,maxValue,number,regex,email,choices,TextInput,ReferenceInput,SelectInput,ShowButton,NumberInput,DisabledInput,DateInput,LongTextInput,BooleanInput,AutocompleteInput,NullableBooleanInput,TextField,DateField,RichTextField,NumberField,BooleanField,SelectField,ReferenceField } from "react-admin";
import { getDateOptions, getQueryParam, MySelectField, toChoices } from "../../../../helpers/moduleHelper";
import enums from "../../enums";
import { checkPageConfig } from "../../../../helpers/moduleHelper";

export const Defaults = {
    menu: 'adminApi',
    menuOrder: 0,
    route: 'admin/AdminRoleDefinitionSearch',
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
    <NumberInput key={0} source="roleId" validate={[maxValue(2147483647),maxLength(50)]}/>,
	<TextInput key={1} source="moduleKey" validate={[maxLength(50)]}/>,
	<TextInput key={2} source="pageKey" validate={[maxLength(50)]}/>,
	<TextInput key={3} source="actionKey" validate={[maxLength(50)]}/>
];

export const listFields = [
    <TextField key={1} source="roleId" sortable={false}/>,
	<TextField key={2} source="moduleKey" sortable={false}/>,
	<TextField key={3} source="pageKey" sortable={false}/>,
	<TextField key={4} source="actionKey" sortable={false}/>,
	<SelectField key={5} source="action" choices={toChoices(enums.AdminRoleAction, "AdminRoleAction")} sortable={false}/>
];


export const detailFields = (prefix, extraProps) => {
	return [
        <TextField key={0} {...extraProps} source={prefix+"id"} sortable={true}/>,
		<TextField key={1} {...extraProps} source={prefix+"roleId"} sortable={false}/>,
		<TextField key={2} {...extraProps} source={prefix+"moduleKey"} sortable={false}/>,
		<TextField key={3} {...extraProps} source={prefix+"pageKey"} sortable={false}/>,
		<TextField key={4} {...extraProps} source={prefix+"actionKey"} sortable={false}/>,
		<SelectField key={5} {...extraProps} source={prefix+"action"} choices={toChoices(enums.AdminRoleAction, "AdminRoleAction")} sortable={false}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <TextInput disabled key={0} {...extraProps} source={prefix+"id"} />,
		<NumberInput key={1} {...extraProps} source={prefix+"roleId"} validate={[required(),maxValue(2147483647),maxLength(50)]}/>,
		<TextInput key={2} {...extraProps} source={prefix+"moduleKey"} validate={[maxLength(50)]}/>,
		<TextInput key={3} {...extraProps} source={prefix+"pageKey"} validate={[maxLength(50)]}/>,
		<TextInput key={4} {...extraProps} source={prefix+"actionKey"} validate={[maxLength(50)]}/>,
		<SelectInput key={5} {...extraProps} source={prefix+"action"} choices={toChoices(enums.AdminRoleAction, "AdminRoleAction")} validate={[required()]} />
	];
};
