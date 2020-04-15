import React from "react";
import { Responsive, SimpleList, Datagrid, EditButton, ShowButton } from "react-admin";
import { ListActions, MyListComponent, MySelectField } from "../../../../helpers/moduleHelper";
import { ListExtraButtons, customFilterFields, customListFields, extraActions } from "./business";
import { pageConfig } from "./pageConfig";
import enums from "../../enums";

const MyList = props => (
    <MyListComponent {...props} filters={customFilterFields()} bulkActionButtons={false} actions={<ListActions pageConfig={pageConfig} extraButtons={extraActions} />}>
        <Responsive
            small={<SimpleList primaryText={record => record.id} secondaryText={record => record.name} tertiaryText={record => record.email}/>}
            medium={
            <Datagrid>
                <MySelectField />
                {customListFields()}
                {pageConfig.get && <ShowButton />}
                {pageConfig.edit && <EditButton />}
                <ListExtraButtons />
            </Datagrid>
            }
        />
    </MyListComponent>
);

export default MyList
