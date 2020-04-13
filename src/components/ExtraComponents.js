import React from 'react';
import { SelectInput, AutocompleteInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ErpBusiness from '../business/ErpBusiness';
import { getLabelPath } from '../helpers/moduleHelper';

export class ViewComp extends React.Component {
	componentDidMount() {
		this.props.didMount && this.props.didMount();
	}
	render() {
		return this.props.children || null;
	}
}

export class MyTableView extends React.Component {
	componentWillReceiveProps(props) {
		console.log("MyTableView componentWillReceiveProps", props);
	}
	render() {
		console.log("MyTableView", this.props);
		const items = this.props.items || [];
		const extraListButtons = this.props.extraListButtons || (i => null);
		const hideAdd = this.props.hideAdd;
		const extraActionButtons = this.props.extraActionButtons || (_ => null);
		return (
			<div style={{ overflowX: 'scroll' }} className="scrollbar1">
				<Table padding="default">
					{!this.props.hideHeaders && (
						<TableHead>
							<TableRow>
								<TableCell>
									{!hideAdd && (
										<IconButton
											color="primary"
											onClick={() => {
												this.props.add();
											}}
										>
											<AddIcon />
										</IconButton>
									)}
									{extraActionButtons()}
								</TableCell>
								{this.props
									.rowFunc(0)
									.flat()
									.map((x, i) => {
										if (!x) return null;
										var label = x.props.label;
										if (label == undefined) label = ErpBusiness.instance().translate(getLabelPath(this.props.route, x.props.source));
										else if (label.indexOf('resources.') == 0) label = ErpBusiness.instance().translate(label);
										//console.log('CELL', x.props);
										return <TableCell key={i}>{label}</TableCell>;
									})}
							</TableRow>
						</TableHead>
					)}
					<TableBody>
						{items.length == 0 && (
							<TableRow>
								<TableCell />
							</TableRow>
						)}
						{items.map((item, i) => (
							<TableRow key={i}>
								<TableCell>
									{(!this.props.canRemoveable || this.props.canRemoveable(i)) && (
										<IconButton
											color="secondary"
											onClick={() => {
												this.props.remove(i);
											}}
										>
											<DeleteIcon />
										</IconButton>
									)}
									{extraListButtons(i)}
								</TableCell>
								{this.props
									.rowFunc(i, item)
									.flat()
									.map((x, j) => {
										if (!x) return null;
										return (
											<TableCell key={j}>
												{React.cloneElement(x, {
													label: '',
												})}
											</TableCell>
										);
									})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	}
}

export class MySelectInput extends React.Component {
	choices = [];
	constructor(props) {
		super(props);
		//console.log('MySelectInput cons', props);
		this.init(props)
	}
	componentWillReceiveProps(props) {
		//console.log('MySelectInput', props);		
		this.init(props)
	}
	init(props) {
		this.choices = props.choices;
		this.input = props.input;
		if (props.changed) {
			const originalChange = this.input.onChange;
			const optionValue = props.optionValue || 'id';
			this.input.onChange = (event, a) => {
				//console.log('onChange2', event.target.value);
				var val = event.target.value;
				var item = this.choices.filter(x => x[optionValue] == val)[0];
				props.changed(val, item);
				originalChange && originalChange(event, a);
			};
		}
	}
	render() {
		//console.log('MySelectInput render', this.props);
		const { changed, ...rest } = this.props;
		return <SelectInput {...rest} input={this.input} />;
	}
}
export class MyAutocompleteInput extends React.Component {
	constructor(props) {
		super(props);
		this.options = props;
	}
	componentWillReceiveProps(props) {
		this.options = props;
	}
	render() {
		//console.log("MyAutocompleteInput render", this.options);
		const { onSelected, ...props } = this.options;
		return (
			<AutocompleteInput
				{...props}
				onRef={that => {
					console.log('OKOKOK', that.props.source);
					if (that.handleSuggestionSelected) {
						const old = that.handleSuggestionSelected;
						that.handleSuggestionSelected = function(event, suggest) {
							console.log('handleSuggestionSelected', suggest.suggestion);
							old(event, suggest);
							onSelected && onSelected(that.props.source, suggest.suggestion);
						};
					}
				}}
			/>
		);
	}
}
