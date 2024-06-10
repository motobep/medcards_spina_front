<script setup>
import { ref } from 'vue';
import { computed } from 'vue';


let weight = ref(0);
let height = ref(0);

let body_mass_index = computed(() => {
	return (weight.value / (height.value/100)**2).toFixed(2);
	
})
</script>

<template>
	<div>
		<div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Общее состояние: </div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_satisfactory" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_satisfactory" class="ms-2">Удовлетворительно</label>
			</div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Средней тяжести</label>
			</div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_severe" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_severe" class="ms-2">Тяжёлое</label>
			</div>
		</div>

		<div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Тип телосложения: </div>
			<div class="flex items-center me-3">
				<input id="body_type_norm" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="body_type"/>
				<label for="body_type_norm" class="ms-2">Нормостенический</label>
			</div>
			<div class="flex items-center me-3">
				<input id="body_type_hyper" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="body_type"/>
				<label for="body_type_hyper" class="ms-2">Гиперстенический</label>
			</div>
			<div class="flex items-center me-3">
				<input id="body_type_asthenic" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="body_type"/>
				<label for="body_type_asthenic" class="ms-2">Астенический</label>
			</div>
		</div>

		<div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Кожные покровы: </div>
			<div class="flex items-center me-3">
				<input id="skin_clean" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="skin_condition"/>
				<label for="skin_clean" class="ms-2">Чистые</label>
			</div>
			<div class="flex items-center me-3">
				<input id="skin_rash" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="skin_condition"/>
				<label for="skin_rash" class="ms-2">Высыпания</label>
			</div>
			<div class="flex items-center me-3">
				<input id="skin_moist" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="skin_condition"/>
				<label for="skin_moist" class="ms-2">Влажные</label>
			</div>
			<div class="flex items-center me-3">
				<input id="skin_dry" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="skin_condition"/>
				<label for="skin_dry" class="ms-2">Сухие</label>
			</div>
			<div class="flex items-center me-3">
				<input id="skin_excoriations" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="skin_condition"/>
				<label for="skin_excoriations" class="ms-2">Экскориации</label>
			</div>
		</div>

		<div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Слизистые оболочки: </div>
			<div class="flex items-center me-3">
				<input id="mucous_clean" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="mucous_condition"/>
				<label for="mucous_clean" class="ms-2">Чистые</label>
			</div>
			<div class="flex items-center me-3">
				<input id="mucous_rash" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="mucous_condition"/>
				<label for="mucous_rash" class="ms-2">Высыпания</label>
			</div>
			<div class="flex items-center me-3">
				<input id="mucous_moist" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="mucous_condition"/>
				<label for="mucous_moist" class="ms-2">Влажные</label>
			</div>
			<div class="flex items-center me-3">
				<input id="mucous_dry" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="mucous_condition"/>
				<label for="mucous_dry" class="ms-2">Сухие</label>
			</div>
		</div>

		<div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Дыхание: </div>
			<div class="flex items-center me-6">
				<input id="breath_vesicular" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="breath"/>
				<label for="breath_vesicular" class="ms-2">Везикулярное</label>
			</div>
			<div class="flex items-center me-6">
				<input id="breath_puerile" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="breath"/>
				<label for="breath_puerile" class="ms-2">Пуэрильное</label>
			</div>
			<div class="flex items-center me-6">
				<input id="breath_hard" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="breath"/>
				<label for="breath_hard" class="ms-2">Жёсткое</label>
			</div>
			<div class="flex items-center me-6">
				<input id="breath_weakened" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="breath"/>
				<label for="breath_weakened" class="ms-2">Ослабленное</label>
			</div>
		</div>

		<div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5" >Живот: </div>
			<div class="flex items-center me-3">
				<input id="abdomen_soft" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="abdomen"/>
				<label for="abdomen_soft" class="ms-2">Мягкий</label>
			</div>
			<div class="flex items-center me-3">
				<input id="abdomen_tense" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="abdomen"/>
				<label for="abdomen_tense" class="ms-2">Напряжён</label>
			</div>
			<div class="flex items-center me-3">
				<input id="abdomen_painless" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="abdomen"/>
				<label for="abdomen_painless" class="ms-2">Безболезненный</label>
			</div>
			<div class="flex items-center me-3">
				<input id="abdomen_painful" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="abdomen"/>
				<label for="abdomen_painful" class="ms-2">Болезненный</label>
			</div>
		</div>

		<div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<label class="w-2/5 sm:w-1/5">Хрипы: </label>
			<div class="flex items-center me-10">
				<input id="wheeze_no" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="wheeze"/>
				<label for="wheeze_no" class="ms-2">Нет</label>
			</div>
			<div class="flex items-center me-10">
				<input id="wheeze_wet" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="wheeze"/>
				<label for="wheeze_wet" class="ms-2">Влажные</label>
			</div>
			<div class="flex items-center me-10">
				<input id="wheeze_dry" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="wheeze"/>
				<label for="wheeze_dry" class="ms-2">Сухие</label>
			</div>
		</div>

		<div class="mb-8"></div>
		<div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="blood_pressure" class="me-5">АД</label>
			<div class="relative flex items-center">
				<input id="blood_pressure" type="text" class="bg-transparent border-none focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label for="blood_pressure" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">мм.рт.ст</span>
		</div>

		<div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="pulse" class="me-5">Пульс</label>
			<div class="relative flex items-center">
				<input id="pulse" type="text" class="bg-transparent border-none focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label for="pulse" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">.</span>
		</div>

		<div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="body_temp" class="me-5">Температура тела</label>
			<div class="relative flex items-center">
				<input id="body_temp" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label for="body_temp" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">C.</span>
		</div>

		<div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="weight" class="me-5">Вес</label>
			<div class="relative flex items-center">
				<input v-model="weight" id="weight" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label for="weight" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">кг.</span>
		</div>

		<div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="height" class="me-5">Рост</label>
			<div class="relative flex items-center">
				<input v-model="height" id="height" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label for="height" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">см.</span>
		</div>

		<div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="body_mass_index" class="me-5">ИМТ</label>
			<div class="relative flex items-center">
				<input v-model="body_mass_index" id="body_mass_index" type="text" class="bg-transparent border-none  focus:outline-none w-20 px-2 py-1 text-center placeholder-transparent" placeholder="____">
				<label for="body_mass_index" class="absolute bottom-0 left-0 text-gray-500 pointer-events-none">___________</label>
			</div>
			<span class="ml-2">.</span>
		</div>

		<div class="flex justify-end">
			<PrimaryBtn class="block mb-5 content-end">Сохранить</PrimaryBtn>
		</div>
	</div>
</template>
