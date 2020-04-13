import * as Polyglot from 'node-polyglot';

const staticValues = { roles: null, localCurrency: null };

const staticHelper = {
	getRoles: () => {
		if (!staticValues.roles) {
			try {
				staticValues.roles = JSON.parse(localStorage.getItem('roles'));
			} catch (error) {}
			if (!staticValues.roles) staticValues.roles = {};
		}
		return staticValues.roles;
	},
	setRoles: value => {
		if (!value) return;
		staticValues.roles = value;
	},
	isLoggedIn: () => {
		return !!localStorage.getItem('AdminToken');
	},
	isDone: () => {
		return !!localStorage.getItem('AdminToken');
	},
	isSuper: () => {
		return !!localStorage.getItem('isSuper');
	},
	login: data => {
		localStorage.setItem('AdminToken', data.token);
		localStorage.setItem('username', '');
		localStorage.setItem('theme', data.theme || '1');
		localStorage.setItem('name', data.name);
		localStorage.setItem('isSuper', data.isSuper);
	},
	logout: () => {
		[
			'AdminToken',
			'username',
			'name',
			'roles',
		].forEach(x => {
			localStorage.removeItem(x);
		});
	},
	setCurrentLang: locale => {
		localStorage.setItem('locale', locale);
	},
	getCurrentLang: () => {
		return localStorage.getItem('locale');
	},
	getUserName: () => {
		return localStorage.getItem('name') || '';
	},
	getUserTheme: () => {
		return localStorage.getItem('theme');
	},
	setUserTheme: theme => {
		localStorage.setItem('theme', theme);
	},
	setUserName: name => {
		localStorage.setItem('name', name);
	},	
	clear: () => {
		for (const key in staticValues) {
			staticValues[key] = null;
		}
		staticHelper.logout();
	},
	defaultI18nContent: null,
	loadDefaultLang: () => {
		var lang = staticHelper.getCurrentLang();
		return staticHelper
			.i18nProvider()
			.changeLocale(lang || 'en')
			.then(messages => {
				console.log('loadDefaultLang', messages);

				staticHelper.defaultI18nContent = messages;
			});
	},
	i18nProvider: () => {
		//console.log("i18nProvider", locale);

		let locale = staticHelper.getCurrentLang() || 'en';
		var polyglot = new Polyglot({
			locale: locale,
			phrases: staticHelper.defaultI18nContent,
		});
		let translate = polyglot.t.bind(polyglot);
		const i18nProvider = {
			translate: (key, options) => translate(key, options),
			changeLocale: newLocale => {
				console.log('changeLocale', newLocale);
				locale = newLocale;
				const asyncMessages = {
					tr: () => import('../locales/ra-language-turkish'),
					en: () => import('../locales/ra-language-english'),
				};
				return asyncMessages[locale]().then(response => {
					//console.log("changeLocale", response.default);
					polyglot = new Polyglot({
						locale: locale,
						phrases: response.default,
					});
					translate = polyglot.t.bind(polyglot);
					return response.default;
				});
			},
			getLocale: () => locale,
		};
		return i18nProvider;
	},
};

export default staticHelper;
