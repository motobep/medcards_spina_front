<script setup>
import { ref } from 'vue'
const props = defineProps(['client_id', 'medcard_id', 'services', 'employees'])
let service = ref('')
let employee_id = ref('')

async function add_diagnosis(client_id, employee_id, service) {
	let data = await auth.post('add_diagnosis', {
		body: JSON.stringify({
			client_id: client_id,
			text: '',
			by_employee_id: employee_id,
			service_name: service,
		})
	})
	if (data === null) return

	if (data.error === "") {
		
	}
}
</script>

<template>
	<div>
			<span @click="toggleComplaints" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Жалобы</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showComplaints" class="border rounded-lg p-3">
					<HealthComplaints :medcard_id="medcard_id" :client_id="client_id"/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleSomanticStatus" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Сомантический статус</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showSomanticStatus" class="border rounded-lg p-3">
					<SomanticStatus :medcard_id="medcard_id" :client_id="client_id"/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleGeneralExamination" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Общий осмотр</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showGeneralExamination" class="border rounded-lg p-3">
					<GeneralExamination :medcard_id="medcard_id" :client_id="client_id"/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleDetailedDiagnosis" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Диагнозы</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showDetailedDiagnosis" class="border rounded-lg p-3">
					<DetailedDiagnosis :medcard_id="medcard_id" :client_id="client_id"/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleTreatmentPlan" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">План лечения</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showTreatmentPlan" class="border rounded-lg p-3">
					<TreatmentPlan :medcard_id="medcard_id" :client_id="client_id"/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleAdditional" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Дополнительно</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showAdditional" class="border rounded-lg p-3">
					<Additional :medcard_id="medcard_id" :client_id="client_id"/>
				</div>
			</transition>
			<div class="mb-4"/>
			
			<div class="mb-4">Выберите услугу</div>

			<v-select  v-model="service" color="primary" :options="services" class="px-2 py-1 rounded-lg me-5 mb-3 mt-4 dark:bg-gray-700 dark:text-black">
			</v-select>

			<select v-model="employee_id" class="px-2 py-1 rounded-lg dark:bg-gray-700 me-5">
				<option disabled value="" selected>Выбрать сотрудника</option>
				<option v-for="el in employees" class="" :value="el.id">{{ el.full_name }}</option>
			</select>

			<PrimaryBtn @click="add_diagnosis(client_id, employee_id, service)" class="block mb-5">Добавить</PrimaryBtn>
	</div>
</template>

<script>
	import HealthComplaints from '@/components/HealthComplaints.vue';
	import SomanticStatus from '@/components/SomanticStatus.vue';
	import GeneralExamination from './GeneralExamination.vue';
	import DetailedDiagnosis from './DetailedDiagnosis.vue';
	import TreatmentPlan from './TreatmentPlan.vue';
	import Additional from './Additional.vue';
	import PrimaryBtn from './buttons/PrimaryBtn.vue';
	import { auth } from '@/helpers'

	export default {
		name: 'App',
		components: {
			HealthComplaints,
			SomanticStatus,
			GeneralExamination,
			DetailedDiagnosis,
			TreatmentPlan,
			Additional,
		},
		data() {
			return {
				showComplaints: false,
				showSomanticStatus: false,
				showGeneralExamination: false,
				showDetailedDiagnosis: false,
				showTreatmentPlan: false,
				showAdditional: false,
			};
		},
		methods: {
			toggleComplaints() {
				this.showComplaints = !this.showComplaints;
			},
			toggleSomanticStatus() {
				this.showSomanticStatus = !this.showSomanticStatus;
			},
			toggleGeneralExamination() {
				this.showGeneralExamination = !this.showGeneralExamination;
			},
			toggleDetailedDiagnosis() {
				this.showDetailedDiagnosis = !this.showDetailedDiagnosis;
			},
			toggleTreatmentPlan() {
				this.showTreatmentPlan = !this.showTreatmentPlan;
			},
			toggleAdditional() {
				this.showAdditional = !this.showAdditional;
			},
		},
	};
</script>

<style scoped>


</style>
