import config from './config';
import staticHelper from './helpers/staticHelper';

export default {
	login: ({ username, password }) => {
		console.log('login', username, password);
		const request = new Request(config.API_URL + '/admin/public/login', {
			method: 'POST',
			body: JSON.stringify({
				email: username,
				password,
			}),
			headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
		});
		return fetch(request)
			.then((response) => {
				if (response.status != 400 && (response.status < 200 || response.status >= 300)) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((body) => {
				console.log('login body', body);
				if (body.success && body.value) {
					staticHelper.login(body.value);

					var roles = {};
					if (body.value.roles) {
						for (let i = 0; i < body.value.roles.length; i++) {
							const role = body.value.roles[i];
							roles[role.moduleKey + '_' + role.pageKey + '_' + role.actionKey] = true;
						}
					}
					localStorage.setItem('roles', JSON.stringify(roles));
					return Promise.resolve();
				}
				var msg = body.message || 'api.code' + (body.code || 0);
				return Promise.reject(msg);
			});
	},
	logout: () => {
		console.log('logout');
		return Promise.resolve();
	},
	checkError: ({ status, body, resource }) => {
		console.log('checkError', status, body, resource);
		if (status === 400) {
			if (body.code == -30) return Promise.reject();
			if (body.code == -21) {
				staticHelper.clear();
				return Promise.reject();
			}
		}
		return Promise.resolve();
	},
	checkAuth: (a, b, c) => {
		if (!staticHelper.isLoggedIn()) return Promise.reject();
		return Promise.resolve(); // Promise.reject({ redirectTo: '/no-access' })
	},
	getPermissions: (a, b) => {
		return Promise.resolve();
	},
};
