import React from 'react';
import { useTranslate } from 'react-admin';
import { Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, withStyles, Checkbox } from '@material-ui/core';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

import { withDataProvider } from 'ra-core';
import ErpBusiness from '../../../../business/ErpBusiness';
import { MyListComponent } from '../../../../helpers/moduleHelper';

const defaultActions = ['admin', 'list', 'get', 'new', 'edit', 'delete'];

const styles = (theme) => {
	console.log('styles', theme);
	// root,card,actions,header,noResults
	return {
		root: {
			width: '100%',
			marginTop: theme.spacing(3),
			overflowX: 'auto',
		},
		table: {
			minWidth: 700,
			'& th, & td': {
				textAlign: 'center !important',
				padding: '4px !important',
				borderBottom: 0,
				//border: "1px solid blue"
			},
			'& tr>td:first-child': {
				width: 200,
			},
		},
		row: {
			'&:nth-of-type(odd)': {
				backgroundColor: lighten(theme.palette.background.default, 0.05),
			},
			'&:nth-of-type(even)': {
				backgroundColor: darken(theme.palette.background.default, 0.05),
			},
		},
		moduleRow: {
			backgroundColor: theme.mixins.vs.color2,
		},
		actionTable: {
			padding: 0,
			margin: 0,
		},
		actionCell: {
			textAlign: 'center',
			width: '16.6%',
		},
	};
};

const roleValues = {};
const checkboxList = {};

class MyCheckbox extends React.Component {
	state = {
		value: false,
	};
	key;
	constructor(props) {
		super(props);
		this.key = this.props.roleId + '_' + this.props.moduleKey + '_' + this.props.pageKey + '_' + this.props.actionKey;
		this.adminKey = this.props.roleId + '_' + this.props.moduleKey + '_' + this.props.pageKey + '_admin';
		//console.log(this.key, roleValues[this.key])
		this.state.value = roleValues[this.key] || roleValues[this.adminKey] || false;
		checkboxList[this.key] = this;
	}
	handleChange = (event) => {
		if (this.props.actionKey == 'admin') {
			for (var i = 0; i < defaultActions.length; i++) {
				if (defaultActions[i] == 'admin') continue;
				var otherKey = this.props.roleId + '_' + this.props.moduleKey + '_' + this.props.pageKey + '_' + defaultActions[i];
				checkboxList[otherKey].change(event.target.checked);
				roleValues[otherKey] = false;
			}
		} else {
			if (roleValues[this.adminKey]) {
				return false;
			}
		}
		roleValues[this.key] = event.target.checked;
		this.change(event.target.checked);
	};
	change(isChecked) {
		this.setState({ value: isChecked });
	}
	render() {
		return <Checkbox checked={this.state.value} onChange={this.handleChange} value="value" title={this.props.actionKey} />;
	}
}

const MyGrid = ({ ids, data, basePath, classes }) => {
	const translate = useTranslate();
	console.log('ids', ids, data, basePath);
	if (ids.length == 0) return null;
	var roleActions = data[ids[0]].roleActions;
	var roles = data[ids[0]].roles;
	var currentRoles = data[ids[0]].currentRoles;

	for (let i = 0; i < currentRoles.length; i++) {
		roleValues[currentRoles[i].roleId + '_' + currentRoles[i].moduleKey + '_' + currentRoles[i].pageKey + '_' + currentRoles[i].actionKey] = true;
	}
	//console.log('roleValues', roleValues)

	var comp = [];
	var moduleData = {};
	for (let i = 0; i < roleActions.length; i++) {
		var item = roleActions[i];
		if (!moduleData[item.moduleKey]) moduleData[item.moduleKey] = {};
		if (!moduleData[item.moduleKey][item.pageKey]) moduleData[item.moduleKey][item.pageKey] = [];
		if (moduleData[item.moduleKey][item.pageKey].indexOf(item.actionKey) == -1) moduleData[item.moduleKey][item.pageKey].push(item.actionKey);
	}
	for (const moduleKey in moduleData) {
		var headComp = [];
		var bodyComp = [];
		headComp.push(
			<TableRow key={moduleKey} className={classes.moduleRow}>
				<TableCell>{translate('pages.modules.' + moduleKey)}</TableCell>
				{roles.map((role, j) => {
					return (
						<TableCell key={j}>
							<Table className={classes.actionTable}>
								<TableBody>
									<TableRow>
										<TableCell colSpan={defaultActions.length} align="center">
											{role.name}
										</TableCell>
									</TableRow>
									<TableRow>
										{defaultActions.map((x, i) => {
											return (
												<TableCell key={i} className={classes.actionCell}>
													{x.indexOf('proc') == 0 ? x : translate('pages.role.' + x)}
												</TableCell>
											);
										})}
									</TableRow>
								</TableBody>
							</Table>
						</TableCell>
					);
				})}
			</TableRow>,
		);
		for (const pageKey in moduleData[moduleKey]) {
			var actions = moduleData[moduleKey][pageKey];
			var extraActions = actions.filter((x) => defaultActions.indexOf(x) == -1);
			bodyComp.push(
				<TableRow key={pageKey} className={classes.row}>
					<TableCell>{translate('resources.admin/' + pageKey + 'Search.name', { _: pageKey })}</TableCell>
					{roles.map((role, j) => {
						return (
							<TableCell key={j}>
								<Table className={classes.actionTable}>
									<TableBody>
										<TableRow>
											{defaultActions.map((x, i) => {
												return (
													<TableCell key={i} className={classes.actionCell}>
														<MyCheckbox roleId={role.id} moduleKey={moduleKey} pageKey={pageKey} actionKey={x} />
													</TableCell>
												);
											})}
										</TableRow>
										{extraActions.length > 0 && (
											<TableRow>
												<TableCell align="center" colSpan={defaultActions.length} style={{ textAlign: 'center' }}>
													{extraActions.map((x, i) => {
														return (
															<span key={i} style={{}}>
																{x.indexOf('proc') == 0 ? x : translate('pages.role.' + x)}
																<MyCheckbox roleId={role.id} moduleKey={moduleKey} pageKey={pageKey} actionKey={x} />
															</span>
														);
													})}
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableCell>
						);
					})}
				</TableRow>,
			);
		}
		comp.push(
			<Table key={'table' + moduleKey} className={classes.table}>
				<TableHead>{headComp}</TableHead>
				<TableBody>{bodyComp}</TableBody>
			</Table>,
		);
	}
	return (
		<Paper className={classes.root}>
			<div className="flex-space-between" style={{ padding: 30 }}>
				<div>
					<Button
						onClick={() => {
							ErpBusiness.instance()
								.callApi('admin/RoleMap/updateRoleActionList', null, {
									method: 'get',
								})
								.then((response) => {
									if (!response) return;
									ErpBusiness.instance().displayMessage('Refreshed ' + response.value);
									setTimeout(() => {
										window.location.reload();
									}, 1000);
								});
						}}
						variant="outlined"
						color="secondary"
						style={{ marginRight: 10 }}
					>
						Refresh Role Definitions
					</Button>
					<MySaveButton />
				</div>
				<MySaveButton />
			</div>
			{comp}
		</Paper>
	);
};

class MySaveButtonClass extends React.Component {
	handleClick = () => {
		console.log('props', this.props);
		console.log('roleValues', roleValues);
		console.log(
			'roleValues trues',
			Object.keys(roleValues).filter((x) => roleValues[x]),
		);
		var selectedList = Object.keys(roleValues).filter((x) => roleValues[x]);

		ErpBusiness.instance().callApi('admin/RoleMap/save', {
			roles: selectedList,
		});
	};

	render() {
		//console.log("SaveButton", this.props);
		return (
			<Button variant="outlined" color="primary" onClick={this.handleClick}>
				SAVE
			</Button>
		);
	}
}

const MySaveButton = withDataProvider(MySaveButtonClass);

const MyList = (props) => {
	return (
		<MyListComponent
			title=""
			{...props}
			filters={null}
			pagination={null}
			bulkActionButtons={false}
			//actions={<ListActions canCreate={false} extraButtons={<MySaveButton />} />}
			actions={null}
		>
			<MyGrid classes={props.classes} />
		</MyListComponent>
	);
};

//export default MyList;
export default withStyles(styles)(MyList);
