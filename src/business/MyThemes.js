import { createMuiTheme } from '@material-ui/core/styles';
import { blue, yellow, pink, indigo, grey, common, red } from '@material-ui/core/colors';
import { merge } from 'lodash';
import createTypography from '@material-ui/core/styles/createTypography';
import createPalette from '@material-ui/core/styles/createPalette';
import staticHelper from '../helpers/staticHelper';
import { minHeight } from '@material-ui/system';
import { makeStyles } from '@material-ui/styles';

/*
--blue: #2196f3;
--indigo: #3f51b5;
--purple: #9c27b0;
--pink: #e91e63;
--red: #e53935;
--orange: #fb8c00;
--yellow: #ffeb3b;
--green: #4caf50;
--teal: #009688;
--cyan: #00bcd4;
--white: #fff;
--gray: #6c757d;
--gray-dark: #343a40;
--primary: #2196f3;
--secondary: #9c27b0;
--success: #4caf50;
--info: #009688;
--warning: #fb8c00;
--danger: #e53935;
--light: #e9ecef;
--dark: #343a40;
--tertiary: #4dabf5;
--breakpoint-xs: 0;
--breakpoint-sm: 576px;
--breakpoint-md: 768px;
--breakpoint-lg: 992px;
--breakpoint-xl: 1200px;
--breakpoint-xxl: 1440px;
*/

const light = {
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.54)',
		disabled: 'rgba(0, 0, 0, 0.38)',
		hint: 'rgba(0, 0, 0, 0.38)',
	},
	divider: 'rgba(0, 0, 0, 0.12)',
	background: {
		paper: common.white,
		default: grey[50],
	},
	action: {
		active: 'rgba(0, 0, 0, 0.54)',
		hover: 'rgba(0, 0, 0, 0.08)',
		hoverOpacity: 0.08,
		selected: 'rgba(0, 0, 0, 0.14)',
		disabled: 'rgba(0, 0, 0, 0.26)',
		disabledBackground: 'rgba(0, 0, 0, 0.12)',
	},
};

const dark = {
	text: {
		primary: common.white,
		secondary: 'rgba(255, 255, 255, 0.7)',
		disabled: 'rgba(255, 255, 255, 0.5)',
		hint: 'rgba(255, 255, 255, 0.5)',
		icon: 'rgba(255, 255, 255, 0.5)',
	},
	divider: 'rgba(255, 255, 255, 0.12)',
	background: {
		paper: grey[800],
		default: '#303030',
	},
	action: {
		active: common.white,
		hover: 'rgba(255, 255, 255, 0.1)',
		hoverOpacity: 0.1,
		selected: 'rgba(255, 255, 255, 0.2)',
		disabled: 'rgba(255, 255, 255, 0.3)',
		disabledBackground: 'rgba(255, 255, 255, 0.12)',
	},
};

const defaultTheme = {
	palette: {
		type: 'light',
		common: {
			black: '#000',
			white: '#fff',
		},
		primary: {
			light: indigo[300],
			main: indigo[500],
			dark: indigo[700],
			contrastText: '#fff',
		},
		secondary: {
			light: pink.A200,
			main: pink.A400,
			dark: pink.A700,
			contrastText: '#fff',
		},
		error: {
			light: red[300],
			main: red[500],
			dark: red[700],
			contrastText: '#fff',
		},
		background: {
			paper: '#fff',
			default: '#fafafa',
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.95)', // 0.87
			secondary: 'rgba(0, 0, 0, 0.84)', // 0.54
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)',
		},
		action: {
			active: 'rgba(0, 0, 0, 0.81)',
			hover: 'rgba(0, 0, 0, 0.08)',
			hoverOpacity: 0.08,
			selected: 'rgba(0, 0, 0, 0.14)',
			disabled: 'rgba(0, 0, 0, 0.26)',
			disabledBackground: 'rgba(0, 0, 0, 0.12)',
		},
		tonalOffset: 0.2,
	},
	typography: {},
};

// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createPalette.js
const palette1 = createPalette({
	type: 'light',
	primary: {
		main: blue[500],
	},
});

//var coef = fontSize / 14;
//const pxToRem = size => `${(size / htmlFontSize) * coef}rem`;

// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createTypography.js
const font1 = createTypography(defaultTheme.palette, {
	//pxToRem: pxToRem
	fontFamily: ['"Nunito Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
	fontSize: 12,
	fontWeightLight: 300,
	fontWeightRegular: 400,
	fontWeightMedium: 600,
	fontWeightBold: 700,
	htmlFontSize: 16,
});

const spacing = [0, 4, 8, 16, 32, 64];

const mergeTheme = (themeObj) => {
	console.log('mergeTheme', themeObj);

	const { theme, ...options } = themeObj;
	const baseTheme = {
		sidebar: {
			//width: 300, // The default value is 240
			closedWidth: 0, // The default value is 55
		},
		// palette: {
		// 	//type: "dark",
		// 	primary: pink,
		// 	secondary: {
		// 		light: "#6ec6ff",
		// 		main: "#2196f3",
		// 		dark: "#0069c0",
		// 		contrastText: "#fff"
		// 	},
		// 	background: {
		// 		default: "#FFFFFF"
		// 	},
		// },
		typography: createTypography(theme.palette, {
			//pxToRem: pxToRem
			fontFamily: ['"Nunito Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
			fontSize: 13,
			fontWeightLight: 300,
			fontWeightRegular: 400,
			fontWeightMedium: 600,
			fontWeightBold: 700,
			htmlFontSize: 16,
		}),
		overrides: {
			MuiButtonBase: {
				root: {
					color: theme.palette.text.secondary,
				},
			},
			MuiButton: {
				root: {},
				flat: {
					// default
					//backgroundColor: theme.palette.primary.main,
					//color: theme.palette.primary.contrastText,
					'&.page-number': {
						backgroundColor: theme.palette.primary.main,
						color: theme.palette.primary.contrastText,
					},
				},
				flatPrimary: {
					//backgroundColor: "unset",
					//color: theme.palette.primary.main
					'&.page-number': {
						backgroundColor: 'unset',
						color: theme.palette.primary.main,
					},
				},
				containedPrimary: {
					//color: theme.palette.text.primary.contrastText
				},
				flatSecondary: {},
			},
			MuiListItemIcon: {
				root: {
					//color: theme.palette.primary.contrastText, //"#000000",
					//marginRight: 0,
					//width: "0.7em",
					//height: "0.7em"
					minWidth: 30,
				},
			},
			MuiListItemText: {
				primary: {
					//color: "#6c757d"
					fontWeight: 600,
				},
			},
			MuiTypography: {
				h4: {
					fontWeight: 400,
				},
			},
			MuiAppBar: {
				root: {
					//boxShadow: 'none',
					//background: 'none',
					//marginBottom: 30
				},
			},
			MuiDrawer: {
				docked: {
					boxShadow: '0 0 2rem 0 rgba(0, 0, 0, 0.1)',
					zIndex: 10,
				},
			},
			MuiFormControl: {
				root: {
					verticalAlign: undefined,
					width: spacing[2] * 26 + 'px !important',
				},
				marginNormal: {
					marginTop: 8,
				},
				marginDense: {
					width: spacing[2] * 26 + 'px !important',
					//minWidth: '256px',
					marginTop: 2,
					marginBottom: 2,
				},
				fullWidth: {
					width: '100% !important',
				},
			},
			MuiFormGroup: {
				root: {
					alignSelf: 'center',
					display: 'inline-flex',
				},
			},
			MuiInput: {
				root: {
					border: '1px solid rgb(217, 217, 217)',
					padding: '0 0.7rem',
					borderRadius: 6,
					//height: "calc(1.8125rem + 2px)",
					'&$focused': {
						borderColor: '#9acffa',
						outline: 0,
						borderRadius: '0.2rem',
						boxShadow: '0 0 0 0.2rem rgba(33, 150, 243, 0.25)',
					},
				},
				formControl: {},
				inputType: {},
				focused: {},
				underline: {
					'&::before': {
						content: 'none',
					},
					'&::after': {
						content: 'none',
					},
				},
				input: {
					padding: '7px 0 7px',
				},
			},
			MuiFilledInput: {
				root: {
					borderTopLeftRadius: 6,
					borderTopRightRadius: 6,
					backgroundColor: 'none',
					border: '1px solid rgb(217, 217, 217)',
					borderRadius: 6,
					'&:hover': {
						backgroundColor: 'rgba(0, 0, 0, 0.03)',
					},
					'&.Mui-focused': {
						backgroundColor: 'rgba(0, 0, 0, 0.03)',
					},
				},
				input: {
					marginDense: {
						paddingTop: 19,
						paddingBottom: 4,
					},
				},
			},
			MuiInputLabel: {
				formControl: {
					left: 5,
				},
			},
			MuiTable: {
				root: {
					width: 'calc(100% - 48px)',
					marginTop: 15,
					marginLeft: 24,
					marginRight: 24,
				},
			},
			MuiTableRow: {
				head: {
					//borderBottom: '2px solid ' + theme.palette.divider,
					//borderTop: '1px solid ' + theme.palette.divider,
				},
			},
			MuiTableCell: {
				root: {
					padding: 4,
				},
				head: {
					fontWeight: 600,
					fontSize: 15,
				},
			},
			MuiTablePagination: {
				spacer: {
					flex: undefined,
				},
				caption: {
					fontWeight: 600,
					'&:last-of-type': {
						flex: 1,
						textAlign: 'center',
					},
				},
				selectRoot: {
					marginLeft: 0,
					marginRight: 0,
					paddingRight: 5,
				},
				input: {
					padding: 3,
					//backgroundColor: "#FF00FF"
				},
				select: {
					color: '#FFF',
				},
				selectIcon: {
					color: '#FFF',
				},
				toolbar: {
					marginTop: 15,
					marginBottom: 15,
				},
			},
			MuiCard: {
				root: {
					//margin: 30
				},
			},
			MuiModal: {
				root: {
					margin: 30,
				},
			},
			MuiPaper: {
				root: {
					marginTop: '0 !important',
					//backgroundColor: theme.palette.background.paper + " !important"
				},
				rounded: {
					borderRadius: 10,
				},
			},
			MuiMenuItem: {
				root: {
					minHeight: '25px !important',
				},
			},
			MuiDialog: {
				container: {
					height: 'calc(100% - 50px)',
					margin: 30,
				},
			},
			MuiToolbar: {
				regular: {
					justifyContent: 'flex-end',
				},
			},
			MuiFormHelperText: {
				contained: {
					margin: '2px 14px 0',
				},
			},
		},
	};

	return merge(baseTheme, theme);
};

const theme1 = {
	theme: {
		mixins: {
			vs: {
				rightSideBgColors: '#F9F9F9, #f7f7f7',
				color1: '#ff5722',
				color2: '#529949',
				menuTopColors: '#f9f9f9, #fff',
				rowEven: '#efefef5e',
			},
		},
		palette: createPalette({
			type: 'light',
			primary: {
				main: pink.A400,
			},
			secondary: {
				main: '#3e9cd6',
			},
			background: {
				default: '#FFF',
				paper: '#FFF',
			},
			text: {
				primary: 'rgba(0, 0, 0, 0.9)', // 0.87
				secondary: 'rgba(0, 0, 0, 0.8)', // 0.54
				disabled: 'rgba(0, 0, 0, 0.5)',
				hint: 'rgba(0, 0, 0, 0.5)',
			},
			action: {
				active: 'rgba(0, 0, 0, 0.71)',
			},
		}),
		overrides: {
			MuiTablePagination: {
				input: {
					backgroundColor: '#3e9cd6',
				},
				selectIcon: {
					top: 5,
				},
			},
			MuiAppBar: {
				colorPrimary: {
					backgroundColor: '#FFF',
					boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.2)',
				},
			},
			MuiToolbar: {
				root: {
					color: 'rgba(0, 0, 0, 0.71)',
				},
			},
		},
	},
};

const theme2 = {
	theme: {
		mixins: {
			vs: {
				rightSideBgColors: '#1e1e1e, #2e2e2e',
				color1: '#673ab7',
				color2: '#542a2d',
				menuTopColors: '#333, #252526',
				rowEven: '#292929',
			},
		},
		palette: createPalette({
			type: 'dark',
			primary: {
				main: '#7bdcf0',
			},
			secondary: {
				main: '#ff5722',
			},
			background: {
				default: '#252526',
				paper: '#252526',
			},
		}),
		overrides: {
			MuiTablePagination: {
				input: {
					backgroundColor: '#ff5722',
				},
			},
			MuiAppBar: {
				colorPrimary: {
					backgroundColor: '#222',
					color: '#fff',
				},
			},
		},
	},
};
const userTheme = ['', theme1, theme2][staticHelper.getUserTheme() || 1];
const finalTheme = createMuiTheme(mergeTheme(userTheme));

console.log('finalTheme', finalTheme);

// https://v1.material-ui.com/api/button/#css-api
// https://v1.material-ui.com/customization/default-theme/
export const getTheme = () => {
	return finalTheme;
};

export const useStylesMain = makeStyles((theme) => ({
	dropZone: {
		border: '1px dashed ' + theme.palette.text.primary,
		padding: 10,
	},
}));
