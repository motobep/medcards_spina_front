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

export const authStore = {
	isAdmin: () => {
		return sessionStorage.getItem('isAdmin') === 'true'
	},

	setIsAdmin: (val) => {
		return sessionStorage.setItem('isAdmin', val)
	},
}
