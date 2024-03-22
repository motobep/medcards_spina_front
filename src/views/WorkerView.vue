<script setup>
import Calendar from 'primevue/calendar';
import Header from '@components/Header.vue';

import { ref, onMounted } from 'vue'
import { auth } from '@/helpers'
import moment from 'moment'


const list = [
	'Spina Муштари',
	'Spina Муштари',
	'Spina Муштари',
]

const date = ref('19/03/24')
let clients = ref([])
let clientId = ref(-1)

onMounted(async () => {
	let data = await auth.post('get_employee_schedule', {
		body: JSON.stringify({
			company_id: "242652",
			date: '18.03.2024',
		})
	})

	if (data === null) return

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
})
</script>
<template>
	<div class="flex">
		<div class="w-80 px-2 border-e-2 pt-4 flex flex-col h-screen">
			<select class="px-2 py-1 mb-3 rounded-lg dark:bg-gray-700">
				<option v-for="(el, idx) in list" class="" value="el" :selected="idx === 0">{{ el }}</option>
			</select>

			<Calendar class="mb-2" v-model="date" inline dateFormat="dd/mm/yy" />

			<div class="overflow-y-auto">
				<div v-for="(item, idx) in clients" class="border border-gray-500 rounded-lg p-2 mt-4 cursor-pointer"
					:class="{ 'bg-gray-200 dark:bg-gray-700': clientId === idx }" @click="clientId = idx">
					<div class="border-b border-gray-400 mb-1">{{ item.time_start }} - {{ item.time_end }}</div>
					<div class="mb-2">{{ item.service }}</div>
					<div>{{ item.name }}</div>
				</div>
			</div>
		</div>
		<div class="w-5/6">
			<Header name="Ханов Рамиль Юсупович" />

			<div class="px-5 py-2">
				<div v-if="clientId >= 0 && clients.length > 0" class="mb-1">Клинет: {{ clients[clientId].name }}</div>
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
