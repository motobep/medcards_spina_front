<script setup>
defineProps(['list', 'add_handler'])

import { ref } from 'vue'

let service = ref('')
let amount = ref(0)
</script>

<template>
	<div>
		<select v-model="service" class="px-2 py-1 mb-3 rounded-lg dark:bg-gray-700 me-5">
			<option disabled value="" selected>Выбрать услугу</option>
			<option v-for="(el, idx) in list" class="" :value="el">{{ el }}</option>
		</select>

		<input v-model="amount" type="number" class="w-[130px] rounded-lg py-1 px-2 me-5" placeholder="Количество">

		<span @click="add_handler(service, amount)" class="text-lg font-bold cursor-pointer">+</span>
	</div>
</template>
