<script setup>
import { onMounted, ref } from 'vue';
import { auth } from '@/helpers'
const props = defineProps(['medcard_id'])

const performed_manipulations = ref(null);
const upcoming_manipulations = ref(null);

async function save(medcard_id) {
  let data = await auth.post('save_treatment_plan', {
    headers: {
			'Content-Type': 'application/json',
		},
    body: JSON.stringify({
        medcard_id: medcard_id,
        performed_manipulations: performed_manipulations.value,
        upcoming_manipulations: upcoming_manipulations.value,

    }),
  });

    if (data === null) return;
}

async function fetch_treatment_plan(medcard_id) {
	let data = await auth.post('get_treatment_plan', {
		body: JSON.stringify({
			medcard_id: medcard_id,
		})
	})
	if (data === null) return;

    if (data.length == 0) {
            return;
    }
	
	performed_manipulations.value = data.performed_manipulations;
	upcoming_manipulations.value = data.upcoming_manipulations;
}

onMounted(async () => {
	await fetch_treatment_plan(props.medcard_id)
})
</script>


<template>
    <div>
        <div class="font-bold mb-4">Проведённые манипуляции</div>
        <textarea v-model="performed_manipulations" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"/>
        <div class="mb-4"/>

        <div class="font-bold mb-4">Предстоящие манипуляции</div>
        <textarea v-model="upcoming_manipulations" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"/>
        <div class="mb-4"/>

        <div class="flex justify-end">
			<PrimaryBtn @click="save(medcard_id)" class="block mb-5 content-end">Сохранить</PrimaryBtn>
		</div>
    </div>
</template>