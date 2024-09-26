<script setup>
import { computed, onMounted, ref } from 'vue';
import { auth } from '@/helpers'
const props = defineProps(['client_id', 'medcard_id'])
import moment from 'moment'

const statuses = ref([])
const selected_status_id = ref(null)

const selected_status = computed(() => {
  return statuses.value.find(s => s.id === selected_status_id.value) || null;
});




let body_mass_index = computed(() => {
	return (selected_status.value.weight / (selected_status.value.height/100)**2).toFixed(2);
})

async function save_somantic_status(medcard_id, status) {
	if (!status) return;
	let data = await auth.post('save_somantic_status', {
		body: JSON.stringify({
			general_status: status.general_status,
			body_type: status.body_type,
			skin: status.skin,
			mucous: status.mucous,
			breath: status.breath,
			abdomen_tension: status.abdomen_tension,
			abdomen_pain: status.abdomen_pain,
			wheeze: status.wheeze,
			weight: Number(status.weight),
			height: Number(status	.height),
			blood_pressure: Number(status.blood_pressure),
			pulse: Number(status.pulse),
			body_temp: Number(status.body_temp),
			body_mass_index: Number(body_mass_index.value),
			medcard_id: medcard_id
		}),
	});
  	
	await fetch_somantic_status(medcard_id);
}

async function fetch_somantic_status(medcard_id) {
	const response = await auth.post('get_somantic_status', {
		body: JSON.stringify({
			medcard_id: medcard_id,
		}),
	});

	if (response === null || !Array.isArray(response)) {
		statuses.value = [];
		selected_status_id.value = null;
		return;
	}

	// Заполняем statuses всеми полученными данными
	statuses.value = response.map((item) => ({
		id: item.id,
		medcard_id: item.medcard_id,
		general_status: item.general_status || null,
		body_type: item.body_type || null,
		skin: item.skin || [],
		mucous: item.mucous || [],
		breath: item.breath || [],
		abdomen_tension: item.abdomen_tension || null,
		abdomen_pain: item.abdomen_pain || null,
		wheeze: item.wheeze || null,
		weight: item.weight || null,
		height: item.height || null,
		blood_pressure: item.blood_pressure || null,
		pulse: item.pulse || null,
		body_temp: item.body_temp || null,
		created_at: moment.unix(item.created_at).format('DD.MM.YYYY HH:mm:ss'), // Форматируем дату
	}));

	// Добавляем в массив новый пустой статус для создания новой записи
	statuses.value.push({
		id: -1,
		medcard_id: medcard_id,
		general_status: null,
		body_type: null,
		skin: [],
		mucous: [],
		breath: [],
		abdomen_tension: null,
		abdomen_pain: null,
		wheeze: null,
		weight: null,
		height: null,
		blood_pressure: null,
		pulse: null,
		body_temp: null,
		created_at: 'Новый',
	});

	// Устанавливаем выбранный статус на последний в списке (новый) по умолчанию
	if (statuses.value.length > 0 && selected_status_id.value === null) {
		selected_status_id.value = statuses.value[statuses.value.length - 1].id;
	}
}

async function delete_somantic_status(status) {
  if (!status) return;

    const response = await auth.get('delete_somantic_status?' + new URLSearchParams({
      id: status.id
    }));

    // После сохранения обновляем список жалоб
    await fetch_somantic_status(props.medcard_id);
 
}



onMounted(async () => {
	await fetch_somantic_status(props.medcard_id)
})


</script>

<template>
	<div @click="console.log(selected_status)">
		 <!-- Вкладки для отображения жалоб по датам -->
		 <v-tabs
			show-arrows
			v-model="selected_status_id"
			>
			<v-tab
				v-for="status in statuses"
				:key="status.id"
				:value="status.id"
			>
				{{ status.created_at }}
			</v-tab>
		</v-tabs>
		<div v-if="selected_status !== null">
			<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<div class="w-2/5 sm:w-1/5" >Общее состояние: </div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.general_status" :value="null" :id="'gen_health_status_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_health_status' + props.medcard_id" />
					<label :for="'gen_health_status_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.general_status" :value="'satisfactory'" :id="'gen_health_status_satisfactory' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_health_status' + props.medcard_id" />
					<label :for="'gen_health_status_satisfactory' + props.medcard_id" class="ms-2">Удовлетворительно</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.general_status" :value="'moderate'" :id="'gen_health_status_moderate' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_health_status' + props.medcard_id" />
					<label :for="'gen_health_status_moderate' + props.medcard_id" class="ms-2">Средней тяжести</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.general_status" :value="'severe'" :id="'gen_health_status_severe' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_health_status' + props.medcard_id" />
					<label :for="'gen_health_status_severe' + props.medcard_id" class="ms-2">Тяжёлое</label>
				</div>

			</div>

			<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<div class="w-2/5 sm:w-1/5" >Тип телосложения: </div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.body_type" :value="null" :id="'body_type_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'body_type' + props.medcard_id" />
					<label :for="'body_type_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.body_type" :value="'norm'"  :id="'body_type_norm' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'body_type' + props.medcard_id" />
					<label :for="'body_type_norm' + props.medcard_id" class="ms-2">Нормостенический</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.body_type" :value="'hyper'"  :id="'body_type_hyper' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'body_type' + props.medcard_id" />
					<label :for="'body_type_hyper' + props.medcard_id" class="ms-2">Гиперстенический</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.body_type" :value="'asthenic'"  :id="'body_type_asthenic' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'body_type' + props.medcard_id" />
					<label :for="'body_type_asthenic' + props.medcard_id" class="ms-2">Астенический</label>
				</div>
			</div>

			<div  class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<div class="w-2/5 sm:w-1/5" >Кожные покровы: </div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.skin" :value="'clean'" :id="'skin_clean' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
					<label :for="'skin_clean' + props.medcard_id" class="ms-2">Чистые</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.skin" :value="'rash'" :id="'skin_rash' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
					<label :for="'skin_rash' + props.medcard_id" class="ms-2">Высыпания</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.skin" :value="'moist'" :id="'skin_moist' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
					<label :for="'skin_moist' + props.medcard_id" class="ms-2">Влажные</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.skin" :value="'dry'" :id="'skin_dry' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
					<label :for="'skin_dry' + props.medcard_id" class="ms-2">Сухие</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.skin" :value="'excoriations'" :id="'skin_excoriations' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
					<label :for="'skin_excoriations' + props.medcard_id" class="ms-2">Экскориации</label>
				</div>
			</div>

			<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<div class="w-2/5 sm:w-1/5" >Слизистые оболочки: </div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.mucous" :value="'clean'" :id="'mucous_clean' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'mucous_condition' + props.medcard_id" />
					<label :for="'mucous_clean' + props.medcard_id" class="ms-2">Чистые</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.mucous" :value="'rash'" :id="'mucous_rash' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'mucous_condition' + props.medcard_id" />
					<label :for="'mucous_rash' + props.medcard_id" class="ms-2">Высыпания</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.mucous" :value="'moist'" :id="'mucous_moist' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'mucous_condition' + props.medcard_id" />
					<label :for="'mucous_moist' + props.medcard_id" class="ms-2">Влажные</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_status.mucous" :value="'dry'" :id="'mucous_dry' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'mucous_condition' + props.medcard_id" />
					<label :for="'mucous_dry' + props.medcard_id" class="ms-2">Сухие</label>
				</div>
			</div>

			<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<div class="w-2/5 sm:w-1/5" >Дыхание: </div>
				<div class="flex items-center me-6">
					<input v-model="selected_status.breath" :value="'vesicular'" :id="'breath_vesicular' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'breath' + props.medcard_id" />
					<label :for="'breath_vesicular' + props.medcard_id" class="ms-2">Везикулярное</label>
				</div>
				<div class="flex items-center me-6">
					<input v-model="selected_status.breath" :value="'puerile'" :id="'breath_puerile' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'breath' + props.medcard_id" />
					<label :for="'breath_puerile' + props.medcard_id" class="ms-2">Пуэрильное</label>
				</div>
				<div class="flex items-center me-6">
					<input v-model="selected_status.breath" :value="'hard'" :id="'breath_hard' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'breath' + props.medcard_id" />
					<label :for="'breath_hard' + props.medcard_id" class="ms-2">Жёсткое</label>
				</div>
				<div class="flex items-center me-6">
					<input v-model="selected_status.breath" :value="'weakened'" :id="'breath_weakened' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'breath' + props.medcard_id" />
					<label :for="'breath_weakened' + props.medcard_id" class="ms-2">Ослабленное</label>
				</div>
			</div>

			<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<div class="w-2/5 sm:w-1/5" >Живот: </div>
				<div class="relative flex items-center me-3">
					<input v-model="selected_status.abdomen_tension" :value="null" type="radio" :id="'abdomen_none' + props.medcard_id" :name="'abdomen' + props.medcard_id"  class="hidden peer/abdomen_none" />
					<label :for="'abdomen_none' + props.medcard_id" class="cursor-pointer peer-checked/abdomen_none:border-white-500 peer-checked/abdomen_none:border-b-2">Не выбрано</label>
					
					<span>/</span>

					<input v-model="selected_status.abdomen_tension" :value="false" type="radio" :id="'amdomen_soft' + props.medcard_id" :name="'abdomen' + props.medcard_id"  class="hidden peer/amdomen_soft" />
					<label :for="'amdomen_soft' + props.medcard_id" class="cursor-pointer peer-checked/amdomen_soft:border-white-500 peer-checked/amdomen_soft:border-b-2">Мягкий</label>

					<span>/</span>

					<input v-model="selected_status.abdomen_tension" :value="true" type="radio" :id="'abdomen_tense' + props.medcard_id" :name="'abdomen' + props.medcard_id"  class="hidden peer/abdomen_tense" />
					<label :for="'abdomen_tense' + props.medcard_id" class="cursor-pointer peer-checked/abdomen_tense:dark:border-white-500 peer-checked/abdomen_tense:border-b-2">Напряжён</label>
				</div>
				<div class="relative flex items-center me-3">
					<input v-model="selected_status.abdomen_pain" :value="null" type="radio" :id="'abdomen_pain_none' + props.medcard_id" :name="'abdomen_pain_status' + props.medcard_id"  class="hidden peer/abdomen_pain_none" />
					<label :for="'abdomen_pain_none' + props.medcard_id" class="cursor-pointer peer-checked/abdomen_pain_none:border-white-500 peer-checked/abdomen_pain_none:border-b-2">Не выбрано</label>
					
					<span>/</span>

					<input v-model="selected_status.abdomen_pain" :value="false" type="radio" :id="'abdomen_not_pain' + props.medcard_id" :name="'abdomen_pain_status' + props.medcard_id"  class="hidden peer/abdomen_not_pain" />
					<label :for="'abdomen_not_pain' + props.medcard_id" class="cursor-pointer peer-checked/abdomen_not_pain:border-white-500 peer-checked/abdomen_not_pain:border-b-2">Безболезненный</label>

					<span>/</span>

					<input v-model="selected_status.abdomen_pain" :value="true" type="radio" :id="'ambdomen_pain' + props.medcard_id" :name="'abdomen_pain_status' + props.medcard_id"  class="hidden peer/ambdomen_pain" />
					<label :for="'ambdomen_pain' + props.medcard_id" class="cursor-pointer peer-checked/ambdomen_pain:dark:border-white-500 peer-checked/ambdomen_pain:border-b-2">Болезненный</label>
				</div>
			</div>

			<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<label class="w-2/5 sm:w-1/5">Хрипы: </label>
				<div class="flex items-center me-10">
					<input v-model="selected_status.wheeze" :value="null" :id="'wheeze_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'wheeze' + props.medcard_id" />
					<label :for="'wheeze_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>

				<div class="flex items-center me-10">
					<input v-model="selected_status.wheeze" :value="'no'" :id="'wheeze_no' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'wheeze' + props.medcard_id" />
					<label :for="'wheeze_no' + props.medcard_id" class="ms-2">Нет</label>
				</div>
				<div class="flex items-center me-10">
					<input v-model="selected_status.wheeze" :value="'wet'" :id="'wheeze_wet' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'wheeze' + props.medcard_id" />
					<label :for="'wheeze_wet' + props.medcard_id" class="ms-2">Влажные</label>
				</div>
				<div class="flex items-center me-10">
					<input v-model="selected_status.wheeze" :value="'dry'" :id="'wheeze_dry' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'wheeze' + props.medcard_id" />
					<label :for="'wheeze_dry' + props.medcard_id" class="ms-2">Сухие</label>
				</div>
			</div>

			<div class="mb-2"></div>
			<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
				<label :for="'blood_pressure' + props.medcard_id" class="me-5">АД</label>
				<div class="relative flex items-center">
					<input v-model="selected_status.blood_pressure" :id="'blood_pressure' + props.medcard_id" type="text" class="bg-transparent border-none focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
					<label :for="'blood_pressure' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
				</div>
				<span class="ml-2">мм.рт.ст</span>
			</div>

			<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
				<label :for="'pulse' + props.medcard_id" class="me-5">Пульс</label>
				<div class="relative flex items-center">
					<input v-model="selected_status.pulse" :id="'pulse' + props.medcard_id" type="text" class="bg-transparent border-none focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
					<label :for="'pulse' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
				</div>
				<span class="ml-2">.</span>
			</div>

			<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
				<label :for="'body_temp' + props.medcard_id" class="me-5">Температура тела</label>
				<div class="relative flex items-center">
					<input v-model="selected_status.body_temp" :id="'body_temp' + props.medcard_id" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
					<label :for="'body_temp' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
				</div>
				<span class="ml-2">C.</span>
			</div>

			<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
				<label :for="'weight' + props.medcard_id" class="me-5">Вес</label>
				<div class="relative flex items-center">
					<input v-model="selected_status.weight" :id="'weight' + props.medcard_id" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
					<label :for="'weight' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
				</div>
				<span class="ml-2">кг.</span>
			</div>

			<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
				<label :for="'height' + props.medcard_id" class="me-5">Рост</label>
				<div class="relative flex items-center">
					<input v-model="selected_status.height" :id="'height' + props.medcard_id" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
					<label :for="'height' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
				</div>
				<span class="ml-2">см.</span>
			</div>

			<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
				<label :for="'body_mass_index' + props.medcard_id" class="me-5">ИМТ</label>
				<div class="relative flex items-center">
					<input v-model="body_mass_index" :id="'body_mass_index' + props.medcard_id" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
					<label :for="'body_mass_index' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
				</div>
				<span class="ml-2">.</span>
			</div>

			<div v-if="selected_status_id !== null && selected_status_id === -1" class="flex justify-end">
				<PrimaryBtn 
				@click="save_somantic_status(props.medcard_id, selected_status)" 
				class="block mb-0 content-end"
				:disabled="selected_status === null"
				>
				Добавить
				</PrimaryBtn>
			</div>
			<div v-else class="flex justify-end">
				<PrimaryBtn 
				@click="delete_somantic_status(selected_status)" 
				class="block mb-0 content-end"
				:disabled="selected_status === null"
				>
				Удалить
				</PrimaryBtn>
			</div>
		</div>
		<div v-else class="text-gray-500 p-3">
			Пожалуйста, выберите статус из списка.
		</div>
	</div>
</template>

