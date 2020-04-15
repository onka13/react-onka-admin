import { checkPageConfig } from '../../../../helpers/moduleHelper';

const Defaults = {
	menu: 'adminApi',
	route: 'AdminApi/RoleMap',
	label: '',
	moduleKey: 'AdminApi',
	pageKey: 'AdminRoleMap',
	hideMenu: false,
};

var pageConfig = checkPageConfig(
	{
		get: true,
		edit: true,
		new: true,
		delete: true,
		export: false,
	},
	Defaults,
);

export { pageConfig, Defaults };
