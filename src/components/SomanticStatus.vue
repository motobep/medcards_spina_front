<script setup>
import { computed, onMounted, ref } from 'vue';
import { auth } from '@/helpers'
const props = defineProps(['client_id', 'medcard_id'])


let general_status = ref(null);
let body_type = ref(null);
const skin = ref([]);
const mucous = ref([]);
const breath = ref([]);
let abdomen_tension = ref(null);
let abdomen_pain = ref(null);
let wheeze = ref(null);
let weight = ref(0);
let height = ref(0);
let blood_pressure = ref(0);
let pulse = ref(0);
let body_temp = ref(0);

async function save(medcard_id) {
  let data = await auth.post('save_somantic_status', {
    body: JSON.stringify({
		general_status: general_status.value,
		body_type: body_type.value,
		skin: skin.value,
		mucous: mucous.value,
		breath: breath.value,
		abdomen_tension: abdomen_tension.value,
		abdomen_pain: abdomen_pain.value,
		wheeze: wheeze.value,
		weight: Number(weight.value),
		height: Number(height.value),
		blood_pressure: Number(blood_pressure.value),
		pulse: Number(pulse.value),
		body_temp: Number(body_temp.value),
		body_mass_index: Number(body_mass_index.value),
		medcard_id: medcard_id
    }),
  });
  if (data === null) return;

}

async function fetch_somantic_status(medcard_id) {
	const data = await auth.post('get_somantic_status', {
		body: JSON.stringify({
			medcard_id: medcard_id,
		}),
	});

	if (data === null) {
		return;
	}

	if (data.length == 0) {
		return;
	}

	general_status.value = data.general_status;
	body_type.value = data.body_type;
	if (data.skin.length !== null) skin.value = data.skin;
	if (data.mucous.length !== null) mucous.value = data.mucous;
	if (data.breath.length !== null) breath.value = data.breath;
	abdomen_tension.value = data.abdomen_tension;
	abdomen_pain.value = data.abdomen_pain;
	wheeze.value = data.wheeze;
	weight.value = data.weight;
	height.value = data.height;
	blood_pressure.value = data.blood_pressure;
	pulse.value = data.pulse;
	body_temp.value = data.body_temp;
  
}



let body_mass_index = computed(() => {
	return (weight.value / (height.value/100)**2).toFixed(2);
})



onMounted(async () => {
	await fetch_somantic_status(props.medcard_id)
})


</script>

<template>
	<div @click="console.log(general_status)">
		<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Общее состояние: </div>
			<div class="flex items-center me-3">
				<input v-model="general_status" :value="null" :id="'gen_health_status_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_health_status' + props.medcard_id" />
				<label :for="'gen_health_status_none' + props.medcard_id" class="ms-2">Не выбрано</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="general_status" :value="'satisfactory'" :id="'gen_health_status_satisfactory' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_health_status' + props.medcard_id" />
				<label :for="'gen_health_status_satisfactory' + props.medcard_id" class="ms-2">Удовлетворительно</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="general_status" :value="'moderate'" :id="'gen_health_status_moderate' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_health_status' + props.medcard_id" />
				<label :for="'gen_health_status_moderate' + props.medcard_id" class="ms-2">Средней тяжести</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="general_status" :value="'severe'" :id="'gen_health_status_severe' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_health_status' + props.medcard_id" />
				<label :for="'gen_health_status_severe' + props.medcard_id" class="ms-2">Тяжёлое</label>
			</div>

		</div>

		<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Тип телосложения: </div>
			<div class="flex items-center me-3">
				<input v-model="body_type" :value="null" :id="'body_type_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'body_type' + props.medcard_id" />
				<label :for="'body_type_none' + props.medcard_id" class="ms-2">Не выбрано</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="body_type" :value="'norm'"  :id="'body_type_norm' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'body_type' + props.medcard_id" />
				<label :for="'body_type_norm' + props.medcard_id" class="ms-2">Нормостенический</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="body_type" :value="'hyper'"  :id="'body_type_hyper' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'body_type' + props.medcard_id" />
				<label :for="'body_type_hyper' + props.medcard_id" class="ms-2">Гиперстенический</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="body_type" :value="'asthenic'"  :id="'body_type_asthenic' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'body_type' + props.medcard_id" />
				<label :for="'body_type_asthenic' + props.medcard_id" class="ms-2">Астенический</label>
			</div>
		</div>

		<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Кожные покровы: </div>
			<div class="flex items-center me-3">
				<input v-model="skin" :value="'clean'" :id="'skin_clean' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
				<label :for="'skin_clean' + props.medcard_id" class="ms-2">Чистые</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="skin" :value="'rash'" :id="'skin_rash' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
				<label :for="'skin_rash' + props.medcard_id" class="ms-2">Высыпания</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="skin" :value="'moist'" :id="'skin_moist' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
				<label :for="'skin_moist' + props.medcard_id" class="ms-2">Влажные</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="skin" :value="'dry'" :id="'skin_dry' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
				<label :for="'skin_dry' + props.medcard_id" class="ms-2">Сухие</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="skin" :value="'excoriations'" :id="'skin_excoriations' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'skin_condition' + props.medcard_id" />
				<label :for="'skin_excoriations' + props.medcard_id" class="ms-2">Экскориации</label>
			</div>
		</div>

		<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Слизистые оболочки: </div>
			<div class="flex items-center me-3">
				<input v-model="mucous" :value="'clean'" :id="'mucous_clean' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'mucous_condition' + props.medcard_id" />
				<label :for="'mucous_clean' + props.medcard_id" class="ms-2">Чистые</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="mucous" :value="'rash'" :id="'mucous_rash' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'mucous_condition' + props.medcard_id" />
				<label :for="'mucous_rash' + props.medcard_id" class="ms-2">Высыпания</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="mucous" :value="'moist'" :id="'mucous_moist' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'mucous_condition' + props.medcard_id" />
				<label :for="'mucous_moist' + props.medcard_id" class="ms-2">Влажные</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="mucous" :value="'dry'" :id="'mucous_dry' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'mucous_condition' + props.medcard_id" />
				<label :for="'mucous_dry' + props.medcard_id" class="ms-2">Сухие</label>
			</div>
		</div>

		<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Дыхание: </div>
			<div class="flex items-center me-6">
				<input v-model="breath" :value="'vesicular'" :id="'breath_vesicular' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'breath' + props.medcard_id" />
				<label :for="'breath_vesicular' + props.medcard_id" class="ms-2">Везикулярное</label>
			</div>
			<div class="flex items-center me-6">
				<input v-model="breath" :value="'puerile'" :id="'breath_puerile' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'breath' + props.medcard_id" />
				<label :for="'breath_puerile' + props.medcard_id" class="ms-2">Пуэрильное</label>
			</div>
			<div class="flex items-center me-6">
				<input v-model="breath" :value="'hard'" :id="'breath_hard' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'breath' + props.medcard_id" />
				<label :for="'breath_hard' + props.medcard_id" class="ms-2">Жёсткое</label>
			</div>
			<div class="flex items-center me-6">
				<input v-model="breath" :value="'weakened'" :id="'breath_weakened' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" :name="'breath' + props.medcard_id" />
				<label :for="'breath_weakened' + props.medcard_id" class="ms-2">Ослабленное</label>
			</div>
		</div>

		<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Живот: </div>
            <div class="relative flex items-center me-3">
				<input v-model="abdomen_tension" :value="null" type="radio" :id="'abdomen_none' + props.medcard_id" :name="'abdomen' + props.medcard_id"  class="hidden peer/abdomen_none" />
                <label :for="'abdomen_none' + props.medcard_id" class="cursor-pointer peer-checked/abdomen_none:border-white-500 peer-checked/abdomen_none:border-b-2">Не выбрано</label>
				
				<span>/</span>

                <input v-model="abdomen_tension" :value="false" type="radio" :id="'amdomen_soft' + props.medcard_id" :name="'abdomen' + props.medcard_id"  class="hidden peer/amdomen_soft" />
                <label :for="'amdomen_soft' + props.medcard_id" class="cursor-pointer peer-checked/amdomen_soft:border-white-500 peer-checked/amdomen_soft:border-b-2">Мягкий</label>

                <span>/</span>

                <input v-model="abdomen_tension" :value="true" type="radio" :id="'abdomen_tense' + props.medcard_id" :name="'abdomen' + props.medcard_id"  class="hidden peer/abdomen_tense" />
                <label :for="'abdomen_tense' + props.medcard_id" class="cursor-pointer peer-checked/abdomen_tense:dark:border-white-500 peer-checked/abdomen_tense:border-b-2">Напряжён</label>
            </div>
            <div class="relative flex items-center me-3">
				<input v-model="abdomen_pain" :value="null" type="radio" :id="'abdomen_pain_none' + props.medcard_id" :name="'abdomen_pain_status' + props.medcard_id"  class="hidden peer/abdomen_pain_none" />
                <label :for="'abdomen_pain_none' + props.medcard_id" class="cursor-pointer peer-checked/abdomen_pain_none:border-white-500 peer-checked/abdomen_pain_none:border-b-2">Не выбрано</label>
				
				<span>/</span>

                <input v-model="abdomen_pain" :value="false" type="radio" :id="'abdomen_not_pain' + props.medcard_id" :name="'abdomen_pain_status' + props.medcard_id"  class="hidden peer/abdomen_not_pain" />
                <label :for="'abdomen_not_pain' + props.medcard_id" class="cursor-pointer peer-checked/abdomen_not_pain:border-white-500 peer-checked/abdomen_not_pain:border-b-2">Безболезненный</label>

                <span>/</span>

                <input v-model="abdomen_pain" :value="true" type="radio" :id="'ambdomen_pain' + props.medcard_id" :name="'abdomen_pain_status' + props.medcard_id"  class="hidden peer/ambdomen_pain" />
                <label :for="'ambdomen_pain' + props.medcard_id" class="cursor-pointer peer-checked/ambdomen_pain:dark:border-white-500 peer-checked/ambdomen_pain:border-b-2">Болезненный</label>
            </div>
		</div>

		<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<label class="w-2/5 sm:w-1/5">Хрипы: </label>
			<div class="flex items-center me-10">
				<input v-model="wheeze" :value="null" :id="'wheeze_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'wheeze' + props.medcard_id" />
				<label :for="'wheeze_none' + props.medcard_id" class="ms-2">Не выбрано</label>
			</div>

			<div class="flex items-center me-10">
				<input v-model="wheeze" :value="'no'" :id="'wheeze_no' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'wheeze' + props.medcard_id" />
				<label :for="'wheeze_no' + props.medcard_id" class="ms-2">Нет</label>
			</div>
			<div class="flex items-center me-10">
				<input v-model="wheeze" :value="'wet'" :id="'wheeze_wet' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'wheeze' + props.medcard_id" />
				<label :for="'wheeze_wet' + props.medcard_id" class="ms-2">Влажные</label>
			</div>
			<div class="flex items-center me-10">
				<input v-model="wheeze" :value="'dry'" :id="'wheeze_dry' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'wheeze' + props.medcard_id" />
				<label :for="'wheeze_dry' + props.medcard_id" class="ms-2">Сухие</label>
			</div>
		</div>

		<div class="mb-2"></div>
		<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label :for="'blood_pressure' + props.medcard_id" class="me-5">АД</label>
			<div class="relative flex items-center">
				<input v-model="blood_pressure" :id="'blood_pressure' + props.medcard_id" type="text" class="bg-transparent border-none focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label :for="'blood_pressure' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">мм.рт.ст</span>
		</div>

		<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label :for="'pulse' + props.medcard_id" class="me-5">Пульс</label>
			<div class="relative flex items-center">
				<input v-model="pulse" :id="'pulse' + props.medcard_id" type="text" class="bg-transparent border-none focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label :for="'pulse' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">.</span>
		</div>

		<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label :for="'body_temp' + props.medcard_id" class="me-5">Температура тела</label>
			<div class="relative flex items-center">
				<input v-model="body_temp" :id="'body_temp' + props.medcard_id" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label :for="'body_temp' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">C.</span>
		</div>

		<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label :for="'weight' + props.medcard_id" class="me-5">Вес</label>
			<div class="relative flex items-center">
				<input v-model="weight" :id="'weight' + props.medcard_id" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label :for="'weight' + props.medcard_id" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">кг.</span>
		</div>

		<div class="flex items-center mb-0 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label :for="'height' + props.medcard_id" class="me-5">Рост</label>
			<div class="relative flex items-center">
				<input v-model="height" :id="'height' + props.medcard_id" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
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

		<div class="flex justify-end">
			<PrimaryBtn @click="save(medcard_id)" class="block mb-0	 content-end">Сохранить</PrimaryBtn>
		</div>
	</div>
</template>

