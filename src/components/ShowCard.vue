<script setup>
import Appointments from './Appointments.vue';
import Visited from './Visited.vue';

const data = [
	{
		id: 1,
		worker: 'ФИО',
		date: '11.11.1111',
		service: 'Услуга',
		amount: '10',
	},
	{
		id: 2,
		worker: 'ФИО 2',
		date: '11.11.1111',
		service: 'Услуга 12',
		amount: '10',
	},
]
</script>

<template>
	<div class="w-[1000px]">
		<div class="font-bold mb-2">Диагноз</div>
		<textarea class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700 mb-5" id="text" name="content"
			rows="5">Текст</textarea>

		<div class="mb-5">
			<div class="font-bold mb-2">Назначения</div>
			<Appointments :data="data"/>
		</div>

		<div class="mb-5">
			<div class="font-bold mb-2">Сходила на</div>
			<Visited :data="data"/>
		</div>
	</div>
</template>
