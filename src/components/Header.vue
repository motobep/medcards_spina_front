<script setup>
defineProps(['name'])

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

function logout() {
	authStore.deleteJwt()
	location.reload()
}
</script>

<template>
	<header class="flex justify-between items-center px-5 border-b py-4">
		<h1 class="text-2xl">{{ name }}</h1>
		<PrimaryBtn @click="logout()">Выйти</PrimaryBtn>
	</header>
</template>
