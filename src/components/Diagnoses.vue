<script setup>
const props = defineProps(['data', 'fetch_appointments', 'fetch_diagnoses'])

import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import { auth } from '@/helpers';
const delete_endpoint = 'delete_diagnosis';
import { useClientStore } from '@/stores/auth';
import { computed } from 'vue'

const clientStore = useClientStore()

let client_id = computed(() => {
	let c = clientStore.client
	return c?.id
})


async function delete_diagnosis(client_id, diagnosis_id) {
	let json_data = await auth.post(delete_endpoint, {
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			diagnosis_id: diagnosis_id,
		})
	})

	if (json_data === null) return;
	
	if (json_data.error === "") {
		await props.fetch_diagnoses()
		await props.fetch_appointments()
	}

}

</script>

<template>
	<table v-if="data.length > 0" class="table-bordered table-gapped">
		<thead>
			<tr>
				<td>№</td>
				<td>Дата</td>
				<td>Сотрудник</td>
				<td>Текст</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="entity in data">
				<td>{{ entity.id }}</td>
				<td>{{ entity.created_at }}</td>
				<td>{{ entity.creator_name }}</td>
				<td>{{ entity.text }}</td>
				<td><Button icon="pi pi-trash" @click="delete_diagnosis(client_id, entity.id)" /></td>
			</tr>
		</tbody>
	</table>
	<div v-else>-</div>
</template>
