import React from 'react';
import { addField, useInput, useTranslate } from 'react-admin';
import { withStyles, createStyles } from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';

const styles = createStyles({
	telephone: {
		marginTop: 16,
	},
});

const TelephoneInput = props => {
	console.log('TelephoneInput', props);
	const {
		id,
		input,
		meta: { touched, error },
		isRequired,
    } = useInput(props);
    const translate = useTranslate();
	return (
		<MuiPhoneNumber
			defaultCountry={'tr'}
			inputClass={props.className}
			value={input.value}
			error={!!(touched && error)}
			helperText={touched && error}
			{...input}
			label={props.label || translate("resources." +props.resource + ".fields." + props.source)}
            required={isRequired}
            margin="dense"
            variant="filled" 
		/>
	);
};

export default addField(TelephoneInput);
