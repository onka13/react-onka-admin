export function flattenObject(obj) {
	var root = {};
	(function tree(obj, index) {
		var suffix = toString.call(obj) == '[object Array]' ? ']' : '';
		for (var key in obj) {
			if (!obj.hasOwnProperty(key)) continue;
			root[index + key + suffix] = obj[key];
			if (toString.call(obj[key]) == '[object Array]') tree(obj[key], index + key + suffix + '[');
			if (toString.call(obj[key]) == '[object Object]') tree(obj[key], index + key + suffix + '.');
		}
	})(obj, '');
	return root;
}

export function fixDigits(val, fractionDigits) {
	if (!val || val === 0) return '';
	if (!fractionDigits) fractionDigits = 2;
	return parseFloat(parseFloat(val).toFixed(fractionDigits));
}

export function execCode(parameters, code) {
	// parameters => { a: 1, b:2 }
	// code => a +
	var cmd = '';
	for (const key in parameters) {
		cmd += 'var ' + key + '=this.' + key + ';';
	}
	cmd += code;
	//console.log('cmd', cmd)
	return new Function(cmd).apply(parameters);
}

export function removeEmptyObjects(o) {
	if (!o || typeof o !== 'object') return;
	for (var k in o) {
		if (!o[k] && o[k] !== 0 && o[k] !== '0') {
			delete o[k];
			continue;
		}
		if (!o[k] || typeof o[k] !== 'object') {
			continue; // If null or not an object, skip to the next iteration
		}
		if (Array.isArray(o[k])) {
			//continue;
		}
		// The property is an object
		removeEmptyObjects(o[k]); // <-- Make a recursive call on the nested object
		if (Object.keys(o[k]).length === 0) {
			delete o[k]; // The object had no properties, so delete that property
		}
	}
}

export function todayMinDateString() {
	var d = new Date();
	d.setHours(0, 0, 0, 0);
	return d.toISOString();
}
