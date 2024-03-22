<script setup>
import Diagnoses from '@components/Diagnoses.vue';
import Appointments from '@components/Appointments.vue';

import { ref, onMounted } from 'vue'
import { auth } from '@/helpers'
import moment from 'moment'


let diagnoses = ref([])
let appointments = ref([])

let date, employee_id

let url_params = new URLSearchParams(window.location.search);
if (url_params.has('date') && url_params.has('employee_id')) {
	date = parseInt(url_params.get('date'))
	employee_id = parseInt(url_params.get('employee_id'))
}

onMounted(async () => {
	if (!employee_id || !date) return

	let date_from = moment.unix(date).format('DD.MM.YYYY')
	let date_to = moment.unix(date).add(1, 'd').format('DD.MM.YYYY')
	await fetch_diagnoses_by_date(employee_id, date_from, date_to)
	await fetch_appointments_by_date(employee_id, date_from, date_to)
})

async function fetch_diagnoses_by_date(employee_id, date_from, date_to) {
	let data = await auth.post('get_diagnoses_by_date', {
		body: JSON.stringify({
			employee_id: employee_id,
			date_from: date_from,
			date_to: date_to,
		})
	})
	if (data === null) return
	diagnoses.value = data.map((el) => {
		el.created_at = moment.unix(el.created_at).format('DD.MM.YYYY')
		return el
	})
}

async function fetch_appointments_by_date(employee_id, date_from, date_to) {
	let data = await auth.post('get_appointments_by_date', {
		body: JSON.stringify({
			employee_id: employee_id,
			date_from: date_from,
			date_to: date_to,
		})
	})
	if (data === null) return
	appointments.value = data.map((el) => {
		el.created_at = moment.unix(el.created_at).format('DD.MM.YYYY')
		el.service = el.service_name
		el.amount = el.count
		el.visited = el.visit_count
		return el
	})
}
</script>

<template>
	<div class="container mx-auto py-8">
		<button @click="$router.go(-1)" class="text-2xl cursor-pointer mb-4">&larr;</button>
		<div class="">
			<div class="font-bold mb-2">Диагнозы</div>
			<Diagnoses :data="diagnoses" class="mb-5" />

			<hr class="mb-8">

			<div class="mb-5">
				<div class="font-bold mb-2">Назначения</div>
				<Appointments :data="appointments" :use_accept="false" />
			</div>
		</div>
	</div>
</template>
