import { checkPageConfig } from "../../../../helpers/moduleHelper";

export const Defaults = {
	menu: "",
	route: "AdminApi/AdminUserUpdate",
	label: "",
	moduleKey: "AdminApi",
	pageKey: "AdminUserUpdate",
	hideMenu: true
};

export const pageConfig = checkPageConfig(
	{
		get: false,
		edit: true,
		new: false,
		delete: false,
		export: false,
		primaryKeys: ["id"]
	},
	Defaults
);
