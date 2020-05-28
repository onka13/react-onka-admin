import React from "react";
import { Responsive, SimpleList, Datagrid, EditButton, ShowButton } from "react-admin";
import { ListActions, MyListComponent, MySelectField } from "../../../../helpers/moduleHelper";
import { ListExtraButtons, customFilterFields, customListFields, extraActions } from "./business";
import { pageConfig, exportFields, exportHeaders } from "./pageConfig";
import enums from "../../enums";
import CC from '../../../../components/CustomComponents';

const MyList = props => (
    <MyListComponent {...props} pageConfig={pageConfig}filters={customFilterFields()} bulkActionButtons={false} actions={<ListActions pageConfig={pageConfig} extraButtons={extraActions} />} exportFields={exportFields} exportHeaders={exportHeaders}>
        <Responsive
            small={<SimpleList primaryText={record => record.id} secondaryText={record => record.no} tertiaryText={record => record.name}/>}
            medium={
            <Datagrid>
                <MySelectField />
                {customListFields()}
                {pageConfig.get && CC.showButton()}
                {pageConfig.edit && CC.editButton()}
                <ListExtraButtons headerClassName='extra-header' cellClassName='extra-cell'/>
            </Datagrid>
            }
        />
    </MyListComponent>
);

export default MyList
