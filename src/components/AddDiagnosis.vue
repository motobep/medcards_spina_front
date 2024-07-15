<script setup>
const props = defineProps(['services', 'client_id', 'callback'])

import { ref, onMounted } from 'vue'
import { auth } from '@/helpers'
import 'vue-select/dist/vue-select.css';

let diagnosis_text = ref('')
let service = ref('')
let employee_id = ref('')

let employees = ref([])

onMounted(async () => {
	let data = await auth.get('get_all_employees')
	if (data === null) return
	employees.value = data.filter((el) => el.is_admin === 0)
})

async function add_diagnosis(client_id, text, employee_id, service) {
	let data = await auth.post('add_diagnosis', {
		body: JSON.stringify({
			client_id: client_id,
			text: text,
			by_employee_id: employee_id,
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
	<div>
		<v-select  v-model="service" color="primary" :options="services" class="px-2 py-1 rounded-lg me-5 mb-3 mt-4 dark:bg-gray-700 dark:text-black">
		</v-select>

		<select v-model="employee_id" class="px-2 py-1 rounded-lg dark:bg-gray-700 me-5">
			<option disabled value="" selected>Выбрать сотрудника</option>
			<option v-for="el in employees" class="" :value="el.id">{{ el.full_name }}</option>
		</select>

		<PrimaryBtn @click="add_diagnosis(client_id, diagnosis_text, employee_id, service)" class="block mb-5">Добавить</PrimaryBtn>
	</div>
</template>
