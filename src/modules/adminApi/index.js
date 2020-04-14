// Do not change '//Generator' comments
import React from "react";
import { getResource } from "../../helpers/moduleHelper";
import AdminUserSearch from "./pages/AdminUserSearch/index"
import AdminRoleSearch from "./pages/AdminRoleSearch/index"
import AdminRoleDefinitionSearch from "./pages/AdminRoleDefinitionSearch/index"
import AdminUserRoleMapSearch from "./pages/AdminUserRoleMapSearch/index"
//Generator1

const pages = [
AdminUserSearch,
AdminRoleSearch,
AdminRoleDefinitionSearch,
AdminUserRoleMapSearch,
//Generator2
];

export default pages.map(getResource);