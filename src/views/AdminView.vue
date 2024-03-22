<script setup>
import Calendar from 'primevue/calendar';
import Header from '@components/Header.vue';
import AdminVisited from '@components/AdminVisited.vue';

import { ref, onMounted, watchEffect } from 'vue'
import { auth } from '@/helpers'
import moment from 'moment'


let employee_name = 'Admin'

const workers = ref([])

let workerIdx = ref(-1)
const dates = ref()

const appointments = ref([])
const overall = ref({
	amount: 0,
	visited: 0,
	sum: 0,
	bonus: 0,
})

onMounted(async () => {
	let data = await auth.get('get_all_employees')
	if (data === null) return
	workers.value = data
})

function chooseWorker(idx) {
	workerIdx.value = idx
}

watchEffect(async () => {
	if (!dates.value) return
	if (dates.value[1] === null) return
	if (workerIdx.value <= -1) return

	let date_from = moment(dates.value[0]).format('DD.MM.YYYY')
	let date_to = moment(dates.value[1]).format('DD.MM.YYYY')
	await chooseDate(date_from, date_to)
})

async function chooseDate(date_from, date_to) {
	let data = await auth.post('get_appointments_by_date', {
		body: JSON.stringify({
			employee_id: workers.value[workerIdx.value].id,
			date_from: date_from,
			date_to: date_to,
		})
	})
	if (data === null) return
	appointments.value = data

	calcOverall(data)
}

function calcOverall(data) {
	let amount = 0
	let visited = 0
	let sum = 0
	for (let el of data) {
		amount += el.count
		visited += el.visit_count
		sum += el.sum
	}
	overall.value = {
		amount: amount,
		visited: visited,
		sum: sum,
		bonus: 0.1 * sum,
	}
}
</script>
<template>
	<div class="flex">
		<div class="w-80 px-2 border-e-2 pt-4 flex flex-col">
			Сотрудники
			<PrimaryBtn v-for="(w, idx) in workers" @click="chooseWorker(idx)"
				:class="{ 'bg-gray-200 dark:bg-gray-600': workerIdx === idx }">{{ w.full_name }}</PrimaryBtn>
		</div>
		<div class="w-5/6">
			<Header :name="employee_name" />

			<div class="px-5 py-2">
				<div v-if="workerIdx >= 0" class="mb-5">Сотрудник: {{ workers[workerIdx].full_name }}</div>

				<div class="border rounded-lg p-4 ">
					<div class="mb-2 inline-block me-4">Даты:</div>
					<Calendar class="mb-4" v-model="dates" selectionMode="range" :manualInput="false" />

					<AdminVisited :data="appointments" />
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
								<td>{{ overall.amount }}</td>
								<td>{{ overall.visited }}</td>
								<td>{{ overall.sum }}</td>
								<td>{{ overall.bonus }}</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>
		</div>
	</div>
</template>
