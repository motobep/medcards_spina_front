import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@views/LoginView.vue'
import WorkerView from '@views/WorkerView.vue'
import AdminView from '@views/AdminView.vue'
import PagesView from '@views/PagesView.vue'

import ShowCard from '@components/ShowCard.vue';
import History from '@components/History.vue';

import { jwtStore } from '@/stores/auth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'pages',
			component: PagesView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/worker',
			name: 'worker',
			component: WorkerView,
			children: [
				{
					path: 'history',
					name: 'history',
					component: History,
				},
				{
					path: 'medcard',
					name: 'medcard',
					component: ShowCard,
				},
			]
		},
		{
			path: '/admin',
			name: 'admin',
			component: AdminView,
		},
	],
})

router.beforeEach(async (to, from) => {
	let isAuth = jwtStore.get('jwt') !== null
	if (!isAuth && to.name !== 'login') {
		return { name: 'login' }
	}
})

export default router


