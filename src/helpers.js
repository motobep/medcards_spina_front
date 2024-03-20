export async function request(endpoint, obj = {}) {
	return await fetch('/api/' + endpoint, obj)
}

export async function get(endpoint, obj = {}) {
	obj.method = 'GET'
	return await request(endpoint, obj)
}

export async function post(endpoint, obj = {}) {
	obj.method = 'POST'
	return await request(endpoint, obj)
}

export class Auth {
	constructor(authStore) {
		this.authStore = authStore;
	}
	async get(endpoint, obj = {}) {
		if (obj.headers === undefined) {
			obj['headers'] = {}
		}
		obj.headers['Authorization'] = this.authStore.jwt;
		return await get(endpoint, obj)
	}
	async post(endpoint, obj = {}) {
		if (obj.headers === undefined) {
			obj['headers'] = {}
		}
		obj.headers['Authorization'] = this.authStore.jwt;
		return await post(endpoint, obj)
	}
}
