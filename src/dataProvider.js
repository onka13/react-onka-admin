import rest from './rest';
import config from './config';

export default () => {
	const handle = (type, resource, params) => {
		return rest(config.API_URL)(type, resource, params);
	};

	return {
        custom: (type, resource, params) => handle(type, resource, params),
        getList: (resource, params) => handle('getList', resource, params),
		getOne: (resource, params) => handle('getOne', resource, params),
		getMany: (resource, params) => handle('getMany', resource, params),
		getManyReference: (resource, params) => handle('getManyReference', resource, params),
		update: (resource, params) => handle('update', resource, params),
		updateMany: (resource, params) => handle('updateMany', resource, params),
		create: (resource, params) => handle('create', resource, params),
		delete: (resource, params) => handle('delete', resource, params),
		deleteMany: (resource, params) => handle('deleteMany', resource, params)		
	};
};
