import React, { Fragment } from 'react';
import {
	TextInput,
	ReferenceInput,
	SelectInput,
	NumberInput,
	DateInput,
	BooleanInput,
	AutocompleteInput,
	NullableBooleanInput,
	TextField,
	DateField,
	RichTextField,
	NumberField,
	BooleanField,
	SelectField,
	ReferenceField,
	ShowButton,
	EditButton,
	Datagrid,
	TabbedForm,
	FormTab,
} from 'react-admin';


const showButton = (props) => <ShowButton headerClassName="show-header" cellClassName={'show-cell'} {...props} />;
const editButton = (props) => <EditButton headerClassName="edit-header" cellClassName={'edit-cell'} {...props} />;

const FormTabCustom = (props) => <FormTab contentClassName="tab-content" {...props} />;

const getExtraProps = (extraOptions, inputProps) => {
	if (extraOptions) {
		if (!inputProps) inputProps = {};
		if (extraOptions.maxLength) inputProps.maxLength = extraOptions.maxLength;
	}
	return { inputProps };
};

const TextInputCustom = ({ extraOptions, inputProps, ...props }) => {
	return <TextInput {...props} {...getExtraProps(extraOptions, inputProps)} />;
};
const NumberInputCustom = ({ extraOptions, inputProps, ...props }) => {
	return <NumberInput {...props} {...getExtraProps(extraOptions, inputProps)} />;
};
export default {
	ReferenceInput,
	SelectInput,
	NumberInput,
	DateInput,
	BooleanInput,
	AutocompleteInput,
	NullableBooleanInput,
	TextField,
	DateField,
	RichTextField,
	NumberField,
	BooleanField,
	SelectField,
	ReferenceField,
	showButton,
	editButton,
	Datagrid,
	TabbedForm,
	FormTab: FormTabCustom,
	TextInput: TextInputCustom,
	NumberInput: NumberInputCustom,
};
