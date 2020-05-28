import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ErpBusiness from '../business/ErpBusiness';

export const VipLink = ({ to, ...rest }) => <Button component={Link} to={to} {...rest} />;

var bcStyle = { margin: 0, padding: 0, minWidth: 0 };

export const crumbs = function (basePath, title) {
	//console.log('crumbs', arguments);
	const items = [];
	for (let i = 0; i < arguments.length; i++) {
		if (i < 2 || !arguments[i]) continue;
		items.push(
			<React.Fragment key={i}>
				<Button component={Link} to="" style={bcStyle} disabled color="primary">
					<KeyboardArrowRight />
				</Button>
				<Button component={Link} to={`${basePath}`} style={{ ...bcStyle, ...{ color: 'inherit' } }} disabled color="primary">
					{arguments[i]}
				</Button>
			</React.Fragment>,
		);
	}
	return (
		<Grid container direction="row" style={{ marginBottom: 20, marginTop: 5 }}>
			<Button component={Link} to={`${basePath}`} style={bcStyle} color="primary">
				{title}
			</Button>
			{items}
		</Grid>
	);
};

export const PageLinkTitle = (props) => {
	return (
		<Button component={Link} to={`/${props.basePath}`} style={bcStyle} color="default">
			{ErpBusiness.instance().translate('resources.' + props.basePath + '.name')}
		</Button>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

export const MenuListComposition = (btnProps, btnText, items) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<div className={classes.root}>
			<div>
				<Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
					color="primary"
					variant="text"
					size="small"
					{...btnProps}
				>
					<ExpandMore /> {btnText}
				</Button>
				<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 999 }}>
					{({ TransitionProps, placement }) => (
						<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
										{items.map((x, i) => {
											const { onClick, text } = x;
											return (
												<MenuItem
													key={i}
													onClick={(e) => {
														onClick();
														return handleClose(e);
													}}
												>
													{text}
												</MenuItem>
											);
										})}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
};
