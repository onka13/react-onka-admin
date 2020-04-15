import React from "react";
import { Button } from "@material-ui/core";
import { pageConfig, Defaults, inputFields, filterFields, listFields, detailFields } from "./pageConfig";
import MyList from "./list";
import MyDetail from "./detail";
import { MyEdit, MyCreate } from "./upsert";
import { fieldsFilterSort, MyListFilters } from "../../../../helpers/moduleHelper";
import enums from "../../enums";

export const ListExtraButtons = ({ record = {} }) => {
	return (
		<React.Fragment>
			<span>
                
            </span>
		</React.Fragment>
	);
};

export const extraActions = () => (
	<React.Fragment>
		<span />
	</React.Fragment>
);

export const defaultValue = {
    
};

export const validation = values => {
    const errors = {};
    //if (!values.title) {
    //  errors.title = ["The title is required"];
    //}
    return errors;
};

export const customInputFields = (isEdit, prefix) => {
	const fields = fieldsFilterSort(inputFields(prefix), prefix)
	return [
		fields
	]
}

export const customFilterFields = () => {
	return MyListFilters(filterFields)
}

export const customListFields = () => {
	return listFields
}

export const customDetailFields = () => {
	const fields = fieldsFilterSort(detailFields(""))
	return [
		fields
	]
}

export { MyList, MyDetail, MyEdit, MyCreate }
