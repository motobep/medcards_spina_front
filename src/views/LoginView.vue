<script setup>
import { ref } from 'vue'
import { jwtStore, authStore } from '@/stores/auth'
import { post } from '@/helpers'
import router from '@/router'

console.log('jwt', jwtStore.get())

let name = ref('')
let password = ref('')
let error_msg = ref('')

const endpoint = 'auth'

async function submit() {
	const resp = await post(endpoint, {
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			// login: name.value,
			// password: password.value,
			login: '+7 (911) 565-52-43',
			password: 'P@ssw0rd',
			// login: 'testadmin',
			// password: '123123',
		},)
	})

	if (resp.status === 400) {
		error_msg.value = 'Неверный логин или пароль'
	}

	if (!resp.ok) {
		console.warn('resp status', resp.status)
		return
	}

	let data = await resp.json()

	if (data === null) return

	if (data.error !== '') {
		console.log(data.error)
		return
	}

	jwtStore.save(data.token)
	authStore.setIsAdmin(data.is_admin)
	authStore.set('employee_name', data.employee_name)

	if (authStore.isAdmin()) {
		router.push({ path: '/admin' })
	} else {
		router.push({ path: '/worker/history' })
	}
}
</script>

<template>
	<div class="flex items-center flex-col w-full mt-14">
		<h1 class="text-lg font-bold mb-4">Войти</h1>
		<div>
			<form @submit.prevent="submit">
				<div class="mb-1 ml-2">Логин</div>
				<input v-model="name" name="name" class="border border-gray-500 rounded-xl px-2 py-0.5 mb-3 dark:bg-gray-700"
					type="text"> <br>
				<div class="mb-1 ml-2">Пароль</div>
				<input v-model="password" name="password"
					class="border border-gray-500 rounded-xl px-2 py-0.5 mb-3 dark:bg-gray-700" type="password"> <br>
				<div class="text-red-400">{{ error_msg }}</div>
				<button id="send" type="submit"
					class="border border-gray-700 bg-gray-100 rounded-md px-2 mt-4 dark:bg-gray-800 dark:shadow-sm dark:shadow-gray-700">Войти</button>
			</form>
		</div>
	</div>
</template>
