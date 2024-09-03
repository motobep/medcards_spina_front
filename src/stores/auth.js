import { ref } from 'vue'
import { defineStore } from 'pinia'

export const jwtStore = {
	get: () => {
		return sessionStorage.getItem('jwt')
	},

	save: (token) => {
		return sessionStorage.setItem('jwt', token)
	},

	delete: () => {
		return sessionStorage.removeItem('jwt')
	},
}

class AuthStore {
	isAdmin() {
		return this.get('isAdmin') === true
	}

	setIsAdmin(val) {
		return this.set('isAdmin', val)
	}

	need2FA() {
		return this.get('need2fa') === true
	}

	setNeed2FA(val) {
		return this.set('need2fa', val)
	}

	get(key) {
		let val = sessionStorage.getItem(key)
		if (!val) return val
		let j = JSON.parse(val)
		if ('_plain_value' in j) {
			return j['_plain_value']
		}
		return j
	}

	set(key, val) {
		let v = val
		if (typeof val !== 'object' || val === null) {
			v = { '_plain_value': val }
		}
		v = JSON.stringify(v)
		return sessionStorage.setItem(key, v)
	}
}

export const authStore = new AuthStore()

export const useClientStore = defineStore('counter', () => {
	let client_cached = authStore.get('client')
	let null_client = {
		id: 0,
		name: '',
		time_start: ``,
		time_end: ``,
		service: '',
	}
	let client_default = client_cached ?? null_client

	const client = ref(client_default)
	function set(val) {
		authStore.set('client', val)
		client.value = val
	}

	function setNull() {
		set(null_client)
	}

	return { client, set, setNull }
})

