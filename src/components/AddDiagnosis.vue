<script setup>
const props = defineProps(['services', 'client_id', 'callback'])

import { ref, onMounted } from 'vue'
import { auth } from '@/helpers'

let diagnosis_text = ref('')
let service = ref('')
let employee_id = ref('')

let empoyees = ref([])

onMounted(async () => {
	let data = await auth.get('get_all_employees')
	if (data === null) return
	empoyees.value = data.filter((el) => el.is_admin === false)
})

async function add_diagnosis(client_id, text, empoyee_id, service) {
	let data = await auth.post('add_diagnosis', {
		body: JSON.stringify({
			client_id: client_id,
			text: text,
			by_empoyee_id: empoyee_id,
			service_name: service,
		})
	})
	if (data === null) return

	if (data.error === "") {
		props.callback()
	}
}
</script>

<template>
	<textarea v-model="diagnosis_text" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700" id="text"
		name="content" rows="3">Новый диагноз</textarea>

	<select v-model="service" class="px-2 py-1 rounded-lg dark:bg-gray-700 me-5 mt-4">
		<option disabled value="" selected>Выбрать услугу</option>
		<option v-for="el in services" class="" :value="el">{{ el }}</option>
	</select>

	<select v-model="employee_id" class="px-2 py-1 rounded-lg dark:bg-gray-700 me-5">
		<option disabled value="" selected>Выбрать сотрудника</option>
		<option v-for="el in empoyees" class="" :value="el.id">{{ el.full_name }}</option>
	</select>

	<PrimaryBtn @click="add_diagnosis(client_id, diagnosis_text, employee_id, service)" class="block mb-5">Добавить</PrimaryBtn>
</template>
