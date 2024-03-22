import { jwtStore } from './stores/auth.js'

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

class Auth {
	async request(func, endpoint, obj = {}) {
		if (obj.headers === undefined) {
			obj['headers'] = {}
		}
		obj.headers['Authorization'] = `Bearer ${jwtStore.get()}`;
		let resp = await func(endpoint, obj)
	
		if (resp.status === 401) {
		 	jwtStore.delete()
			// console.error(resp)
		 	location.reload()
		}

		if (resp.ok) {
			let data = await resp.json()
			return data
		} else {
			console.log('resp not ok')
			return null
		}
	}

	async get(endpoint, obj = {}) {
		return await this.request(get, endpoint, obj)
	}

	async post(endpoint, obj = {}) {
		return await this.request(post, endpoint, obj)
	}
}

export const auth = new Auth()
