<script setup>
defineProps(['name'])
</script>

<template>
	<header class="flex justify-between items-center px-5 border-b py-4">
		<h1 class="text-2xl">{{ name }}</h1>
		<PrimaryBtn>Выйти</PrimaryBtn>
	</header>
</template>
