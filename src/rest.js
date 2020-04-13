import { stringify } from 'query-string';
import { fetchUtils } from 'react-admin';
import staticHelper from './helpers/staticHelper';

const GET_LIST = 'getList',
	GET_ONE = 'getOne',
	GET_MANY = 'getMany',
	GET_MANY_REFERENCE = 'getManyReference',
	CREATE = 'create',
	UPDATE = 'update',
	UPDATE_MANY = 'updateMany',
	DELETE = 'delete',
	DELETE_MANY = 'deleteMany';

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
	/**
	 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
	 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
	 * @param {Object} params The data request params, depending on the type
	 * @returns {Object} { url, options } The HTTP request parameters
	 */
	const convertDataRequestToHTTP = (type, resource, params, options) => {
		console.log('convertDataRequestToHTTP', type, resource, params);
		let url = '';
		if (!options) options = {};

		if (!options.headers) {
			options.headers = new Headers({ Accept: 'application/json' });
		}
		const token = localStorage.getItem('ErpMainToken');
		if (token) options.headers.set('Authentication', 'Bearer ' + token);

		// options.user = {
		//     authenticated: true,
		//     token: 'SRTRDFVESGNJYTUKTYTHRG'
		// }

		switch (type) {
			case GET_LIST: {
				const { page, perPage } = params.pagination;
				const { field, order } = params.sort;
				const query = {
					sort: JSON.stringify([field, order]),
					range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
					filter: JSON.stringify(params.filter),
				};
				options.method = 'POST';
				options.body = JSON.stringify(params);
				var route = params.filter.customRoute || 'all';
				url = `${apiUrl}/${resource}/${route}`;
				break;
			}
			case GET_ONE:
				url = `${apiUrl}/${resource}/get/${params.id}`;
				options.method = 'GET';
				break;
			case GET_MANY: {
				// const query = {
				// 	pagination: {},
				// 	sort: {},
				// 	filter: {}
				// };
				options.method = 'POST';
				options.body = JSON.stringify(params.ids);
				url = `${apiUrl}/${resource}/gets`;
				break;
			}
			case UPDATE:
				if (params.data['multipartFormData']) {
					options.method = 'POST';
					url = `${apiUrl}/${resource}/update`;
					var formData = new FormData();
					for (var name in params.data) {
						if (params.data[name] && params.data[name].rawFile) {
							formData.append(name, params.data[name].rawFile, params.data[name].title);
						} else {
							formData.append(name, params.data[name]);
						}
					}
					options.body = formData;
				} else {
					options.method = 'POST';
					url = `${apiUrl}/${resource}/update`;
					options.body = JSON.stringify(params.data);
				}

				break;
			case CREATE:
				options.method = 'POST';
				if (params.data['multipartFormData']) {
					url = `${apiUrl}/${resource}/new`;
					var formData = new FormData();
					for (var name in params.data) {
						if (params.data[name] && params.data[name].rawFile) {
							formData.append(name, params.data[name].rawFile, params.data[name].title);
						} else {
							formData.append(name, params.data[name]);
						}
					}
					options.body = formData;
				} else {
					url = `${apiUrl}/${resource}/new`;
					options.body = JSON.stringify(params.data);
				}

				break;
			case DELETE:
				url = `${apiUrl}/${resource}/delete/${params.id}`;
				options.method = 'DELETE';
				break;
			case DELETE_MANY: {
				url = `${apiUrl}/${resource}/deletemany`;
				options.method = 'POST';
				options.body = JSON.stringify(params);
				break;
			}
			case GET_MANY_REFERENCE: {
				const { page, perPage } = params.pagination;
				const { field, order } = params.sort;
				const query = {
					sort: JSON.stringify([field, order]),
					range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
					filter: JSON.stringify({
						...params.filter,
						[params.target]: params.id,
					}),
				};
				url = `${apiUrl}/${resource}?${stringify(query)}`;
				break;
			}
			case 'CUSTOM': {
				url = `${apiUrl}/${resource}`;
				options.method = options.method || 'POST';
				if (options.method.toLowerCase() != 'get') {
					options.body = JSON.stringify(params);
				}
				break;
			}
			//default:
			//	throw new Error(`Unsupported fetch action type ${type}`);
		}
		console.log('rest', url, options);
		return { url, options };
	};

	/**
	 * @param {Object} response HTTP response from fetch()
	 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
	 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
	 * @param {Object} params The data request params, depending on the type
	 * @returns {Object} Data response
	 */
	const convertHTTPResponse = (response, type, resource, params) => {
		//console.log('RESPONSE', resource, type, params, JSON.stringify(response.json));
		// for (const key in response) {
		// 	console.log("response key", key, response[key])
		// }
		if (!response || !response.json) return Promise.reject(response.body || response);

		const { headers, json } = response;
		if (!json.success) return Promise.reject(json.message || json);

		switch (type) {
			// case GET_LIST:
			// case GET_MANY:
			// case GET_MANY_REFERENCE:
			//     // if (!headers.has('content-range')) {
			//     //     throw new Error(
			//     //         'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
			//     //     );
			//     // }
			//     return {
			//         data: json.value,
			//         total: json.total
			//         // total: parseInt(
			//         //     headers
			//         //         .get('content-range')
			//         //         .split('/')
			//         //         .pop(),
			//         //     10
			//         // ),
			//     };
			case UPDATE:
				return { data: { ...params.data } };
			case DELETE:
				return { data: params };
			case DELETE_MANY:
				return { data: params.ids };
			case 'CUSTOM':
				return json;
			default:
				return {
					data: json.value,
					total: json.total,
					id: json.value.id,
				};
		}
	};

	/**
	 * @param {string} type Request type, e.g GET_LIST
	 * @param {string} resource Resource name, e.g. "posts"
	 * @param {Object} payload Request parameters. Depends on the request type
	 * @returns {Promise} the Promise for a data response
	 */
	return (type, resource, params, opts) => {
		// if (type == GET_MANY) {
		// 	return Promise.resolve({ data: [] });
		// }
		// simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
		if (type === UPDATE_MANY) {
			return Promise.all(
				params.ids.map((id) =>
					httpClient(`${apiUrl}/${resource}/${id}`, {
						method: 'PUT',
						body: JSON.stringify(params.data),
					}),
				),
			).then((responses) => ({
				data: responses.map((response) => response.json),
			}));
		}
		// simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
		// if (type === DELETE_MANY) {
		//     return Promise.all(
		//         params.ids.map(id =>
		//             httpClient(`${apiUrl}/${resource}/${id}`, {
		//                 method: 'DELETE',
		//             })
		//         )
		//     ).then(responses => ({
		//         data: responses.map(response => response.json),
		//     }));
		// }

		const { url, options } = convertDataRequestToHTTP(type, resource, params, opts);
		console.log('httpClient', url, options);
		return httpClient(url, options)
			.then((response) => convertHTTPResponse(response, type, resource, params))
			.catch((error) => {
				console.log('httpClient catch', error);
				if (error.success === false && error.code > 0) {
					error.message = 'api.code' + error.code;
				} else if (error.status == 400 && !error.message) {
					error.message = 'api.code' + (error.code || error.body.code);
				}
				return Promise.reject(error);
			});
	};
};
