const lang = {
	ra: {
		action: {
			add_filter: 'Add filter',
			add: 'Add',
			back: 'Go Back',
			bulk_actions: '1 item selected |||| %{smart_count} items selected',
			cancel: 'Cancel',
			clear_input_value: 'Clear value',
			clone: 'Clone',
			create: 'Create',
			delete: 'Delete',
			edit: 'Edit',
			export: 'Export',
			list: 'List',
			refresh: 'Refresh',
			remove_filter: 'Remove this filter',
			remove: 'Remove',
			save: 'Save',
			search: 'Search',
			show: 'Show',
			sort: 'Sort',
			undo: 'Undo',
		},
		boolean: {
			null: '',
			true: 'Yes',
			false: 'No',
		},
		page: {
			create: '%{name} - New',
			dashboard: 'Dashboard',
			edit: '%{name} #%{id}',
			error: 'Something went wrong',
			list: '%{name} List',
			loading: 'Loading',
			not_found: 'Not Found',
			show: '%{name} #%{id}',
			empty: 'Kayıt bulunamadı',
			invite: '',
		},
		input: {
			file: {
				upload_several: 'Drop some files to upload, or click to select one.',
				upload_single: 'Drop a file to upload, or click to select it.',
			},
			image: {
				upload_several: 'Drop some pictures to upload, or click to select one.',
				upload_single: 'Drop a picture to upload, or click to select it.',
			},
			references: {
				all_missing: 'Unable to find references data.',
				many_missing: 'At least one of the associated references no longer appears to be available.',
				single_missing: 'Associated reference no longer appears to be available.',
			},
		},
		message: {
			about: 'About',
			are_you_sure: 'Are you sure?',
			bulk_delete_content: 'Are you sure you want to delete this %{name}? |||| Are you sure you want to delete these %{smart_count} items?',
			bulk_delete_title: 'Delete %{name} |||| Delete %{smart_count} %{name} items',
			delete_content: 'Are you sure you want to delete this item?',
			delete_title: 'Delete %{name} #%{id}',
			details: 'Details',
			error: "A client error occurred and your request couldn't be completed.",
			invalid_form: 'The form is not valid. Please check for errors',
			loading: 'The page is loading, just a moment please',
			no: 'No',
			not_found: 'Either you typed a wrong URL, or you followed a bad link.',
			yes: 'Yes',
		},
		navigation: {
			no_results: 'No results found',
			no_more_results: 'The page number %{page} is out of boundaries. Try the previous page.',
			page_out_of_boundaries: 'Page number %{page} out of boundaries',
			page_out_from_end: 'Cannot go after last page',
			page_out_from_begin: 'Cannot go before page 1',
			page_range_info: '%{offsetBegin}-%{offsetEnd} of %{total}',
			page_rows_per_page: 'Rows per page:',
			next: 'Next',
			prev: 'Prev',
		},
		auth: {
			auth_check_error: 'Please login to continue',
			user_menu: 'Profile',
			username: 'Username',
			password: 'Password',
			sign_in: 'Sign in',
			sign_in_error: 'Authentication failed, please retry',
			logout: 'Logout',
		},
		notification: {
			updated: 'Element updated |||| %{smart_count} elements updated',
			created: 'Element created',
			deleted: 'Element deleted |||| %{smart_count} elements deleted',
			bad_item: 'Incorrect element',
			item_doesnt_exist: 'Element does not exist',
			http_error: 'Server communication error',
			data_provider_error: 'dataProvider error. Check the console for details.',
			canceled: 'Action cancelled',
			logged_out: 'Your session has ended, please reconnect.',
		},
		validation: {
			required: 'Required',
			minLength: 'Must be %{min} characters at least',
			maxLength: 'Must be %{max} characters or less',
			minValue: 'Must be at least %{min}',
			maxValue: 'Must be %{max} or less',
			number: 'Must be a number',
			email: 'Must be a valid email',
			oneOf: 'Must be one of: %{options}',
			regex: 'Must match a specific format (regexp): %{pattern}',
		},
		tree: {
			drag_preview: 'Node #%{id} |||| Node #%{id} with %{smart_count} children',
			root_target: 'Drop an item here to make it top level',
		},
	},
	api: {
		code0: 'An eror occured!',
		'code-2': 'Permission denied!',
		'code-10': 'Empty model!',
		'code-11': 'Invalid model!',
		'code-12': 'Not found!',
		code10: 'Deleted!',
		code11: 'Saved!',
		code12: 'Created!',
		code100: 'Go to login',
		code101: 'Refresh token',
		code102: 'Email in use',
		code103: 'Invalid credentials',
	},
	menu: {
		dashboard: 'Dashboard',
		adminApi: 'Admin',
		accountApi: 'Account',
		changeLang: 'Change Language',
		logout: 'Logout',
	},
	pages: {
		breadCrumbs: {
			list: 'List',
			detail: 'Detail',
			new: 'Create',
			edit: 'Update',
		},
		action: {
			saveAndNew: 'Create and New',
			select: 'Select',
		},
		role: {
			admin: 'Owner',
			list: 'List',
			get: 'Detail',
			new: 'Create',
			edit: 'Update',
			delete: 'Delete',
			save: 'Save',
			assignRole: 'Assign Role',
		},
		modules: {
			AdminApi: 'Admin',
		},
	},
	tabs: {},
	footer: {
		privacy: 'Privacy',
		support: 'Support',
		terms: 'Terms of Service',
		contact: 'Contact',
	},
	other: {
		adminUser: {
			roles: 'Roles'
		}
	},
	enums: {
		Language: {
			tr: 'Turkish',
			en: 'English',
		},
		Status: {
			Active: 'Active',
			Passive: 'Passive',
			Deleted: 'Deleted',
		},
		DeviceType: {
			Web: 'Web',
			Android: 'Android',
			IOS: 'IOS',
			WindowsMobile: 'Windows Mobile',
		},
		AdminUserTheme: {
			Light: 'Light',
			Dark: 'Dark',
		},
	},
	resources: {
		'AdminApi/RoleMap': {
			name: 'Role Map',
			fields: {},
		},
		'AdminApi/AdminUserSearch': {
			name: 'Admin Users',
			fields: {
				id: 'Id',
				name: 'Name',
				email: 'Email',
				pass: 'Pass',
				language: 'Language',
				allowIpAddress: 'AllowIpAddress',
				status: 'Status',
				no: 'No',
				theme: 'Theme',
				isSuper: 'IsSuper',
			},
		},
		'AdminApi/AdminRoleSearch': {
			name: 'Admin Roles',
			fields: {
				id: 'Id',
				name: 'Name',
			},
		},
		"AccountApi/UserSearch" : {
			name: "Users",
			fields: {
				id:"Id",
				name:"Name",
				email:"Email",
				passwordHash:"PasswordHash",
				emailConfirmed:"EmailConfirmed",
				lockoutEndDateUtc:"LockoutEndDateUtc",
				accessFailedCount:"AccessFailedCount",
				status:"Status"
			}
		}
	},
};

require('./language-common').editLang(lang);

export default lang;
