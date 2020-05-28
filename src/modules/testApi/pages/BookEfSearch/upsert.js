import React from 'react';
import { MyEditCreateToolbar, MySimpleForm, CustomCreate, CustomEdit } from '../../../../helpers/moduleHelper';
import { defaultValue, customInputFields, validation, ListExtraButtons } from './business';
import { pageConfig } from './pageConfig';

export const MyCreate = props => (
    <CustomCreate {...props} pageConfig={pageConfig}>
        <MySimpleForm validate={validation} isEdit={false} toolbar={<MyEditCreateToolbar isEdit={false} pageConfig={pageConfig} />} initialValues={defaultValue}>
            {customInputFields(false, '')}
        </MySimpleForm>
    </CustomCreate>
);

export const MyEdit = props => (
    <CustomEdit {...props} pageConfig={pageConfig} titleField='name' extraButtons={<ListExtraButtons />}>
        <MySimpleForm validate={validation} isEdit={true} toolbar={<MyEditCreateToolbar isEdit={true} pageConfig={pageConfig} />}>
            {customInputFields(true, '')}
        </MySimpleForm>            
    </CustomEdit>
);
