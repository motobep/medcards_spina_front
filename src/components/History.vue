<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { auth } from '@/helpers'
import { authStore, useClientStore } from '@/stores/auth'
import moment from 'moment'

const clientStore = useClientStore()

let history = ref([])

let company_id = authStore.get('company_id')

watchEffect(async () => {
	if (!company_id || !clientStore.client) return

	let client_id = clientStore.client.id
	await fetch_history(company_id, client_id)
})

async function fetch_history(company_id, client_id) {
	let data = await auth.post('get_client_history',
		{
			body: JSON.stringify({
				company_id: company_id,
				client_id: client_id
			})
		}
	)

	if (data === null) return
	history.value = data.sort((a, b) => {
		if (a.timestamp > b.timestamp) return -1
		if (a.timestamp < b.timestamp) return 1
		return 0
	})
}

let statuses = {
	'-1': 'Не пришёл',
	'0': 'Ожидание',
	'1': 'Пришёл',
	'2': 'Подтвердил',
}
</script>

<template>
	<table class="table-bordered">
		<thead>
			<tr>
				<td class="px-4">Дата</td>
				<td class="px-4">Сотрудник</td>
				<td class="px-4">Статус</td>
				<td class="px-4">Услуга</td>
				<td class="px-4">Действия</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="el in history">
				<td class="px-4">{{ moment.unix(el.timestamp).format('DD.MM.YYYY') }}</td>
				<td class="px-4">{{ el.staff.name }}</td>
				<td class="px-4">{{ statuses[el.attendance] }}</td>
				<td class="px-4">{{ el.services && el.services.length > 0 ? el.services[0].title : '-' }}</td>
				<td class="px-4">
					<PrimaryBtn v-if="el.employee_id > -1" class="mb-2"
						@click="$router.push(`/worker/history/medcard?date=${el.timestamp}&employee_id=${el.employee_id}`)">Посмотреть
						медкарту</PrimaryBtn>
				</td>
			</tr>
		</tbody>
	</table>
</template>
