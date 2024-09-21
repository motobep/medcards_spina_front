<script setup>
import { auth } from '@/helpers'
import { ref, onMounted } from 'vue';
const props = defineProps(['client_id', 'medcard_id'])


let additional_text = ref('');

async function save(
  medcard_id,
  additional_text) {
  let data = await auth.post('save_health_complaints', {
    body: JSON.stringify({
      medcard_id: medcard_id,
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
	
	additional_text.value = data.additional_text;
}

onMounted(async () => {
	await fetch_health_complaints(props.client_id, props.medcard_id)
})
</script>

<template>
  <div>
    <!-- <v-tabs
      
      show-arrows>
      <v-tab>01.02.2024</v-tab>
      <v-tab>02.02.2024</v-tab>
      <v-tab>03.02.2024</v-tab>
      <v-tab>04.02.2024</v-tab>
      <v-tab>05.02.2024</v-tab>
      <v-tab>06.02.2024</v-tab>
      <v-tab>07.02.2024</v-tab>
      <v-tab>08.02.2024</v-tab>
      <v-tab>09.02.2024</v-tab>
      <v-tab>10.02.2024</v-tab>
      <v-tab>11.02.2024</v-tab>
      <v-tab>12.02.2024</v-tab>

    </v-tabs> -->

    <div class="mb-0"></div>

    <textarea
      v-model="additional_text"
      class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"
      placeholder="Дополнительно"
    ></textarea>

    <div class="mb-0"></div>
		<div class="flex justify-end">
			<PrimaryBtn  @click="save(medcard_id, additional_text)" class="block mb-0 content-end">Сохранить</PrimaryBtn>
		</div>
		
	</div>
</template>
