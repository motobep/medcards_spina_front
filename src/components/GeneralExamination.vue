<script setup>
import { auth } from '@/helpers'
import { ref, onMounted, computed } from 'vue';
import moment from 'moment'

const props = defineProps(['client_id', 'medcard_id'])

const examinations = ref([]);
const selected_examination_id = ref(null);

const selected_examination = computed(() => {
  return examinations.value.find(exam => exam.id === selected_examination_id.value) || null;
});


async function save_general_examination(medcard_id, exam) {
  if (!exam) return; // Проверка на наличие объекта exam, чтобы избежать ошибок

  let data = await auth.post('save_general_examination', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      medcard_id: medcard_id,
      cervical_lordosis: exam.cervical_lordosis,
      thoracic_kyphosis: exam.thoracic_kyphosis,
      lumbar_lordosis: exam.lumbar_lordosis,
      muscle_tone_symmetry: exam.muscle_tone_symmetry,
      general_inflection_limitation: exam.general_inflection_limitation,
      general_inflection_spine: exam.general_inflection_spine,
      general_extension_limitation: exam.general_extension_limitation,
      general_extension_spine: exam.general_extension_spine,
      lateroflexion_left_limitation: exam.lateroflexion_left_limitation,
      lateroflexion_left_spine: exam.lateroflexion_left_spine,
      lateroflexion_right_limitation: exam.lateroflexion_right_limitation,
      lateroflexion_right_spine: exam.lateroflexion_right_spine,
    }),
  });

  await fetch_general_examination(medcard_id)
}



async function fetch_general_examination(medcard_id) {
  const response = await auth.post('get_general_examination', {
    body: JSON.stringify({
      medcard_id: medcard_id,
    }),
  });

  if (response === null || !Array.isArray(response)) {
    generalExaminations.value = [];
    selected_general_exam_id.value = null;
    return;
  }


  // Заполняем generalExaminations всеми полученными данными
  examinations.value = response.map((item) => ({
	id: item.id,
	medcard_id: item.medcard_id,
	cervical_lordosis: item.cervical_lordosis ?? null,
	thoracic_kyphosis: item.thoracic_kyphosis ?? null,
	lumbar_lordosis: item.lumbar_lordosis ?? null,
	muscle_tone_symmetry: item.muscle_tone_symmetry ?? null,
	general_inflection_limitation: item.general_inflection_limitation ?? null,
	general_inflection_spine: item.general_inflection_spine ?? null,
	general_extension_limitation: item.general_extension_limitation ?? null,
	general_extension_spine: item.general_extension_spine ?? null,
	lateroflexion_left_limitation: item.lateroflexion_left_limitation ?? null,
	lateroflexion_left_spine: item.lateroflexion_left_spine ?? null,
	lateroflexion_right_limitation: item.lateroflexion_right_limitation ?? null,
	lateroflexion_right_spine: item.lateroflexion_right_spine ?? null,
	created_at: moment.unix(item.created_at).format('DD.MM.YYYY HH:mm:ss'), // Форматируем дату
  }));

  // Добавляем в массив новый пустой осмотр для создания новой записи
  examinations.value.push({
    id: -1,
    medcard_id: medcard_id,
    cervical_lordosis: null,
    thoracic_kyphosis: null,
    lumbar_lordosis: null,
    muscle_tone_symmetry: null,
    general_inflection_limitation: null,
    general_inflection_spine: null,
    general_extension_limitation: null,
    general_extension_spine: null,
    lateroflexion_left_limitation: null,
    lateroflexion_left_spine: null,
    lateroflexion_right_limitation: null,
    lateroflexion_right_spine: null,
    created_at: 'Новый',
  });

  // Устанавливаем выбранный осмотр на последний в списке (новый) по умолчанию
  if (examinations.value.length > 0 && selected_general_exam_id.value === null) {
		selected_general_exam_id.value = examinations.value[examinations.value.length - 1].id;
  }	
}

async function delete_general_examination(exam) {
  if (!exam) return;

    const response = await auth.get('delete_general_examination?' + new URLSearchParams({
      id: exam.id
    }));


    await fetch_general_examination(props.medcard_id);
 
}

onMounted(async () => {
	await fetch_general_examination(props.medcard_id)
});

</script>

<template>
    <div>
		<v-tabs
			show-arrows
			v-model="selected_examination_id"
			>
			<v-tab
				v-for="examination in examinations"
				:key="examination.id"
				:value="examination.id"
			>
				{{ examination.created_at }}
			</v-tab>
		</v-tabs>
		<div v-if="selected_examination != null">
			<div class="font-bold mb-0">Изгибы позвоночника в саггитальной плоскости: </div>
			<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<div class="w-2/5 sm:w-1/5">Шейный лордоз: </div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.cervical_lordosis" :value="null" :id="'cervical_lordosis_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'cervical_lordosis_status' + props.medcard_id"/>
					<label :for="'cervical_lordosis_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.cervical_lordosis" :value="'preserved'"  :id="'cervical_lordosis_preserved' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'cervical_lordosis_status' + props.medcard_id"/>
					<label :for="'cervical_lordosis_preserved' + props.medcard_id" class="ms-2">Сохранён</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.cervical_lordosis" :value="'smoothed'"  :id="'cervical_lordosis_smoothed' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'cervical_lordosis_status' + props.medcard_id"/>
					<label :for="'cervical_lordosis_smoothed' + props.medcard_id" class="ms-2">Сглажен</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.cervical_lordosis" :value="'enhanced'"  :id="'cervical_lordosis_enhanced' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'cervical_lordosis_status' + props.medcard_id"/>
					<label :for="'cervical_lordosis_enhanced' + props.medcard_id" class="ms-2">Усилен</label>
				</div>
			</div>

			<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<div class="w-2/5 sm:w-1/5">Грудной кифоз: </div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.thoracic_kyphosis" :value="null" :id="'thoracic_kyphosis_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'thoracic_kyphosis_status' + props.medcard_id"/>
					<label :for="'thoracic_kyphosis_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.thoracic_kyphosis" :value="'preserved'" :id="'thoracic_kyphosis_preserved' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'thoracic_kyphosis_status' + props.medcard_id"/>
					<label :for="'thoracic_kyphosis_preserved' + props.medcard_id" class="ms-2">Сохранён</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.thoracic_kyphosis" :value="'smoothed'" :id="'thoracic_kyphosis_smoothed' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'thoracic_kyphosis_status' + props.medcard_id"/>
					<label :for="'thoracic_kyphosis_smoothed' + props.medcard_id" class="ms-2">Сглажен</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.thoracic_kyphosis" :value="'enhanced'" :id="'thoracic_kyphosis_enhanced' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'thoracic_kyphosis_status' + props.medcard_id"/>
					<label :for="'thoracic_kyphosis_enhanced' + props.medcard_id" class="ms-2">Усилен</label>
				</div>
			</div>

			<div class="mb-0 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<div class="w-2/5 sm:w-1/5">Поясничный лордоз: </div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.lumbar_lordosis" :value="null" :id="'lumbar_lordosis_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lumbar_lordosis_status' + props.medcard_id"/>
					<label :for="'lumbar_lordosis_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.lumbar_lordosis" :value="'preserved'" :id="'lumbar_lordosis_preserved' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lumbar_lordosis_status' + props.medcard_id"/>
					<label :for="'lumbar_lordosis_preserved' + props.medcard_id" class="ms-2">Сохранён</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.lumbar_lordosis" :value="'smoothed'" :id="'lumbar_lordosis_smoothed' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lumbar_lordosis_status' + props.medcard_id"/>
					<label :for="'lumbar_lordosis_smoothed' + props.medcard_id" class="ms-2">Сглажен</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.lumbar_lordosis" :value="'enhanced'" :id="'lumbar_lordosis_enhanced' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lumbar_lordosis_status' + props.medcard_id"/>
					<label :for="'lumbar_lordosis_enhanced' + props.medcard_id" class="ms-2">Усилен</label>
				</div>
			</div>

			
			<div class="mb-2"/>
			<div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<label class="w-2/5 sm:w-1/5 font-bold" :for="'general' + props.medcard_id">Мышечный тонус: </label>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.muscle_tone_symmetry" :value="null" :id="'muscle_tone_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'muscle_tone_type' + props.medcard_id"/>
					<label :for="'muscle_tone_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.muscle_tone_symmetry" :value="false" :id="'muscle_tone_symmetric' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'muscle_tone_type' + props.medcard_id"/>
					<label :for="'muscle_tone_symmetric' + props.medcard_id" class="ms-2">Симметричный</label>
				</div>
				<div class="flex items-center me-3">
					<input v-model="selected_examination.muscle_tone_symmetry" :value="true" :id="'muscle_tone_asymmetric' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'muscle_tone_type' + props.medcard_id"/>
					<label :for="'muscle_tone_asymmetric' + props.medcard_id" class="ms-2">Асимметричный</label>
				</div>
			</div>

			<div class="mb-2"/>
			<div class="font-bold mb-0">Активные тесты: </div>
			
			<div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<label class="w-1/5 sm:w-1/5" :for="'general' + props.medcard_id">Общая флексия: </label>
				<div class="relative flex items-center space-x-4 me-3">
					<input v-model="selected_examination.general_inflection_limitation" :value="null" type="radio" :id="'general_inflection_limitation_none' + props.medcard_id" :name="'general_inflection' + props.medcard_id" class="hidden peer/general_inflection_limitation_none" />
					<label :for="'general_inflection_limitation_none' + props.medcard_id" class="cursor-pointer peer-checked/general_inflection_limitation_none:border-white-500 peer-checked/general_inflection_limitation_none:border-b-2">Не выбрано</label>

					<span>/</span>
					
					<input v-model="selected_examination.general_inflection_limitation" :value="false" type="radio" :id="'general_inflection_not_limited' + props.medcard_id" :name="'general_inflection' + props.medcard_id" class="hidden peer/general_inflection_not_limited" />
					<label :for="'general_inflection_not_limited' + props.medcard_id" class="cursor-pointer peer-checked/general_inflection_not_limited:border-white-500 peer-checked/general_inflection_not_limited:border-b-2">Не ограничена</label>

					<span>/</span>

					<input v-model="selected_examination.general_inflection_limitation" :value="true" type="radio" :id="'general_inflection_limited' + props.medcard_id" :name="'general_inflection' + props.medcard_id" class="hidden peer/general_inflection_limited" />
					<label :for="'general_inflection_limited' + props.medcard_id" class="cursor-pointer peer-checked/general_inflection_limited:dark:border-white-500 peer-checked/general_inflection_limited:border-b-2">Ограничена</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.general_inflection_spine" :value="null" :id="'gen_inflection_spine_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_inflection_spine' + props.medcard_id"/>
					<label :for="'gen_inflection_spine_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.general_inflection_spine" :value="'cervical'" :id="'gen_inflection_cervical_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_inflection_spine' + props.medcard_id"/>
					<label :for="'gen_inflection_cervical_spine' + props.medcard_id" class="ms-2">Шоп</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.general_inflection_spine" :value="'throatic'" :id="'gen_inflection_thoracic_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_inflection_spine' + props.medcard_id"/>
					<label :for="'gen_inflection_thoracic_spine' + props.medcard_id" class="ms-2">Гоп</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.general_inflection_spine" :value="'lumbar'" :id="'gen_inflection_lumbar_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_inflection_spine' + props.medcard_id"/>
					<label :for="'gen_inflection_lumbar_spine' + props.medcard_id" class="ms-2">Поп</label>
				</div>
			
			</div>

			<div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<label class="w-1/5 sm:w-1/5" :for="'general' + props.medcard_id">Общая экстензия: </label>
				<div class="relative flex items-center space-x-4 me-3">
					<input v-model="selected_examination.general_extension_limitation" :value="null" type="radio" :id="'general_extension_limitation_none' + props.medcard_id" :name="'general_extension' + props.medcard_id" class="hidden peer/general_extension_limitation_none" />
					<label :for="'general_extension_limitation_none' + props.medcard_id" class="cursor-pointer peer-checked/general_extension_limitation_none:border-white-500 peer-checked/general_extension_limitation_none:border-b-2">Не выбрано</label>

					<span>/</span>
					
					<input v-model="selected_examination.general_extension_limitation" :value="false" type="radio" :id="'general_extension_not_limited' + props.medcard_id" :name="'general_extension' + props.medcard_id" class="hidden peer/general_extension_not_limited" />
					<label :for="'general_extension_not_limited' + props.medcard_id" class="cursor-pointer peer-checked/general_extension_not_limited:border-white-500 peer-checked/general_extension_not_limited:border-b-2">Не ограничена</label>

					<span>/</span>

					<input v-model="selected_examination.general_extension_limitation" :value="true" type="radio" :id="'general_extension_limited' + props.medcard_id" :name="'general_extension' + props.medcard_id" class="hidden peer/general_extension_limited" />
					<label :for="'general_extension_limited' + props.medcard_id" class="cursor-pointer peer-checked/general_extension_limited:dark:border-white-500 peer-checked/general_extension_limited:border-b-2">Ограничена</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.general_extension_spine" :value="null" :id="'gen_extension_spine_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_extension_spine' + props.medcard_id"/>
					<label :for="'gen_extension_spine_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.general_extension_spine" :value="'cervical'" :id="'gen_extension_cervical_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_extension_spine' + props.medcard_id"/>
					<label :for="'gen_extension_cervical_spine' + props.medcard_id" class="ms-2">Шоп</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.general_extension_spine" :value="'thoracic'" :id="'gen_extension_thoracic_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_extension_spine' + props.medcard_id"/>
					<label :for="'gen_extension_thoracic_spine' + props.medcard_id" class="ms-2">Гоп</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.general_extension_spine" :value="'lumbar'" :id="'gen_extension_lumbar_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'gen_extension_spine' + props.medcard_id"/>
					<label :for="'gen_extension_lumbar_spine' + props.medcard_id" class="ms-2">Поп</label>
				</div>
			
			</div>

			<div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<label class="w-1/5 sm:w-1/5" :for="'general' + props.medcard_id">Латерофлексия влево: </label>
				<div class="relative flex items-center space-x-4 me-3">
					<input v-model="selected_examination.lateroflexion_left_limitation" :value="null" type="radio" :id="'lateroflexion_left_limitation_none' + props.medcard_id" :name="'lateroflexion_to_the_left' + props.medcard_id" class="hidden peer/lateroflexion_left_limitation_none" />
					<label :for="'lateroflexion_left_limitation_none' + props.medcard_id" class="cursor-pointer peer-checked/lateroflexion_left_limitation_none:border-white-500 peer-checked/lateroflexion_left_limitation_none:border-b-2">Не выбрано</label>

					<span>/</span>

					<input v-model="selected_examination.lateroflexion_left_limitation" :value="false" type="radio" :id="'lateroflexion_to_the_left_not_limited' + props.medcard_id" :name="'lateroflexion_to_the_left' + props.medcard_id" class="hidden peer/lateroflexion_to_the_left_not_limited" />
					<label :for="'lateroflexion_to_the_left_not_limited' + props.medcard_id" class="cursor-pointer peer-checked/lateroflexion_to_the_left_not_limited:border-white-500 peer-checked/lateroflexion_to_the_left_not_limited:border-b-2">Не ограничена</label>

					<span>/</span>

					<input v-model="selected_examination.lateroflexion_left_limitation" :value="true" type="radio" :id="'lateroflexion_to_the_left_limited' + props.medcard_id" :name="'lateroflexion_to_the_left' + props.medcard_id" class="hidden peer/lateroflexion_to_the_left_limited" />
					<label :for="'lateroflexion_to_the_left_limited' + props.medcard_id" class="cursor-pointer peer-checked/lateroflexion_to_the_left_limited:dark:border-white-500 peer-checked/lateroflexion_to_the_left_limited:border-b-2">Ограничена</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.lateroflexion_left_spine" :value="null" :id="'lateroflexion_left_spine_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lateroflexion_left_spine' + props.medcard_id"/>
					<label :for="'lateroflexion_left_spine_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.lateroflexion_left_spine" :value="'cervical'" :id="'lateroflexion_to_the_left_cervical_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lateroflexion_left_spine' + props.medcard_id"/>
					<label :for="'lateroflexion_to_the_left_cervical_spine' + props.medcard_id" class="ms-2">Шоп</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.lateroflexion_left_spine" :value="'thoracic'" :id="'lateroflexion_to_the_left_thoracic_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lateroflexion_left_spine' + props.medcard_id"/>
					<label :for="'lateroflexion_to_the_left_thoracic_spine' + props.medcard_id" class="ms-2">Гоп</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.lateroflexion_left_spine" :value="'lumbar'" :id="'lateroflexion_to_the_left_lumbar_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lateroflexion_left_spine' + props.medcard_id"/>
					<label :for="'lateroflexion_to_the_left_lumbar_spine' + props.medcard_id" class="ms-2">Поп</label>
				</div>
			
			</div>

			<div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
				<label class="w-1/5 sm:w-1/5" :for="'general' + props.medcard_id">Латерофлексия вправо: </label>
				<div class="relative flex items-center space-x-4 me-3">
					<input v-model="selected_examination.lateroflexion_right_limitation" :value="null" type="radio" :id="'lateroflexion_right_limitation_none' + props.medcard_id" :name="'lateroflexion_to_the_right' + props.medcard_id" class="hidden peer/lateroflexion_right_limitation_none" />
					<label :for="'lateroflexion_right_limitation_none' + props.medcard_id" class="cursor-pointer peer-checked/lateroflexion_right_limitation_none:border-white-500 peer-checked/lateroflexion_right_limitation_none:border-b-2">Не выбрано</label>

					<span>/</span>

					<input v-model="selected_examination.lateroflexion_right_limitation" :value="false" type="radio" :id="'lateroflexion_to_the_right_not_limited' + props.medcard_id" :name="'lateroflexion_to_the_right' + props.medcard_id" class="hidden peer/lateroflexion_to_the_right_not_limited" />
					<label :for="'lateroflexion_to_the_right_not_limited' + props.medcard_id" class="cursor-pointer peer-checked/lateroflexion_to_the_right_not_limited:border-white-500 peer-checked/lateroflexion_to_the_right_not_limited:border-b-2">Не ограничена</label>

					<span>/</span>

					<input v-model="selected_examination.lateroflexion_right_limitation" :value="true" type="radio" :id="'lateroflexion_to_the_right_limited' + props.medcard_id" :name="'lateroflexion_to_the_right' + props.medcard_id" class="hidden peer/lateroflexion_to_the_right_limited" />
					<label :for="'lateroflexion_to_the_right_limited' + props.medcard_id" class="cursor-pointer peer-checked/lateroflexion_to_the_right_limited:dark:border-white-500 peer-checked/lateroflexion_to_the_right_limited:border-b-2">Ограничена</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.lateroflexion_right_spine" :value="null" :id="'lateroflexion_right_spine_none' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lateroflexion_right_spine' + props.medcard_id"/>
					<label :for="'lateroflexion_right_spine_none' + props.medcard_id" class="ms-2">Не выбрано</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.lateroflexion_right_spine" :value="'cervical'" :id="'lateroflexion_to_the_right_cervical_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lateroflexion_right_spine' + props.medcard_id"/>
					<label :for="'lateroflexion_to_the_right_cervical_spine' + props.medcard_id" class="ms-2">Шоп</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.lateroflexion_right_spine" :value="'thoracic'" :id="'lateroflexion_to_the_right_thoracic_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lateroflexion_right_spine' + props.medcard_id"/>
					<label :for="'lateroflexion_to_the_right_thoracic_spine' + props.medcard_id" class="ms-2">Гоп</label>
				</div>

				<div class="flex items-center me-3">
					<input v-model="selected_examination.lateroflexion_right_spine" :value="'lumbar'" :id="'lateroflexion_to_the_right_lumbar_spine' + props.medcard_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" :name="'lateroflexion_right_spine' + props.medcard_id"/>
					<label :for="'lateroflexion_to_the_right_lumbar_spine' + props.medcard_id" class="ms-2">Поп</label>
				</div>
			
			</div>

			<div v-if="selected_examination_id !== null && selected_examination_id === -1" class="flex justify-end">
				<PrimaryBtn 
				@click="save_general_examination(props.medcard_id, selected_examination)" 
				class="block mb-0 content-end"
				:disabled="selected_examination === null"
				>
				Добавить
				</PrimaryBtn>
			</div>
			<div v-else class="flex justify-end">
				<PrimaryBtn 
				@click="delete_general_examination(selected_examination)" 
				class="block mb-0 content-end"
				:disabled="selected_examination === null"
				>
				Удалить
				</PrimaryBtn>
			</div>
		</div>
		<div v-else class="text-gray-500 p-3">
      		Пожалуйста, выберите осмотр из списка.
    	</div>


    </div>
</template>

<style scoped>
</style>