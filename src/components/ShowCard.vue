<script setup>
import Diagnoses from './Diagnoses.vue';
import Appointments from './Appointments.vue';
import CreateServices from './CreateServices.vue';

import { ref, onMounted } from 'vue'
import { auth } from '@/helpers'
import { authStore } from '@/stores/auth'


const services = ref([])

let diagnoses = ref([])
let appointments = ref([])

let diagnosis_text = ref('')

let client = authStore.get('client')
let client_id = client?.id

onMounted(async () => {
	if (!client_id) return

	await get_services()
	await fetch_diagnoses(client_id)
	await fetch_appointments(client_id)
})

async function get_services() {
	let services_cached = authStore.get('services')
	if (services_cached) {
		services.value = services_cached
		return
	}

	let data = await fetch_services()
	if (!data) return

	services.value = data
	authStore.set('services', services.value)
}

async function fetch_services() {
	let data = await auth.get('get_services')
	return data?.map((el) => el.service_name)
}

async function fetch_diagnoses(client_id) {
	let data = await auth.post('get_diagnoses', {
		body: JSON.stringify({
			client_id: client_id,
		})
	})
	if (data === null) return
	diagnoses.value = data
}

async function fetch_appointments(client_id) {
	let data = await auth.post('get_appointments', {
		body: JSON.stringify({
			client_id: client_id,
		})
	})
	if (data === null) return
	appointments.value = data.map((el) => {
		el.service = el.service_name
		el.amount = el.count
		el.visited = el.visit_count
		return el
	})
}

async function add_diagnosis(client_id, text) {
	let data = await auth.post('add_diagnosis', {
		body: JSON.stringify({
			client_id: client_id,
			text: text,
		})
	})
	if (data === null) return

	if (data.error === "") {
		await fetch_diagnoses(client_id)
	}
}

async function add_appointment(client_id, service, amount) {
	if (service === '' || amount <= 0) return
	let data = await auth.post('add_appointment', {
		body: JSON.stringify({
			client_id: client_id,
			service_name: service,
			count: amount,
		})
	})
	if (data === null) return

	if (data.error === "") {
		await fetch_appointments(client_id)
	}
}

async function accept_visit(id) {
	let data = await auth.post('accept_visit', {
		body: JSON.stringify({
			appointment_id: id,
		})
	})
	if (data === null) return

	if (data.error === "") {
		let found = appointments.value.find((el) => el.id === id)
		found.visited++
	}
}
</script>

<template>
	<div class="w-[1000px]">
		<div class="font-bold mb-2">Новый диагноз</div>
		<textarea v-model="diagnosis_text" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700" id="text"
			name="content" rows="3">Новый диагноз</textarea>
		<PrimaryBtn @click="add_diagnosis(client_id, diagnosis_text)" class="mb-5">Добавить</PrimaryBtn>

		<div class="font-bold mb-2">Диагнозы</div>
		<Diagnoses :data="diagnoses" class="mb-5" />

		<hr class="mb-8">

		<div class="mb-5">
			<div class="font-bold mb-2">Добавить назначение</div>
			<CreateServices :list="services" :add_handler="(service, amount) => add_appointment(client_id, service, amount)" />

			<div class="mb-4"></div>

			<div class="font-bold mb-2">Назначения</div>
			<Appointments :data="appointments" :accept_handler="accept_visit" :use_accept="true" />

		</div>
	</div>
</template>
