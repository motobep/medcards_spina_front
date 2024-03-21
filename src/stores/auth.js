export const jwtStore = {
	get: () => {
		sessionStorage.getItem('jwt')
	},

	save: (token) => {
		sessionStorage.setItem('jwt', token)
	},

	delete: () => {
		sessionStorage.removeItem('jwt')
	},
}
