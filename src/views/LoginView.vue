<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { post } from '@/helpers'

const authStore = useAuthStore()
console.log('jwt', authStore.jwt)

let name = ref('')
let password = ref('')

const endpoint = 'auth'

async function submit() {
	const resp = await post(endpoint, {
		headers: {
      'Content-Type': 'application/json',
    },
		body: JSON.stringify({
			login: name.value,
			password: password.value,
		},)
	})

	if (!resp.ok) {
		console.log('resp not ok')
		return
	}

	const data = await resp.json()
	if (data.error !== '') {
		console.log(data.error)
	}

	authStore.saveJwt(data.token)
	console.log('jwt', authStore.jwt)
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
				<button id="send" type="submit"
					class="border border-gray-700 bg-gray-100 rounded-md px-2 mt-4 dark:bg-gray-800 dark:shadow-sm dark:shadow-gray-700">Войти</button>
			</form>
		</div>
	</div>
</template>
