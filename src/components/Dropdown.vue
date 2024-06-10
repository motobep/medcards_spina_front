<template>
	<div>
	
			<span @click="toggleComplaints" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Жалобы</span>
			<div class="mb-4 animated"/>
			<transition name="slide">
				<div v-if="showComplaints" class="border rounded-lg p-3">
					<HealthComplaints/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleSomanticStatus" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Сомантический статус</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showSomanticStatus" class="border rounded-lg p-3">
					<SomanticStatus/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleGeneralExamination" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Общий осмотр</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showGeneralExamination" class="border rounded-lg p-3">
					<GeneralExamination/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleDiagnosis" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Диагнозы</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showDiagnosis" class="border rounded-lg p-3">
					<Diagnosis/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleTreatmentPlan" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">План лечения</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showTreatmentPlan" class="border rounded-lg p-3">
					<TreatmentPlan/>
				</div>
			</transition>
			<div class="mb-4"/>

			<span @click="toggleAdditional" icon='pi-arrow-down' class="text-lg font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg cursor-pointer">Дополнительно</span>
			<div class="mb-4"/>
			<transition name="slide">
				<div v-if="showAdditional" class="border rounded-lg p-3">
					<Additional/>
				</div>
			</transition>
			<div class="mb-4"/>

	</div>
</template>

<script>
	import HealthComplaints from '@/components/HealthComplaints.vue';
	import SomanticStatus from '@/components/SomanticStatus.vue';
	import GeneralExamination from './GeneralExamination.vue';
	import Diagnosis from './Diagnosis.vue';
	import TreatmentPlan from './TreatmentPlan.vue';
	import Additional from './Additional.vue';

	export default {
		name: 'App',
		components: {
			HealthComplaints,
			SomanticStatus,
			GeneralExamination,
			Diagnosis,
			TreatmentPlan,
			Additional,
		},
		data() {
			return {
				showComplaints: false,
				showSomanticStatus: false,
				showGeneralExamination: false,
				showDiagnosis: false,
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
			toggleDiagnosis() {
				this.showDiagnosis = !this.showDiagnosis;
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

