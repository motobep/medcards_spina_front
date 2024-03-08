<script setup>
import Calendar from 'primevue/calendar';
import Header from '@components/Header.vue';
import AdminVisited from '@components/AdminVisited.vue';

import { ref } from 'vue'

const workers = [
	'Веремеенко Иван Отчество',
	'Алиев Али Отчество',
	'Алиев Али Отчество',
	'Алиев Али Отчество',
	'Алиев Али Отчество',
	'Алиев Али Отчество',
	'Алиев Али Отчество',
]

let workerIdx = ref(0)
const dates = ref()

const data = [
	{
		id: 1,
		service: 'Услуга',
		appointments: 5,
		visited: 4,
		sum: 1000,
	},
	{
		id: 2,
		service: 'Услуга 2',
		appointments: 7,
		visited: 7,
		sum: 2000,
	},
]
</script>
<template>
	<div class="flex">
		<div class="w-80 px-2 border-e-2 pt-4 flex flex-col">
			Сотрудники
			<PrimaryBtn v-for="(w, idx) in workers" @click="workerIdx = idx">{{ w }}</PrimaryBtn>
		</div>
		<div class="w-5/6">
			<Header name="Admin" />

			<div class="px-5 py-2">
				<div class="mb-5">Сотрудник: {{ workers[workerIdx] }}</div>

				<div class="border rounded-lg p-4 ">
					<div class="mb-2 inline-block me-4">Даты:</div>
					<Calendar class="mb-4" v-model="dates" selectionMode="range" :manualInput="false" />

					<AdminVisited :data="data" />
					<hr class="my-4">
					<div class="mb-2">Итого:</div>
					<table class="table-bordered table-gapped">
						<thead>
							<tr>
								<td>Назначено</td>
								<td>Сходил</td>
								<td>Сумма приемов</td>
								<td>Премия</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>7</td>
								<td>5</td>
								<td>18000</td>
								<td>1800</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>
		</div>
	</div>
</template>
