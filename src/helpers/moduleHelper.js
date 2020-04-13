import React, { useCallback } from 'react';
import {
	Resource,
	TopToolbar,
	CreateButton,
	ExportButton,
	List,
	ShowButton,
	EditButton,
	CloneButton,
	DeleteButton,
	translate,
	SaveButton,
	SimpleForm,
	TabbedForm,
	FormDataConsumer,
	TextInput,
	required,
	Pagination,
	Filter,
	Edit,
	Create,
	Show,
	SelectInput,
	Button,
	SimpleList,
	useTranslate,
} from 'react-admin';
import { useForm } from 'react-final-form';
import { InputAdornment, IconButton, Typography, Toolbar } from '@material-ui/core';
import Label from '@material-ui/icons/Label';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import ArrowBack from '@material-ui/icons/ArrowBack';
import get from 'lodash/get';
import set from 'lodash/set';

import config from '../config';
import staticHelper from './staticHelper';
import { removeEmptyObjects } from '../business/utils';
import { crumbs } from './componentHelper';
import enumsGlobal from '../modules/enumsGlobal';
import { makeStyles } from '@material-ui/styles';
import Loadable from 'react-loadable';
import MyToolbar from '../components/MyToolbar';
import { ViewComp } from '../components/ExtraComponents';
import ErpBusiness from '../business/ErpBusiness';

export const toChoices = (obj, key, minValue, maxValue, values, exclude) => {
	if (!obj) obj = {};
	return Object.keys(obj)
		.filter(x => {
			var res = true;
			if (minValue) res = res && obj[x] >= minValue;
			if (maxValue) res = res && obj[x] <= maxValue;
			if (values) res = res && values.indexOf(obj[x]) != -1;
			if (exclude) res = res && values.indexOf(obj[x]) == -1;
			return res;
		})
		.map(x => {
			return { id: obj[x], name: key ? 'enums.' + key + '.' + x : x };
		});
};

export const toChoiceLabel = (obj, enumTypeName, value) => {
	if (!obj) obj = {};
	var e = Object.keys(obj).filter(x => {
		return obj[x] == value;
	});
	return e.length > 0 ? ErpBusiness.instance().translate('enums.' + enumTypeName + '.' + e[0]) : value;
};

export const getResource = (m, i) => {
	//console.log("m", m);
	return (
		<Resource
			key={i}
			name={m.Defaults.route}
			list={m.MyList}
			show={m.MyDetail}
			create={m.MyCreate}
			edit={m.MyEdit}
			icon={Label}
			options={{
				hideMenu: m.Defaults.hideMenu,
				label: m.Defaults.label,
				menu: m.Defaults.menu,
				moduleKey: m.Defaults.moduleKey,
				pageKey: m.Defaults.pageKey,
				menuOrder: m.Defaults.menuOrder,
			}}
		/>
	);
};

export const getLabelPath = (route, field) => {
	if (!field) field = '';
	field = field.replace(/(\[\d+\])/gim, '');
	return 'resources.' + route + '.fields.' + field;
};

export const checkPageConfig = (pageConfig, defaults) => {
	if (!defaults) return pageConfig;
	if (getQueryParam('hideActions') == '1') {
		pageConfig.export = false;
		pageConfig.get = false;
		pageConfig.new = false;
		pageConfig.edit = false;
		pageConfig.delete = false;
	} else {
		var isOwner = HasAccess(defaults.moduleKey, defaults.pageKey, 'admin');
		['export', 'get', 'new', 'edit', 'delete'].forEach(key => {
			if (pageConfig[key]) {
				pageConfig[key] = isOwner || HasAccess(defaults.moduleKey, defaults.pageKey, key);
			}
		});
		/*if (!isSuperAdmin()) {
			if (config.AUTH[defaults.moduleKey] && config.AUTH[defaults.moduleKey][defaults.pageKey]) {
				var actions = config.AUTH[defaults.moduleKey][defaults.pageKey];
				for (const key in actions) {
					if (actions[key] == 'super') {
						pageConfig[key] = isSuperAdmin();
					} else if (actions[key] == 'admin') {
						pageConfig[key] = isAdmin();
					}
				}
			}
		}*/
	}
	pageConfig.defaults = defaults;
	return pageConfig;
};

export const ListActions = ({
	bulkActions,
	basePath,
	currentSort,
	displayedFilters,
	exporter,
	filters,
	filterValues,
	onUnselectItems,
	resource,
	selectedIds,
	showFilter,
	pageConfig,
	extraButtons,
}) => {
	if (!pageConfig) pageConfig = {};
	var hideActions = getQueryParam('hideActions') == '1';
	if (hideActions) extraButtons = null;
	return (
		<Toolbar>
			{bulkActions &&
				React.cloneElement(bulkActions, {
					basePath,
					filterValues,
					resource,
					selectedIds,
					onUnselectItems,
				})}
			{filters &&
				React.cloneElement(filters, {
					resource,
					showFilter,
					displayedFilters,
					filterValues,
					context: 'button',
				})}
			{pageConfig.new && <CreateButton basePath={basePath} />}
			{pageConfig.export && <ExportButton resource={resource} sort={currentSort} filter={filterValues} exporter={exporter} />}
			{typeof extraButtons == 'function' ? extraButtons() : extraButtons}
			{/* <RefreshButton /> */}
			{/* Add your custom actions */}
			{/* <Button primary>Custom Action</Button> */}
		</Toolbar>
	);
};

export const getDateOptions = () => {
	return {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};
};

export const getQueryParam = name => {
	var arr = window.location.search.split('?');
	if (arr.length <= 1) return '';
	arr.shift(); // remove first
	var query = arr.join('?');
	arr = query
		.split('&')
		.map(x => x.split('='))
		.filter(x => x[0] == name);
	if (arr.length > 0) return arr[0][1];
	return null;
};

const getDefaultValuesFromParam = current => {
	return { ...current, ...getDefaultValuesAsJson() };
};

export const getDefaultValuesAsJson = () => {
	var defaultValues = getQueryParam('defaultValues');
	if (defaultValues) {
		try {
			return JSON.parse(decodeURIComponent(defaultValues));
		} catch (error) {
			console.log('defaultValues parse error', error);
		}
	}
	return {};
};

const useGridStyle = makeStyles(theme => {
	return {
		rowEven: {
			backgroundColor: theme.mixins.vs.rowEven,
		},
		rowOdd: {},
	};
});

const useRaListStyle = makeStyles(theme => {
	return {
		content: {
			position: 'unset',
		},
	};
});

export const MyListComponent = props => {
	//console.log("MyListComponent", props);

	var actions = props.actions;
	var filters = props.filters;
	var filterDefaultValues = getDefaultValuesFromParam(props.filterDefaultValues);
	var pagination = props.pagination;
	var perPage = props.perPage;

	if (getQueryParam('hideFilters') == '1') {
		filters = null;
	}

	if (getQueryParam('hideActions') == '1') {
		//actions = null;
	}

	if (!pagination) {
		pagination = <Pagination rowsPerPageOptions={[10, 25, 50, 100]} labelRowsPerPage="" />;
	}
	if (!perPage) {
		perPage = 10;
	}
	const gridStyles = useGridStyle();
	const listStyles = useRaListStyle();
	return (
		<React.Fragment>
			{getBreadCrumbs(props.resource, 'list')}
			<List
				{...props}
				filters={filters}
				actions={actions}
				filterDefaultValues={filterDefaultValues}
				pagination={pagination}
				perPage={perPage}
				classes={listStyles}
			>
				{React.cloneElement(props.children, {
					classes: gridStyles,
				})}
			</List>
		</React.Fragment>
	);
};

const fixDefaultValue = (defaultValue, isEdit, hasFileUpload, form, record) => {
	defaultValue = getDefaultValuesFromParam(defaultValue);
	if (hasFileUpload) defaultValue.multipartFormData = 1;
	return defaultValue;
};

export class MySimpleForm extends React.Component {
	_record;
	extras = {};
	constructor(props) {
		super(props);
		this.init(props);
	}
	componentWillReceiveProps(props) {
		console.log('MySimpleForm componentWillReceiveProps', props.record);
		this._onRecordDone = 0;
		this.init(props);
	}
	componentDidMount() {
		this.props.onMount && this.props.onMount();
	}
	save(d, redirect) {
		var data = { ...d };
		removeEmptyObjects(data);
		if (this.props.recordOnSave) {
			//data = this.props.recordOnSave(JSON.parse(JSON.stringify(data)));
			data = this.props.recordOnSave(data);
		}
		console.log('save', data, redirect);
		this.props.save(data, redirect);
	}
	init(props) {
		console.log('MySimpleForm init', props);
		const { isEdit, recordOnLoad, recordOnSave, recordFormat, hasFileUpload, isTabbed, ...rest } = props;
		if (!isEdit) {
			this.extras.initialValues = fixDefaultValue(props.initialValues, false, hasFileUpload, props.form);
		}
		this._record = props.record;
		//removeEmptyObjects(this._record);
		if (!this._record) this._record = {};
		if (recordOnLoad && !this._onRecordDone) {
			this._record = recordOnLoad(this._record);
			this._onRecordDone = 1;
			console.log('MySimpleForm recordOnLoad items', this._record.items);
			console.log('MySimpleForm recordOnLoad items2', this._record.items2);
		}
		if (recordFormat) {
			this._record = recordFormat(this._record);
		}
		if (!this._record) this._record = {};
		if (hasFileUpload) this._record.multipartFormData = 1;
		console.log('MySimpleForm record', this._record);

		//this.extras.debug = (state, fieldStates) => {
		//	console.log('Form debug state', state);
		//	console.log('Form debug fieldStates', fieldStates);
		//};
		//this.extras.initialValuesEqual = (oldObj, newObj) => {
		//	console.log('Form initialValuesEqual old', oldObj);
		//	console.log('Form initialValuesEqual new', newObj);
		//	return false;
		//};
		this.extras.keepDirtyOnReinitialize = false;
	}
	render() {
		console.log('MySimpleForm render', this.props);
		const { record, initialValues, defaultValue, isEdit, recordOnLoad, recordOnSave, recordFormat, hasFileUpload, isTabbed, ...props } = this.props;

		if (isTabbed) return <TabbedForm {...props} {...this.extras} record={this._record} save={this.save.bind(this)} />;
		return <SimpleForm {...props} {...this.extras} record={this._record} save={this.save.bind(this)} />;
	}
}

export const MyTabbedForm = props => {
	var defaultValue = getDefaultValuesFromParam(props.defaultValue);

	return <TabbedForm {...props} />;
};

const isSuperAdmin = () => {
	return staticHelper.isSuper();
};

export const HasAccess = (moduleKey, pageKey, actionKey) => {
	//console.log('HasAccess', moduleKey, pageKey, actionKey);
	if (isSuperAdmin()) return true;
	//if (isAdmin()) return true;
	if (staticHelper.getRoles()[moduleKey + '_' + pageKey + '_admin']) return true;
	if (staticHelper.getRoles()[moduleKey + '_' + pageKey + '_' + actionKey]) return true;
	return false;
};

const omitId = obj => {
	if (!obj || typeof obj != 'object') return obj;
	if (Array.isArray(obj)) {
		for (const key in obj) {
			obj[key] = omitId(obj[key]);
		}
		return obj;
	}
	const { id, ...rest } = obj;
	for (const key in rest) {
		rest[key] = omitId(rest[key]);
	}
	return rest;
};

export const MyEditActions = (topProps, pageConfig, extraButtons) => {
	const EditAction = ({ basePath, data, resource, ...rest }) => {
		if (!data) data = {};
		data = JSON.parse(JSON.stringify(data));
		console.log('Editbutton', data);
		const to = {
			pathname: `${basePath}/create`,
			state: { record: omitId(data) },
		};
		console.log('Editbutton2', to.state.record);
		return (
			<div className="flex-space-between">
				<div>
					{getQueryParam('dialog') == '1' && getQueryParam('noback') != '1' && (
						<Button
							onClick={() => {
								window.history.go(-1);
							}}
							color="primary"
							label="ra.action.back"
						>
							<ArrowBack />
						</Button>
					)}
				</div>
				<TopToolbar style={{ zIndex: 2, alignItems: 'flex-end', minHeight: 0 }}>
					{extraButtons
						? React.cloneElement(extraButtons, {
								record: data,
						  })
						: null}
					{pageConfig.get && <ShowButton basePath={basePath} record={data} />}
					{pageConfig.new && <CloneButton basePath={basePath} record={data} to={to} />}
					{pageConfig.delete && <DeleteButton undoable={false} basePath={basePath} record={data} resource={resource} />}
				</TopToolbar>
			</div>
		);
	};
	return <EditAction />;
};

export const MyCreateActions = (topProps, pageConfig) => {
	const CreateAction = ({ basePath, data, resource, ...rest }) => {
		return (
			<div className="flex-space-between">
				<div>
					{getQueryParam('dialog') == '1' && getQueryParam('noback') != '1' && (
						<Button
							onClick={() => {
								window.history.go(-1);
							}}
							color="primary"
							label="ra.action.back"
						>
							<ArrowBack />
						</Button>
					)}
				</div>
				{/* <TopToolbar style={{ zIndex: 2, alignItems: "flex-end", minHeight: 0, paddinTop: 10 }}></TopToolbar> */}
			</div>
		);
	};
	return <CreateAction />;
};

export const getDetailActions = (topProps, pageConfig) => {
	var hideActions = getQueryParam('hideActions') == '1';
	const Trans = ({ basePath, data, resource }) => (
		<div className="flex-space-between">
			<div>
				{getQueryParam('dialog') == '1' && getQueryParam('noback') != '1' && (
					<Button
						onClick={() => {
							window.history.go(-1);
						}}
						color="primary"
						label="ra.action.back"
					>
						<ArrowBack />
					</Button>
				)}
			</div>
			{!hideActions && (
				<TopToolbar style={{ zIndex: 2, alignItems: 'flex-end', marginRight: 30 }}>
					{pageConfig.edit && <EditButton basePath={basePath} record={data || {}} />}
					{pageConfig.new && <CloneButton basePath={basePath} record={data || {}} />}
					{pageConfig.delete && <DeleteButton undoable={false} resource={resource} basePath={basePath} record={data || {}} />}
				</TopToolbar>
			)}
		</div>
	);
	return <Trans />;
};

export const getL10nPageTitleKey = defaults => {
	return 'resources.' + defaults.route + '.name';
};

export const getCustomTitle = (defaults, recordField) => {
	const Trans = ({ record }) => {
		return <span>{record && record[recordField] ? `${record[recordField]}` : ''}</span>;
	};
	return <Trans />;
};

export const getBreadCrumbs = function(resource, key) {
	console.log('crumbs', arguments);
	if (getQueryParam('hideBreadCrumbs') == '1') return null;
	const keys = [];
	for (let i = 0; i < arguments.length; i++) {
		if (i < 2) continue;
		keys.push(arguments[i]);
	}
	console.log('keys', keys);
	const translate = ErpBusiness.instance().translate;

	return (
		<div style={{ marginTop: 30 }}>
			<Typography variant="h6" color="inherit">
				{translate('resources.' + resource + '.name')}
			</Typography>
			{crumbs('/' + resource, translate('resources.' + resource + '.name'), translate('pages.breadCrumbs.' + key), ...keys)}
		</div>
	);
};

export const MyEditCreateToolbar = ({ isEdit, pageConfig, undoable, hideSaveAndNew, redirect, ...props }) => {
	//console.log("MyEditCreateToolbar", pageConfig);
	const form = useForm();
	if (redirect === undefined) {
		// “edit”, “show”, “list”, and false to disable redirection
		redirect = pageConfig.edit ? 'edit' : 'list';
	}
	if (hideSaveAndNew) return null;
	return (
		<MyToolbar {...props}>
			{(pageConfig.edit || pageConfig.save) && (
				<SaveButton label={isEdit ? 'ra.action.save' : 'ra.action.create'} redirect={redirect} submitOnEnter={false} color="secondary" />
			)}
			{!isEdit && !hideSaveAndNew && (
				<SaveButton
					label="pages.action.saveAndNew"
					//redirect={(basePath, id, data) => `${basePath}/create?t=` + (id + 1)}
					redirect={'create?source={}'}
					submitOnEnter={false}
					variant="contained"
					style={{ marginLeft: 20 }}
				/>
			)}
		</MyToolbar>
	);
};

export const MySelectField = ({ record = {} }) => {
	if (getQueryParam('selectField') != '1') return null;
	return (
		<span>
			<Button
				onClick={() => {
					var dialogId = getQueryParam('iframeCallback');
					window.parent['iframeCallback' + dialogId](record);
				}}
				color="primary"
				variant="contained"
				label="pages.action.select"
			></Button>
		</span>
	);
};

export const getEditFormProps = (isEdit, record, route, callback) => {
	return {
		//defaultValue: record,
		record: record,
		id: record.id,
		//resource: route + new Date().getTime(),
		resource: route,
		basePath: route,
		change: (a, b, c) => {
			console.log('change', a, b, c);
		},
		save: (newData, redirect) => {
			console.log('getEditFormProps save', newData, redirect);
			var url = route;
			var options = {};
			if (isEdit) {
				url += '/update';
				options.method = 'POST';
			} else {
				url += '/new';
				options.method = 'POST';
			}
			ErpBusiness.instance()
				.callApi(url, newData, options)
				.then(response => {
					callback && callback(response, newData);
				});
		},
	};
};

export const fieldsFilterSort0 = (columns, prefix, onlyFields, excludeFields) => {
	if (!prefix) prefix = '';
	//console.log("fieldsFilterSort", excludeFields)
	if (onlyFields) {
		columns = columns
			.filter(x => x && onlyFields.filter(y => x.props && prefix + y == x.props.source).length > 0)
			.sort((a, b) => {
				var aIndex = onlyFields.indexOf(a.props.source.replace(prefix, ''));
				var bIndex = onlyFields.indexOf(b.props.source.replace(prefix, ''));
				return aIndex - bIndex;
			});
	}
	if (excludeFields) {
		columns = columns.filter(x => x && excludeFields.filter(y => x.props && prefix + y == x.props.source).length == 0);
	}

	return columns;
};
export const fieldsFilterSort = (columns, prefix, onlyFields, excludeFields) => {
	if (!excludeFields) excludeFields = [];
	if (onlyFields && Object.keys(onlyFields).length == 0) onlyFields = null;
	if (!onlyFields) {
		excludeFields = excludeFields.concat(['id', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']);
		//if (!isEdit) excludeFields.push("id");
	}
	if (getQueryParam('hideDefaultFilters') == '1') {
		const defaultValues = Object.keys(getDefaultValuesAsJson());
		excludeFields = excludeFields.concat(defaultValues);
		//console.log("MyListFilters", defaultValues, filterFields);
	}
	return fieldsFilterSort0(columns, prefix, onlyFields, excludeFields);
};

export const fieldsReplace = (columns, prefix, fieldName, newComponent) => {
	var i = columns.findIndex(x => x && x.props.source == prefix + fieldName);
	if (i != -1) columns[i] = newComponent;
};

export const TextInputSelectDialog = (
	prefix,
	source,
	relSource,
	title,
	url,
	defaultValueFunc,
	extras,
	condition,
	isRequired,
	defaultValues,
	onSelected,
	readOnly,
	topExtras,
) => {
	return (
		<FormDataConsumerCustom prefix={prefix} key={source + 'dl'} source={prefix + source} {...topExtras}>
			{({ form, formData, getSource, scopedFormData, ...rest }) => {
				if (condition && !condition(formData, scopedFormData)) {
					return null;
				}
				return (
					<TextInput
						{...extras}
						{...rest}
						source={prefix + source}
						format={v => {
							return defaultValueFunc(scopedFormData);
						}}
						InputProps={{
							endAdornment: !readOnly && (
								<InputAdornment position="end">
									<IconButton
										color="primary"
										variant="contained"
										onClick={() => {
											ErpBusiness.instance().openDialog({
												title: title,
												hasAppBar: true,
												buttons: [],
												defaultValues: defaultValues,
												addSelectField: true,
												hideActions: true,
												hideBreadCrumbs: true,
												iframeCallback: data => {
													form.change(prefix + relSource, data);
													form.change(prefix + source, data.id);
													set(formData, getSource(prefix + relSource), data);
													set(formData, getSource(prefix + source), data.id);

													onSelected && onSelected(formData, data);
												},
												url: url,
											});
										}}
									>
										<MoreHoriz />
									</IconButton>
								</InputAdornment>
							),
							inputProps: {
								readOnly: true,
								disabled: 'disabled',
							},
						}}
						validate={isRequired ? [required()] : []}
					/>
				);
			}}
		</FormDataConsumerCustom>
	);
};

export const getScopedFormData = (formData, path) => {
	if (!path) return formData || {};
	return get(formData, path.replace(/^[\.]+|[\.]+$/g, '')) || {};
};

export const MyListFilters = filterFields => {
	const useStyles = makeStyles(theme => ({
		form: {
			marginLeft: theme.spacing(5),
		},
	}));
	if (getQueryParam('hideDefaultFilters') == '1') {
		const defaultValues = Object.keys(getDefaultValuesAsJson());
		filterFields = filterFields.filter(x => x && defaultValues.filter(y => y == x.props.source).length == 0);
		//console.log("MyListFilters", defaultValues, filterFields);
	}
	for (const key in filterFields) {
		filterFields[key] = React.cloneElement(filterFields[key], {
			validate: undefined,
			allowEmpty: true,
		});
	}
	return (
		<Filter resource="" className={useStyles().form}>
			{filterFields}
		</Filter>
	);
};

export const CustomCreate = ({ hasFileUpload, defaultValue, pageConfig, actions, ...props }) => {
	//var record = fixDefaultValue(defaultValue, false, hasFileUpload, props.form);
	//record = { ...record, ...(props.location.state || {}).record };
	if (!actions) actions = MyCreateActions(props, pageConfig);
	return (
		<React.Fragment>
			{getBreadCrumbs(pageConfig.defaults.route, 'new')}
			<Create {...props} actions={actions} />
		</React.Fragment>
	);
};

export const CustomEdit = ({ titleField, actions, undoable, pageConfig, extraButtons, ...props }) => {
	console.log('CustomEdit', props);

	if (!undoable) undoable = false;
	if (!actions) actions = MyEditActions(props, pageConfig, extraButtons);
	var title = getCustomTitle(pageConfig.defaults, titleField);
	return (
		<React.Fragment>
			{getBreadCrumbs(pageConfig.defaults.route, 'edit', <span id="react-admin-title" />)}
			<Edit {...props} undoable={undoable} actions={actions} title={title} />
		</React.Fragment>
	);
};

export const CustomShow = ({ titleField, actions, undoable, pageConfig, ...props }) => {
	console.log('show', props);
	if (!actions) actions = getDetailActions(props, pageConfig);
	var title = getCustomTitle(pageConfig.defaults, titleField);
	return (
		<React.Fragment>
			{getBreadCrumbs(pageConfig.defaults.route, 'detail', <span id="react-admin-title" />)}
			<Show {...props} actions={actions} title={title} />
		</React.Fragment>
	);
};

export const LanguageDdl = ({ source, isRequired, ...props }) => {
	if (isRequired) {
		props.validate = [required()];
	}
	return <SelectInput key={source} source={source} choices={toChoices(enumsGlobal.Language, 'Language')} {...props} />;
};

export const MySimpleList = ({ right, ...props }) => {
	return (
		<div className="flex-space-between">
			<SimpleList {...props} />
			{right}
		</div>
	);
};
export const loadableBusiness = (imp, defaults) => {
	var list = { MyList: null, MyDetail: null, MyEdit: null, MyCreate: null };
	for (const key in list) {
		list[key] = Loadable({
			loader: () =>
				imp()
					.then(a => new Promise(resolve => setTimeout(() => resolve(a), 1000)))
					.then(resp => resp[key]),
			loading() {
				return <div>...</div>;
			},
		});
	}
	list.Defaults = defaults;
	return list;
};

export const FormDataConsumerCustom = ({ children, prefix, ...rest1 }) => {
	const form = useForm();

	return (
		<FormDataConsumer {...rest1}>
			{({ formData, getSource, scopedFormData, ...rest }) => {
				if (!getSource) {
					scopedFormData = getScopedFormData(formData, prefix);
					getSource = x => x;
				}
				return children({ form, formData, scopedFormData, getSource, ...rest });
			}}
		</FormDataConsumer>
	);
};

export const FormOnLoadComponent = ({ didMount, ...rest1 }) => {
	return (
		<FormDataConsumerCustom key={0} {...rest1}>
			{({ form, formData, getSource, scopedFormData, ...rest }) => {
				return <ViewComp didMount={didMount(form, formData)}></ViewComp>;
			}}
		</FormDataConsumerCustom>
	);
};

export const dataToRaIdsData = data => {
	if (!data) data = [];
	const ids = data.map(record => record.id);
	const dataObject = data.reduce((acc, next) => {
		acc[next.id] = next;
		return acc;
	}, {});
	return { ids, data: dataObject };
};
