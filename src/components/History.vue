<script setup>
// 	[
// 	['14/11/23', 'Ханов', 'Ожидание', 'Коррекция'],
// 	['14/10/23', 'Ханов 2', 'Ожидание 2', 'Коррекция 2'],
// ]


import { ref, onMounted, watchEffect } from 'vue'
import { auth } from '@/helpers'

let history = ref([])

let company_id = sessionStorage.getItem('company_id')
let client = sessionStorage.getItem('client')

onMounted(async () => {
	if (!company_id || !client) return

	let client_id = JSON.parse(client).id
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
	history.value = data
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
				<td class="px-4">Мед арты</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="el in history">
				<td class="px-4">{{ el.date }}</td>
				<td class="px-4">{{ el.staff.name }}</td>
				<td class="px-4">{{ el.attendance }}</td>
				<td class="px-4">{{ el.services[0].title }}</td>
				<td class="px-4">
					<PrimaryBtn class="mb-2" @click="$emit('showCard')">Посмотреть медкарту</PrimaryBtn>
				</td>
			</tr>
		</tbody>
	</table>
</template>
