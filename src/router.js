import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@views/LoginView.vue'
import WorkerView from '@views/WorkerView.vue'
import AdminView from '@views/AdminView.vue'
import PagesView from '@views/PagesView.vue'

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
		},
		{
			path: '/admin',
			name: 'admin',
			component: AdminView,
		},
	],
})

export default router


