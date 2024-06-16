<script setup>
import { auth } from '@/helpers'
import { ref, onMounted } from 'vue';
const props = defineProps(['client_id'])

const cervical_lordosis = ref(null);
const thoracic_kyphosis = ref(null);
const lumbar_lordosis = ref(null);
const muscle_tone_symmetry = ref(null);
const general_inflection_limitation = ref(null);
const general_inflection_spine = ref(null);
const general_extension_limitation = ref(null);
const general_extension_spine = ref(null);
const lateroflexion_left_limitation = ref(null);
const lateroflexion_left_spine = ref(null);
const lateroflexion_right_limitation = ref(null);
const lateroflexion_right_spine = ref(null);

async function save(client_id) {
  let data = await auth.post('save_general_examination', {
    headers: {
			'Content-Type': 'application/json',
		},
    	body: JSON.stringify({
			yclients_client_id: client_id,
			cervical_lordosis: cervical_lordosis.value,
			thoracic_kyphosis: thoracic_kyphosis.value,
			lumbar_lordosis: lumbar_lordosis.value,
			muscle_tone_symmetry: muscle_tone_symmetry.value,
			general_inflection_limitation: general_inflection_limitation.value,
			general_inflection_spine: general_inflection_spine.value,
			general_extension_limitation: general_extension_limitation.value,
			general_extension_spine: general_extension_spine.value,
			lateroflexion_left_limitation: lateroflexion_left_limitation.value,
			lateroflexion_left_spine: lateroflexion_left_spine.value,
			lateroflexion_right_limitation: lateroflexion_right_limitation.value,
			lateroflexion_right_spine: lateroflexion_right_spine.value,
    }),
  });

    if (data === null) return;
}


async function fetch_general_examination(client_id) {
	let data = await auth.post('get_general_examination', {
		body: JSON.stringify({
			yclients_client_id: client_id,
		})
	})
	if (data === null) return;

	if (data.length == 0) {
		return;
	}
	
	cervical_lordosis.value = data.cervical_lordosis;
    thoracic_kyphosis.value = data.thoracic_kyphosis;
    lumbar_lordosis.value = data.lumbar_lordosis;
    muscle_tone_symmetry.value = data.muscle_tone_symmetry;
    general_inflection_limitation.value = data.general_inflection_limitation;
    general_inflection_spine.value = data.general_inflection_spine;
    general_extension_limitation.value = data.general_extension_limitation;
    general_extension_spine.value = data.general_extension_spine;
    lateroflexion_left_limitation.value = data.lateroflexion_left_limitation;
    lateroflexion_left_spine.value = data.lateroflexion_left_spine;
    lateroflexion_right_limitation.value = data.lateroflexion_right_limitation;
    lateroflexion_right_spine.value = data.lateroflexion_right_spine;
}

onMounted(async () => {
	await fetch_general_examination(props.client_id)
})

</script>

<template>
    <div>
        <div class="font-bold mb-2">Изгибы позвоночника в саггитальной плоскости: </div>
        <div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5">Шейный лордоз: </div>
			<div class="flex items-center me-3">
				<input v-model="cervical_lordosis" :value="null" id="cervical_lordosis_none" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="cervical_lordosis_status"/>
				<label for="cervical_lordosis_none" class="ms-2">Не выбрано</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="cervical_lordosis" :value="'preserved'"  id="cervical_lordosis_preserved" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="cervical_lordosis_status"/>
				<label for="cervical_lordosis_preserved" class="ms-2">Сохранён</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="cervical_lordosis" :value="'smoothed'"  id="cervical_lordosis_smoothed" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="cervical_lordosis_status"/>
				<label for="cervical_lordosis_smoothed" class="ms-2">Сглажен</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="cervical_lordosis" :value="'enhanced'"  id="cervical_lordosis_enhanced" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="cervical_lordosis_status"/>
				<label for="cervical_lordosis_enhanced" class="ms-2">Усилен</label>
			</div>
		</div>

        <div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5">Грудной кифоз: </div>
			<div class="flex items-center me-3">
				<input v-model="thoracic_kyphosis" :value="null" id="thoracic_kyphosis_none" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="thoracic_kyphosis_status"/>
				<label for="thoracic_kyphosis_none" class="ms-2">Не выбрано</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="thoracic_kyphosis" :value="'preserved'" id="thoracic_kyphosis_preserved" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="thoracic_kyphosis_status"/>
				<label for="thoracic_kyphosis_preserved" class="ms-2">Сохранён</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="thoracic_kyphosis" :value="'smoothed'" id="thoracic_kyphosis_smoothed" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="thoracic_kyphosis_status"/>
				<label for="thoracic_kyphosis_smoothed" class="ms-2">Сглажен</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="thoracic_kyphosis" :value="'enhanced'" id="thoracic_kyphosis_enhanced" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="thoracic_kyphosis_status"/>
				<label for="thoracic_kyphosis_enhanced" class="ms-2">Усилен</label>
			</div>
		</div>

        <div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5">Поясничный лордоз: </div>
			<div class="flex items-center me-3">
				<input v-model="lumbar_lordosis" :value="null" id="lumbar_lordosis_none" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lumbar_lordosis_status"/>
				<label for="lumbar_lordosis_none" class="ms-2">Не выбрано</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="lumbar_lordosis" :value="'preserved'" id="lumbar_lordosis_preserved" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lumbar_lordosis_status"/>
				<label for="lumbar_lordosis_preserved" class="ms-2">Сохранён</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="lumbar_lordosis" :value="'smoothed'" id="lumbar_lordosis_smoothed" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lumbar_lordosis_status"/>
				<label for="lumbar_lordosis_smoothed" class="ms-2">Сглажен</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="lumbar_lordosis" :value="'enhanced'" id="lumbar_lordosis_enhanced" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lumbar_lordosis_status"/>
				<label for="lumbar_lordosis_enhanced" class="ms-2">Усилен</label>
			</div>
		</div>

        
        <div class="mb-8"/>
        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-2/5 sm:w-1/5 font-bold" for="general">Мышечный тонус: </label>
			<div class="flex items-center me-3">
				<input v-model="muscle_tone_symmetry" :value="null" id="muscle_tone_none" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="muscle_tone_type"/>
				<label for="muscle_tone_none" class="ms-2">Не выбрано</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="muscle_tone_symmetry" :value="false" id="muscle_tone_symmetric" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="muscle_tone_type"/>
				<label for="muscle_tone_symmetric" class="ms-2">Симметричный</label>
			</div>
			<div class="flex items-center me-3">
				<input v-model="muscle_tone_symmetry" :value="true" id="muscle_tone_asymmetric" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="muscle_tone_type"/>
				<label for="muscle_tone_asymmetric" class="ms-2">Асимметричный</label>
			</div>
        </div>

        <div class="mb-8"/>
        <div class="font-bold mb-2">Активные тесты: </div>
        
        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-1/5 sm:w-1/5" for="general">Общая флексия: </label>
            <div class="relative flex items-center space-x-4 me-3">
				<input v-model="general_inflection_limitation" :value="null" type="radio" id="general_inflection_limitation_none" name="general_inflection" class="hidden peer/general_inflection_limitation_none" />
                <label for="general_inflection_limitation_none" class="cursor-pointer peer-checked/general_inflection_limitation_none:border-white-500 peer-checked/general_inflection_limitation_none:border-b-2">Не выбрано</label>

                <span>/</span>
				
				<input v-model="general_inflection_limitation" :value="false" type="radio" id="general_inflection_not_limited" name="general_inflection" class="hidden peer/general_inflection_not_limited" />
                <label for="general_inflection_not_limited" class="cursor-pointer peer-checked/general_inflection_not_limited:border-white-500 peer-checked/general_inflection_not_limited:border-b-2">Не ограничена</label>

                <span>/</span>

                <input v-model="general_inflection_limitation" :value="true" type="radio" id="general_inflection_limited" name="general_inflection" class="hidden peer/general_inflection_limited" />
                <label for="general_inflection_limited" class="cursor-pointer peer-checked/general_inflection_limited:dark:border-white-500 peer-checked/general_inflection_limited:border-b-2">Ограничена</label>
            </div>

			<div class="flex items-center me-3">
				<input v-model="general_inflection_spine" :value="null" id="gen_inflection_spine_none" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_inflection_spine"/>
				<label for="gen_inflection_spine_none" class="ms-2">Не выбрано</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="general_inflection_spine" :value="'cervical'" id="gen_inflection_cervical_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_inflection_spine"/>
				<label for="gen_inflection_cervical_spine" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="general_inflection_spine" :value="'throatic'" id="gen_inflection_thoracic_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_inflection_spine"/>
				<label for="gen_inflection_thoracic_spine" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="general_inflection_spine" :value="'lumbar'" id="gen_inflection_lumbar_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_inflection_spine"/>
				<label for="gen_inflection_lumbar_spine" class="ms-2">Поп</label>
			</div>
        
        </div>

        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-1/5 sm:w-1/5" for="general">Общая экстензия: </label>
            <div class="relative flex items-center space-x-4 me-3">
				<input v-model="general_extension_limitation" :value="null" type="radio" id="general_extension_limitation_none" name="general_extension" class="hidden peer/general_extension_limitation_none" />
                <label for="general_extension_limitation_none" class="cursor-pointer peer-checked/general_extension_limitation_none:border-white-500 peer-checked/general_extension_limitation_none:border-b-2">Не выбрано</label>

                <span>/</span>
				
				<input v-model="general_extension_limitation" :value="false" type="radio" id="general_extension_not_limited" name="general_extension" class="hidden peer/general_extension_not_limited" />
                <label for="general_extension_not_limited" class="cursor-pointer peer-checked/general_extension_not_limited:border-white-500 peer-checked/general_extension_not_limited:border-b-2">Не ограничена</label>

                <span>/</span>

                <input v-model="general_extension_limitation" :value="true" type="radio" id="general_extension_limited" name="general_extension" class="hidden peer/general_extension_limited" />
                <label for="general_extension_limited" class="cursor-pointer peer-checked/general_extension_limited:dark:border-white-500 peer-checked/general_extension_limited:border-b-2">Ограничена</label>
            </div>

			<div class="flex items-center me-3">
				<input v-model="general_extension_spine" :value="null" id="gen_extension_spine_none" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_extension_spine"/>
				<label for="gen_extension_spine_none" class="ms-2">Не выбрано</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="general_extension_spine" :value="'cervical'" id="gen_extension_cervical_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_extension_spine"/>
				<label for="gen_extension_cervical_spine" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="general_extension_spine" :value="'thoracic'" id="gen_extension_thoracic_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_extension_spine"/>
				<label for="gen_extension_thoracic_spine" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="general_extension_spine" :value="'lumbar'" id="gen_extension_lumbar_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_extension_spine"/>
				<label for="gen_extension_lumbar_spine" class="ms-2">Поп</label>
			</div>
        
        </div>

        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-1/5 sm:w-1/5" for="general">Латерофлексия влево: </label>
            <div class="relative flex items-center space-x-4 me-3">
				<input v-model="lateroflexion_left_limitation" :value="null" type="radio" id="lateroflexion_left_limitation_none" name="lateroflexion_to_the_left" class="hidden peer/lateroflexion_left_limitation_none" />
                <label for="lateroflexion_left_limitation_none" class="cursor-pointer peer-checked/lateroflexion_left_limitation_none:border-white-500 peer-checked/lateroflexion_left_limitation_none:border-b-2">Не выбрано</label>

                <span>/</span>

                <input v-model="lateroflexion_left_limitation" :value="false" type="radio" id="lateroflexion_to_the_left_not_limited" name="lateroflexion_to_the_left" class="hidden peer/lateroflexion_to_the_left_not_limited" />
                <label for="lateroflexion_to_the_left_not_limited" class="cursor-pointer peer-checked/lateroflexion_to_the_left_not_limited:border-white-500 peer-checked/lateroflexion_to_the_left_not_limited:border-b-2">Не ограничена</label>

                <span>/</span>

                <input v-model="lateroflexion_left_limitation" :value="true" type="radio" id="lateroflexion_to_the_left_limited" name="lateroflexion_to_the_left" class="hidden peer/lateroflexion_to_the_left_limited" />
                <label for="lateroflexion_to_the_left_limited" class="cursor-pointer peer-checked/lateroflexion_to_the_left_limited:dark:border-white-500 peer-checked/lateroflexion_to_the_left_limited:border-b-2">Ограничена</label>
            </div>

			<div class="flex items-center me-3">
				<input v-model="lateroflexion_left_spine" :value="null" id="lateroflexion_left_spine_none" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_left_spine"/>
				<label for="lateroflexion_left_spine_none" class="ms-2">Не выбрано</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="lateroflexion_left_spine" :value="'cervical'" id="lateroflexion_to_the_left_cervical_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_left_spine"/>
				<label for="lateroflexion_to_the_left_cervical_spine" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="lateroflexion_left_spine" :value="'thoracic'" id="lateroflexion_to_the_left_thoracic_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_left_spine"/>
				<label for="lateroflexion_to_the_left_thoracic_spine" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="lateroflexion_left_spine" :value="'lumbar'" id="lateroflexion_to_the_left_lumbar_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_left_spine"/>
				<label for="lateroflexion_to_the_left_lumbar_spine" class="ms-2">Поп</label>
			</div>
        
        </div>

        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-1/5 sm:w-1/5" for="general">Латерофлексия вправо: </label>
            <div class="relative flex items-center space-x-4 me-3">
				<input v-model="lateroflexion_right_limitation" :value="null" type="radio" id="lateroflexion_right_limitation_none" name="lateroflexion_to_the_right" class="hidden peer/lateroflexion_right_limitation_none" />
                <label for="lateroflexion_right_limitation_none" class="cursor-pointer peer-checked/lateroflexion_right_limitation_none:border-white-500 peer-checked/lateroflexion_right_limitation_none:border-b-2">Не выбрано</label>

                <span>/</span>

                <input v-model="lateroflexion_right_limitation" :value="false" type="radio" id="lateroflexion_to_the_right_not_limited" name="lateroflexion_to_the_right" class="hidden peer/lateroflexion_to_the_right_not_limited" />
                <label for="lateroflexion_to_the_right_not_limited" class="cursor-pointer peer-checked/lateroflexion_to_the_right_not_limited:border-white-500 peer-checked/lateroflexion_to_the_right_not_limited:border-b-2">Не ограничена</label>

                <span>/</span>

                <input v-model="lateroflexion_right_limitation" :value="true" type="radio" id="lateroflexion_to_the_right_limited" name="lateroflexion_to_the_right" class="hidden peer/lateroflexion_to_the_right_limited" />
                <label for="lateroflexion_to_the_right_limited" class="cursor-pointer peer-checked/lateroflexion_to_the_right_limited:dark:border-white-500 peer-checked/lateroflexion_to_the_right_limited:border-b-2">Ограничена</label>
            </div>

			<div class="flex items-center me-3">
				<input v-model="lateroflexion_right_spine" :value="null" id="lateroflexion_right_spine_none" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_right_spine"/>
				<label for="lateroflexion_right_spine_none" class="ms-2">Не выбрано</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="lateroflexion_right_spine" :value="'cervical'" id="lateroflexion_to_the_right_cervical_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_right_spine"/>
				<label for="lateroflexion_to_the_right_cervical_spine" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="lateroflexion_right_spine" :value="'thoracic'" id="lateroflexion_to_the_right_thoracic_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_right_spine"/>
				<label for="lateroflexion_to_the_right_thoracic_spine" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input v-model="lateroflexion_right_spine" :value="'lumbar'" id="lateroflexion_to_the_right_lumbar_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_right_spine"/>
				<label for="lateroflexion_to_the_right_lumbar_spine" class="ms-2">Поп</label>
			</div>
        
        </div>

		<div class="flex justify-end">
			<PrimaryBtn @click="save(client_id)" class="block mb-5 content-end">Сохранить</PrimaryBtn>
		</div>

    </div>
</template>

<style scoped>
</style>