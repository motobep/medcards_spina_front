<script setup>
const props = defineProps(['data', 'fetch_appointments', 'fetch_diagnoses'])

import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import { auth } from '@/helpers';
import { useClientStore } from '@/stores/auth';
import { computed, ref} from 'vue'

const delete_endpoint = 'delete_diagnosis';
const update_endpoint = 'update_diagnosis';

const clientStore = useClientStore()
let editedText = ref('');
let editedTodo = ref(-1);

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

async function save_diagnosis(diagnosis_id, text) {
		let json_data = await auth.post(update_endpoint, {
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			diagnosis_id: diagnosis_id,
			text: text,
		})
	})

	if (json_data === null) return;
	
	if (json_data.error === "") {
		await props.fetch_diagnoses()
		await props.fetch_appointments()
	}
}

function edit_diagnosis_text(i) {
	props.data[i].text = editedText;
	editedTodo = ref(-1);
	editedText = ref('');
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
				<td>Действия</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(entity, i) in data">
				<td>{{ entity.id }}</td>
				<td>{{ entity.created_at }}</td>
				<td>{{ entity.creator_name }}</td>
				<td @dblclick = "editedTodo = i; editedText = entity.text;">
					<label v-show = "editedTodo != i"> {{ entity.text }} </label>
					<textarea class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700" v-if = "editedTodo == i" v-model = "editedText" @keyup.enter = "edit_diagnosis_text(i);" v-on:blur= "edit_diagnosis_text(i)"/>
				</td>
				<td><Button icon="pi pi-trash" @click="delete_diagnosis(client_id, entity.id)" /> | <Button icon="pi pi-save" @click="save_diagnosis(entity.id, entity.text)" /></td>
			</tr>
		</tbody>
	</table>
	<div v-else>-</div>
</template>
