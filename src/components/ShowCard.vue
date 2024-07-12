<script setup>
import Diagnoses from '@components/Diagnoses.vue';
import Appointments from '@components/Appointments.vue';
import CreateServices from '@components/CreateServices.vue';
import AddDiagnosis from '@components/AddDiagnosis.vue'

import { ref, onMounted, watchEffect, computed } from 'vue'
import { auth } from '@/helpers'
import { authStore, useClientStore } from '@/stores/auth'
import moment from 'moment'
import Medcard from './Medcard.vue';
import { nextTick } from 'vue'

const clientStore = useClientStore()

const services = ref([])

let diagnoses = ref([])
let appointments = ref([])
const opened_medcards = ref(new Map())
let is_new_medcard_opened = ref(false);
const medcards = ref([]);

let client_id = computed(() => {
	let c = clientStore.client
	return c?.id
})

// triggers twice. first time on load
watchEffect(async () => {
	if (!client_id.value) return

	await get_services()
	await fetch_diagnoses(client_id.value)
	await fetch_appointments(client_id.value)
})

async function get_services() {
	let services_cached = authStore.get('services')
	if (services_cached) {
		services.value = services_cached
		return
	}

	let data = await fetch_services()
	if (!data) return

	services.value = data.sort((a, b) => {
		if (a > b) return 1;
		if (a < b) return -1
		return 0
	})
		
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
	diagnoses.value = data.map((el) => {
		el.created_at = moment.unix(el.created_at).format('DD.MM.YYYY')
		return el
	}).sort(compare_idx_of_objects)
}

function compare_idx_of_objects(a, b) {
	if (a.id > b.id) return -1
	if (a.id < b.id) return 1
	return 0
}

async function fetch_appointments(client_id) {
	let data = await auth.post('get_appointments', {
		body: JSON.stringify({
			client_id: client_id,
		})
	})
	if (data === null) return
	appointments.value = data.map((el) => {
		el.created_at = moment.unix(el.created_at).format('DD.MM.YYYY')
		el.service = el.service_name
		el.amount = el.count
		el.visited = el.visit_count
		return el
	}).sort(compare_idx_of_objects)
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

async function toggle_medcard(id) {
	if (id === -1) {
		is_new_medcard_opened.value = !is_new_medcard_opened.value;
		return;
	}
	var res = opened_medcards.value.get(id);

	if (res === undefined) {
		opened_medcards.value.set(id, true);
		await nextTick();
		return;
	}
	opened_medcards.value.delete(id);
}

</script>

<template>
	<div class="w-[1000px]">
		<div>
			<span @click="toggle_medcard(-1)" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Новая медкарта</span>
				<div class="mb-4"/>
				<transition name="slide">
					<div v-if="is_new_medcard_opened" class="border rounded-lg p-3">
						<Medcard :client_id="client_id" :is_new="true"/>
					</div>
				</transition>
			<div class="mb-4"/>
		</div>

		<div v-for="medcard in medcards">
			<span @click="toggle_medcard(medcard.id)" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">{{ medcard.id }}</span>
				<div class="mb-4"/>
				<transition name="slide">
					<div v-if="opened_medcards.has(medcard.id)" class="border rounded-lg p-3">
						<Medcard :client_id="client_id" medcard_id="medcard.id" :is_new="true"/>
					</div>
				</transition>
			<div class="mb-4"/>
		</div>

		<div class="font-bold mb-2">Новый диагноз</div>
		<AddDiagnosis :services="services" :client_id="client_id"
			:callback="() => fetch_diagnoses(client_id) "/>

		<div class="mb-5">
		<div class="font-bold mb-2">Диагнозы</div>
		<Diagnoses :data="diagnoses" :fetch_appointments="() => fetch_appointments(client_id) " :fetch_diagnoses="() => fetch_diagnoses(client_id) " class="mb-5" />
		</div>
		<hr class="mb-8">

		<div class="mb-5">
			<div class="font-bold mb-2">Добавить назначение</div>
			<CreateServices :list="services" :add_handler="(service, amount) => add_appointment(client_id, service, amount)" />

			<div class="mb-4"></div>

			<div class="font-bold mb-2">Назначения</div>
			<Appointments :data="appointments" :accept_handler="accept_visit" :use_accept="false" />

		</div>
	</div>
</template>
