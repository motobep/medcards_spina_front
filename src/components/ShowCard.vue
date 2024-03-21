<script setup>
import Diagnoses from './Diagnoses.vue';
import Appointments from './Appointments.vue';
import CreateServices from './CreateServices.vue';

import { ref, onMounted } from 'vue'
import { auth } from '@/helpers'
import { jwtStore } from '@/stores/auth'


const services = [
	'Услуга 1',
	'Услуга 2',
	'Услуга 3',
]

let diagnoses = ref([])
let appointments = ref([])

let diagnosis_text = ref('')

onMounted(async () => {
	await fetch_diagnoses()
	await fetch_appointments()
})

async function fetch_diagnoses() {
	let resp = await auth.post('get_diagnosis', {
		body: JSON.stringify({
			client_id: '1',
		})
	})
	let data = await resp.json()
	diagnoses.value = data
}

async function fetch_appointments() {
	let resp = await auth.post('get_appointments', {
		body: JSON.stringify({
			client_id: '5',
		})
	})
	let data = await resp.json()
	appointments.value = data.map((el) => {
		el.service = el.service_name
		el.amount = el.count
		el.visited = el.visit_count
		return el
	})
}

async function add_diagnosis(text) {
	let resp = await auth.post('add_diagnosis', {
		body: JSON.stringify({
			client_id: '5',
			text: text,
		})
	})
	let data = await resp.json()
	console.log('diagnosis', data)
	// if (data.error === "") {
	// 	await fetch_diagnoses()
	// }
}

async function add_appointment(service, amount) {
	if (service === '' || amount <= 0) return
	let resp = await auth.post('add_appointment', {
		body: JSON.stringify({
			client_id: '5',
			service_name: service,
			count: amount,
		})
	})
	let data = await resp.json()
	if (data.error === "") {
		await fetch_appointments()
	}
}

async function accept_visit(id) {
	let resp = await auth.post('accept_visit', {
		body: JSON.stringify({
			appointment_id: id,
		})
	})
	let data = await resp.json()
	if (data.error === "") {
		let found = appointments.value.find((el) => el.id === id)
		found.visited++
	}
}
</script>

<template>
	<div class="w-[1000px]">
		<div class="font-bold mb-2">Новый диагноз</div>
		<textarea v-model="diagnosis_text" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700" id="text" name="content"
			rows="3">Новый диагноз</textarea>
		<PrimaryBtn @click="add_diagnosis(diagnosis_text)" class="mb-5">Добавить</PrimaryBtn>

		<div class="font-bold mb-2">Диагнозы</div>
		<Diagnoses :data="diagnoses" class="mb-5" />

		<hr class="mb-8">

		<div class="mb-5">
			<div class="font-bold mb-2">Добавить назначение</div>
			<CreateServices :list="services" :add_handler="add_appointment" />

			<div class="mb-4"></div>

			<div class="font-bold mb-2">Назначения</div>
			<Appointments :data="appointments" :accept_handler="accept_visit" />

		</div>
	</div>
</template>
