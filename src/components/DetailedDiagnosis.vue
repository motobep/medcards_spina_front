<script setup>
import { onMounted, ref } from 'vue';
import { auth } from '@/helpers'
const props = defineProps(['client_id', 'medcard_id'])

const doctors_report = ref('');
const complications = ref('');
const related_diseases = ref('');

async function save(medcard_id) {
  let data = await auth.post('save_detailed_diagnosis', {
    headers: {
			'Content-Type': 'application/json',
		},
    body: JSON.stringify({
        medcard_id: medcard_id,
		    doctors_report: doctors_report.value,
        complications: complications.value,
        related_diseases: related_diseases.value,
    }),
  });

    if (data === null) return;
}

async function fetch_detailed_diagnosis(medcard_id) {
	let data = await auth.post('get_detailed_diagnosis', {
		body: JSON.stringify({
			medcard_id: medcard_id,
		})
	})
	if (data === null) return;

  if (data.length == 0) {
		return;
	}
	
	doctors_report.value = data.doctors_report;
	complications.value = data.complications;
	related_diseases.value = data.related_diseases;
}

onMounted(async () => {
	await fetch_detailed_diagnosis(props.medcard_id)
})


</script>


<template>
    <div>
        <div class="font-bold mb-4">Заключение</div>
        <textarea v-model="doctors_report" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"/>
        <div class="mb-0"/>

        <div class="font-bold mb-4">Осложнение</div>
        <textarea v-model="complications" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"/>
        <div class="mb-0"/>

        <div class="font-bold mb-4">Сопутствующие заболевания</div>
        <textarea v-model="related_diseases" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"/>
        <div class="mb-0"/>

        <div class="flex justify-end">
			<PrimaryBtn @click="save(medcard_id)" class="block mb-0 content-end">Сохранить</PrimaryBtn>
		</div>
    </div>
</template>