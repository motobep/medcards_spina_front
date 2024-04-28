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

	get(key) {
		let val = sessionStorage.getItem(key)
		if (!val) return val
		// console.log('val parsed', key, val)
		let j = JSON.parse(val)
		if ('_plain_value' in j) {
			return j['_plain_value']
		}
		return j
	}

	set(key, val) {
		let v = val
		// console.log('setted', val)
		if (typeof val !== 'object' || val === null) {
			v = { '_plain_value': val }
		}
		v = JSON.stringify(v)
		// console.log('setted v', v)
		return sessionStorage.setItem(key, v)
	}
}

export const authStore = new AuthStore()
