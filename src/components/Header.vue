<script setup>
defineProps(['name'])

import { jwtStore } from '@/stores/auth'

function logout() {
	jwtStore.delete()
	location.reload()
}
</script>

<template>
	<header class="flex justify-between items-center px-5 border-b py-4">
		<h1 class="text-2xl">{{ name }}</h1>
		<PrimaryBtn @click="logout()">Выйти</PrimaryBtn>
	</header>
</template>
