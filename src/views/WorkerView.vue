<script setup>
import Calendar from 'primevue/calendar';
import Header from '@components/Header.vue';

import { ref, onMounted, watchEffect } from 'vue'
import { auth } from '@/helpers'
import moment from 'moment'


const companies = ref([])
let company_selected = ref('')

const date = ref()
let clients = ref([])
let client_id = ref(-1)

function format_date(date) {
	return moment(date).format('DD.MM.YYYY')
}

onMounted(async () => {
	await fetch_companies()
	console.log(format_date(date.value))
})

watchEffect(async () => {
	await fetch_clients(company_selected.value, format_date(date.value))
})


async function fetch_companies() {
	let data = await auth.get('get_companies')
	if (data === null) return

	companies.value = data
	let values = Object.keys(companies.value).map((key) => companies.value[key])
	company_selected.value = values[1]
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
			client_id: el.client_id,
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

			<!-- {{ company_selected }}<br> -->
			<!-- {{ format_date(date) }};<br> -->
			<!-- {{ date }} -->
			<Calendar class="mb-2" v-model="date" inline dateFormat="dd.MM.YYYY" />

			<div class="overflow-y-auto">
				<div v-for="(item, idx) in clients" class="border border-gray-500 rounded-lg p-2 mt-4 cursor-pointer"
					:class="{ 'bg-gray-200 dark:bg-gray-700': client_id === idx }" @click="client_id = idx">
					<div class="border-b border-gray-400 mb-1">{{ item.time_start }} - {{ item.time_end }}</div>
					<div class="mb-2">{{ item.service }}</div>
					<div>{{ item.name }}</div>
				</div>
			</div>
		</div>
		<div class="w-5/6">
			<Header name="Ханов Рамиль Юсупович" />

			<div class="px-5 py-2">
				<div v-if="client_id >= 0 && clients.length > 0" class="mb-1">Клинет: {{ clients[client_id].name }}</div>
				<RouterLink to="/worker/history" active-class="font-bold">
					<PrimaryBtn class="me-8 mb-5">История посещений</PrimaryBtn>
				</RouterLink>

				<RouterLink to="/worker/medcard" active-class="font-bold">
					<PrimaryBtn>Медкарта</PrimaryBtn>
				</RouterLink>

				<div class="border rounded-lg p-4 ">
					<RouterView />
				</div>

			</div>
		</div>
	</div>
</template>
