<script setup>
import { auth } from '@/helpers'
import { ref, onMounted } from 'vue';
const props = defineProps(['client_id', 'medcard_id'])


let musculoskeletal_dysfunction = ref(false);
let respiratory_system_dysfunction = ref(false);
let gastrointestinal_tract_dysfunction = ref(false);
let urinary_and_reproductive_systems_dysfunction = ref(false);
let cardiovascular_dysfunction = ref(false);
let pain_syndrome = ref(false);
let additional_text = ref('');

async function save(
  medcard_id,
  musculoskeletal_dysfunction,
  respiratory_system_dysfunction,
  gastrointestinal_tract_dysfunction,
  urinary_and_reproductive_systems_dysfunction,
  cardiovascular_dysfunction,
  pain_syndrome,
  additional_text) {
  let data = await auth.post('save_health_complaints', {
    body: JSON.stringify({
      medcard_id: medcard_id,
      musculoskeletal_dysfunction: musculoskeletal_dysfunction,
      respiratory_system_dysfunction: respiratory_system_dysfunction,
      gastrointestinal_tract_dysfunction: gastrointestinal_tract_dysfunction,
      urinary_and_reproductive_systems_dysfunction: urinary_and_reproductive_systems_dysfunction,
      cardiovascular_dysfunction: cardiovascular_dysfunction,
      pain_syndrome: pain_syndrome,
      additional_text: additional_text,
    }),
  });
  if (data === null) return;

}

async function fetch_health_complaints(client_id, medcard_id) {
	let data = await auth.post('get_health_complaints', {
		body: JSON.stringify({
			yclients_client_id: client_id,
      medcard_id: medcard_id,
		})
	})
	if (data === null) return;

  if (data.length == 0) {
		return;
	}
	
	musculoskeletal_dysfunction.value = data.musculoskeletal_dysfunction;
	respiratory_system_dysfunction.value = data.respiratory_system_dysfunction;
	gastrointestinal_tract_dysfunction.value = data.gastrointestinal_tract_dysfunction;
	urinary_and_reproductive_systems_dysfunction.value = data.urinary_and_reproductive_systems_dysfunction;
	cardiovascular_dysfunction.value = data.cardiovascular_dysfunction;
	pain_syndrome.value = data.pain_syndrome;
	additional_text.value = data.additional_text;
}

onMounted(async () => {
	await fetch_health_complaints(props.client_id, props.medcard_id)
})
</script>

<template>
  <div>
    <div class="mb-2"></div>
    <input
      type="checkbox"
      :id="'checkbox1' + props.medcard_id"
      v-model="musculoskeletal_dysfunction"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label :for="'checkbox1' + props.medcard_id" class="ms-2">Нарушение функции опорно-двигательного аппарата</label>

    <div class="mb-2"></div>
    <input
      type="checkbox"
      :id="'checkbox2' + props.medcard_id"
      v-model="respiratory_system_dysfunction"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label :for="'checkbox2' + props.medcard_id" class="ms-2">Нарушение функции дыхательной системы</label>

    <div class="mb-2"></div>
    <input
      type="checkbox"
      :id="'checkbox3' + props.medcard_id"
      v-model="gastrointestinal_tract_dysfunction"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label :for="'checkbox3' + props.medcard_id" class="ms-2">Нарушение функции органов желудочно-кишечного тракта</label>

    <div class="mb-2"></div>
    <input
      type="checkbox"
      :id="'checkbox4' + props.medcard_id"
      v-model="urinary_and_reproductive_systems_dysfunction"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label :for="'checkbox4' + props.medcard_id" class="ms-2">Нарушение функции мочевыделительной и половой систем</label>

    <div class="mb-2"></div>
    <input
      type="checkbox"
      :id="'checkbox5' + props.medcard_id"
      v-model="cardiovascular_dysfunction"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label :for="'checkbox5' + props.medcard_id" class="ms-2">Нарушение функции сердечно-сосудистой системы</label>

    <div class="mb-2"></div>
    <input
      type="checkbox"
      :id="'checkbox6' + props.medcard_id"
      v-model="pain_syndrome"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label :for="'checkbox6' + props.medcard_id" class="ms-2">Болевой синдром</label>

    <div class="mb-4"></div>

    <textarea
      v-model="additional_text"
      class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"
      placeholder="Дополнительно"
    ></textarea>

		<div class="mb-2"></div>
		<div class="flex justify-end">
			<PrimaryBtn  @click="save(medcard_id,
			 musculoskeletal_dysfunction,
			  respiratory_system_dysfunction,
  gastrointestinal_tract_dysfunction,
  urinary_and_reproductive_systems_dysfunction,
  cardiovascular_dysfunction,
  pain_syndrome,
  additional_text)" class="block mb-5 content-end">Сохранить</PrimaryBtn>
		</div>
		
	</div>
</template>

<style>
</style>
