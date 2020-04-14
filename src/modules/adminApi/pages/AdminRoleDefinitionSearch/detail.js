import React from "react";
import { SimpleShowLayout } from "react-admin";
import { CustomShow } from "../../../../helpers/moduleHelper";
import { pageConfig } from "./pageConfig";
import { customDetailFields } from "./business";

const MyDetail = props => (
    <CustomShow {...props} pageConfig={pageConfig} titleField="id">
        <SimpleShowLayout>
            {customDetailFields()}
        </SimpleShowLayout>
    </CustomShow>
);

export default MyDetail;
