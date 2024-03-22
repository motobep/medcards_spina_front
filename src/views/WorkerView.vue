<script setup>
import Calendar from 'primevue/calendar';
import Header from '@components/Header.vue';

import { ref, onMounted, watchEffect, computed } from 'vue'
import { auth } from '@/helpers'
import { authStore } from '@/stores/auth'
import moment from 'moment'


let employee_name = ref('')

let client_cached = authStore.get('client')

let date_cached_text = authStore.get('date')
let company_id_cached = authStore.get('company_id')
console.log('cached client, date, company', client_cached, date_cached_text, company_id_cached)

const companies = ref([])
let company_selected = ref(company_id_cached)

let date_cached =  moment(date_cached_text, 'DD.MM.YYYY')
let date_default = date_cached.isValid() ? date_cached.toDate() : null
const date = ref(date_default)
let clients = ref([])

let null_client = {
	id: 0,
	name: '',
	time_start: ``,
	time_end: ``,
	service: '',
}

let client_default = client_cached ?? null_client

let client_selected = ref(client_default)

function format_date(date) {
	return moment(date).format('DD.MM.YYYY')
}

let date_formatted = computed(() => {
	return format_date(date.value)
})

onMounted(async () => {
	await fetch_companies()
	employee_name.value = authStore.get('employee_name')
})

watchEffect(async () => {
	await fetch_clients(company_selected.value, format_date(date.value))
})

let wasFirstCompanyChange = false
watchEffect(async () => {
	authStore.set('company_id', company_selected.value)
	if (wasFirstCompanyChange) {
		client_selected.value = null_client
	}
	wasFirstCompanyChange = true
})

watchEffect(async () => {
	authStore.set('date', date_formatted.value)
	if (date_formatted.value !== date_cached_text) {
		client_selected.value = null_client
	}
})

watchEffect(async () => {
	authStore.set('client', client_selected.value)
})

async function fetch_companies() {
	let data = await auth.get('get_companies')
	if (data === null) return

	companies.value = data
	let ids = Object.keys(data).map(key => (data[key]))
	if (company_selected.value === null) company_selected.value = ids[1]
}

async function fetch_clients(company_id, date) {
	let data = await auth.post('get_employee_schedule', {
		body: JSON.stringify({
			company_id: company_id,
			date: date,
		})
	})
	if (data === null) {
		clients.value = []
		return
	}

	clients.value = data.map((el) => {
		let date_start = moment.unix(el.timestamp)
		let date_end = moment.unix(el.timestamp + el.length)
		return {
			id: el.client_id,
			name: el.client_name,
			time_start: `${date_start.format('HH:mm')}`,
			time_end: `${date_end.format('HH:mm')}`,
			service: el.services.join(', '),
		}
	})
}
</script>
<template>
	<div class="flex">
		<div class="w-80 px-2 border-e-2 pt-4 flex flex-col h-screen">
			<select v-model="company_selected" class="px-2 py-1 mb-3 rounded-lg dark:bg-gray-700">
				<option v-for="(val, key) in companies" class="" :value="val" :selected="company_selected === val">{{ key }}
				</option>
			</select>

			<Calendar class="mb-2" v-model="date" inline dateFormat="dd.MM.YYYY" />

			<div class="overflow-y-auto">
				<div v-for="item in clients" class="border border-gray-500 rounded-lg p-2 mt-4 cursor-pointer"
					:class="{ 'bg-gray-200 dark:bg-gray-700': item.id === client_selected.id }" @click="client_selected = item">
					<div class="border-b border-gray-400 mb-1">{{ item.time_start }} - {{ item.time_end }}</div>
					<div class="mb-2">{{ item.service }}</div>
					<div>{{ item.name }}</div>
				</div>
			</div>
		</div>
		<div class="w-5/6">
			<Header :name="employee_name" />

			<div class="px-5 py-2">
				<div v-if="client_selected.name && clients.length > 0" class="mb-1">Клинет: {{ client_selected.name }}</div>
				<RouterLink to="/worker/history" active-class="font-bold">
					<PrimaryBtn class="me-8 mb-5">История посещений</PrimaryBtn>
				</RouterLink>

				<RouterLink to="/worker/medcard" active-class="font-bold">
					<PrimaryBtn>Медкарта</PrimaryBtn>
				</RouterLink>

				<div v-if="client_selected.id && company_selected" class="border rounded-lg p-4 ">
					<RouterView />
				</div>

			</div>
		</div>
	</div>
</template>
