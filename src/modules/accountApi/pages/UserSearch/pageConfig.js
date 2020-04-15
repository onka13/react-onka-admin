
import React, { Fragment } from "react";
import { required,minLength,maxLength,minValue,maxValue,number,regex,email,choices,TextInput,ReferenceInput,SelectInput,ShowButton,NumberInput,DisabledInput,DateInput,LongTextInput,BooleanInput,AutocompleteInput,NullableBooleanInput,TextField,DateField,RichTextField,NumberField,BooleanField,SelectField,ReferenceField } from "react-admin";
import { getDateOptions, getQueryParam, MySelectField, toChoices } from "../../../../helpers/moduleHelper";
import enums from "../../enums";
import { checkPageConfig } from "../../../../helpers/moduleHelper";

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
    <NumberInput key={0} source="id" validate={[maxValue(2147483647),maxLength(50)]}/>,
	<TextInput key={1} source="name" validate={[maxLength(150)]}/>,
	<TextInput key={2} source="email" validate={[maxLength(200)]}/>,
	<BooleanInput key={3} source="emailConfirmed"/>,
	<SelectInput key={4} source="status" choices={toChoices(enums.Status, "Status")}  />
];

export const listFields = [
    <TextField key={0} source="id" sortable={true}/>,
	<TextField key={1} source="name" sortable={false}/>,
	<TextField key={2} source="email" sortable={true}/>,
	<BooleanField key={3} source="emailConfirmed" sortable={false}/>,
	<SelectField key={4} source="status" choices={toChoices(enums.Status, "Status")} sortable={false}/>
];


export const detailFields = (prefix, extraProps) => {
	return [
        <TextField key={0} {...extraProps} source={prefix+"id"} sortable={true}/>,
		<TextField key={1} {...extraProps} source={prefix+"name"} sortable={false}/>,
		<TextField key={2} {...extraProps} source={prefix+"email"} sortable={true}/>,
		<TextField key={3} {...extraProps} source={prefix+"passwordHash"} sortable={false}/>,
		<BooleanField key={4} {...extraProps} source={prefix+"emailConfirmed"} sortable={false}/>,
		<DateField key={5} {...extraProps} source={prefix+"lockoutEndDateUtc"} showTime={true} options={getDateOptions()} sortable={false}/>,
		<TextField key={6} {...extraProps} source={prefix+"accessFailedCount"} sortable={false}/>,
		<SelectField key={7} {...extraProps} source={prefix+"status"} choices={toChoices(enums.Status, "Status")} sortable={false}/>
	];
};


export const inputFields = (prefix, extraProps) => {
	return [
        <TextInput disabled key={0} {...extraProps} source={prefix+"id"} />,
		<TextInput key={1} {...extraProps} source={prefix+"name"} validate={[required(),maxLength(150)]}/>,
		<TextInput key={2} {...extraProps} source={prefix+"email"} validate={[email(),maxLength(200)]}/>,
		<TextInput key={3} {...extraProps} source={prefix+"passwordHash"} validate={[required(),maxLength(200)]}/>,
		<BooleanInput key={4} {...extraProps} source={prefix+"emailConfirmed"}/>,
		<DateInput key={5} {...extraProps} source={prefix+"lockoutEndDateUtc"} />,
		<NumberInput key={6} {...extraProps} source={prefix+"accessFailedCount"} validate={[required(),maxValue(2147483647),maxLength(50)]}/>,
		<SelectInput key={7} {...extraProps} source={prefix+"status"} choices={toChoices(enums.Status, "Status")} validate={[required()]} />
	];
};
