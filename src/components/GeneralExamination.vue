<template>
    <div>
        <div class="font-bold mb-2">Изгибы позвоночника в саггитальной плоскости: </div>
        <div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5">Шейный лордоз: </div>
			<div class="flex items-center me-3">
				<input id="cervical_lordosis_satisfactory" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="cervical_lordosis_status"/>
				<label for="cervical_lordosis_satisfactory" class="ms-2">Сохранён</label>
			</div>
			<div class="flex items-center me-3">
				<input id="cervical_lordosis_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="cervical_lordosis_status"/>
				<label for="cervical_lordosis_moderate" class="ms-2">Сглажен</label>
			</div>
			<div class="flex items-center me-3">
				<input id="cervical_lordosis_severe" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="cervical_lordosis_status"/>
				<label for="cervical_lordosis_severe" class="ms-2">Усилен</label>
			</div>
		</div>

        <div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5">Грудной кифоз: </div>
			<div class="flex items-center me-3">
				<input id="thoracic_kyphosis_satisfactory" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="thoracic_kyphosis_status"/>
				<label for="thoracic_kyphosis_satisfactory" class="ms-2">Сохранён</label>
			</div>
			<div class="flex items-center me-3">
				<input id="thoracic_kyphosis_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="thoracic_kyphosis_status"/>
				<label for="thoracic_kyphosis_moderate" class="ms-2">Сглажен</label>
			</div>
			<div class="flex items-center me-3">
				<input id="thoracic_kyphosis_severe" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="thoracic_kyphosis_status"/>
				<label for="thoracic_kyphosis_severe" class="ms-2">Усилен</label>
			</div>
		</div>

        <div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<div class="w-2/5 sm:w-1/5">Поясничный лордоз: </div>
			<div class="flex items-center me-3">
				<input id="lumbar_lordosis_satisfactory" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lumbar_lordosis_status"/>
				<label for="lumbar_lordosis_satisfactory" class="ms-2">Сохранён</label>
			</div>
			<div class="flex items-center me-3">
				<input id="lumbar_lordosis_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lumbar_lordosis_status"/>
				<label for="lumbar_lordosis_moderate" class="ms-2">Сглажен</label>
			</div>
			<div class="flex items-center me-3">
				<input id="lumbar_lordosis_severe" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lumbar_lordosis_status"/>
				<label for="lumbar_lordosis_severe" class="ms-2">Усилен</label>
			</div>
		</div>
        
        <div class="mb-8"/>
        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-2/5 sm:w-1/5 font-bold" for="general">Мышечный тонус: </label>
			<div class="flex items-center me-3">
				<input id="muscle_tone_symmetric" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="muscle_tone_type"/>
				<label for="muscle_tone_symmetric" class="ms-2">Симметричный</label>
			</div>
			<div class="flex items-center me-3">
				<input id="muscle_tone_asymmetric" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="muscle_tone_type"/>
				<label for="muscle_tone_asymmetric" class="ms-2">Асимметричный</label>
			</div>
        </div>

        <div class="mb-8"/>
        <div class="font-bold mb-2">Активные тесты: </div>
        
        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-1/5 sm:w-1/5" for="general">Общая флексия: </label>
            <div class="relative flex items-center space-x-4 me-3">
                <input type="radio" id="general_inflection_not_limited" name="general_inflection" class="hidden peer/general_inflection_not_limited" />
                <label for="general_inflection_not_limited" class="cursor-pointer peer-checked/general_inflection_not_limited:border-white-500 peer-checked/general_inflection_not_limited:border-b-2">Не ограничена</label>

                <span>/</span>

                <input type="radio" id="general_inflection_limited" name="general_inflection" class="hidden peer/general_inflection_limited" />
                <label for="general_inflection_limited" class="cursor-pointer peer-checked/general_inflection_limited:dark:border-white-500 peer-checked/general_inflection_limited:border-b-2">Ограничена</label>
            </div>

            <div class="flex items-center me-3">
				<input id="gen_inflection_cervical_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_inflection_spine"/>
				<label for="gen_inflection_cervical_spine" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_inflection_thoracic_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_inflection_spine"/>
				<label for="gen_inflection_thoracic_spine" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_inflection_lumbar_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_inflection_spine"/>
				<label for="gen_inflection_lumbar_spine" class="ms-2">Поп</label>
			</div>
        
        </div>

        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-1/5 sm:w-1/5" for="general">Общая экстензия: </label>
            <div class="relative flex items-center space-x-4 me-3">
                <input type="radio" id="general_extension_not_limited" name="general_extension" class="hidden peer/general_extension_not_limited" />
                <label for="general_extension_not_limited" class="cursor-pointer peer-checked/general_extension_not_limited:border-white-500 peer-checked/general_extension_not_limited:border-b-2">Не ограничена</label>

                <span>/</span>

                <input type="radio" id="general_extension_limited" name="general_extension" class="hidden peer/general_extension_limited" />
                <label for="general_extension_limited" class="cursor-pointer peer-checked/general_extension_limited:dark:border-white-500 peer-checked/general_extension_limited:border-b-2">Ограничена</label>
            </div>

            <div class="flex items-center me-3">
				<input id="gen_extension_cervical_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_extension_spine"/>
				<label for="gen_extension_cervical_spine" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_extension_thoracic_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_extension_spine"/>
				<label for="gen_extension_thoracic_spine" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_extension_lumbar_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_extension_spine"/>
				<label for="gen_extension_lumbar_spine" class="ms-2">Поп</label>
			</div>
        
        </div>

        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-1/5 sm:w-1/5" for="general">Латерофлексия влево: </label>
            <div class="relative flex items-center space-x-4 me-3">
                <input type="radio" id="lateroflexion_to_the_left_not_limited" name="lateroflexion_to_the_left" class="hidden peer/lateroflexion_to_the_left_not_limited" />
                <label for="lateroflexion_to_the_left_not_limited" class="cursor-pointer peer-checked/lateroflexion_to_the_left_not_limited:border-white-500 peer-checked/lateroflexion_to_the_left_not_limited:border-b-2">Не ограничена</label>

                <span>/</span>

                <input type="radio" id="lateroflexion_to_the_left_limited" name="lateroflexion_to_the_left" class="hidden peer/lateroflexion_to_the_left_limited" />
                <label for="lateroflexion_to_the_left_limited" class="cursor-pointer peer-checked/lateroflexion_to_the_left_limited:dark:border-white-500 peer-checked/lateroflexion_to_the_left_limited:border-b-2">Ограничена</label>
            </div>

            <div class="flex items-center me-3">
				<input id="lateroflexion_to_the_left_cervical_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_to_the_left_spine"/>
				<label for="lateroflexion_to_the_left_cervical_spine" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="lateroflexion_to_the_left_thoracic_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_to_the_left_spine"/>
				<label for="lateroflexion_to_the_left_thoracic_spine" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="lateroflexion_to_the_left_lumbar_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_to_the_left_spine"/>
				<label for="lateroflexion_to_the_left_lumbar_spine" class="ms-2">Поп</label>
			</div>
        
        </div>

        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-1/5 sm:w-1/5" for="general">Латерофлексия вправо: </label>
            <div class="relative flex items-center space-x-4 me-3">
                <input type="radio" id="lateroflexion_to_the_right_not_limited" name="lateroflexion_to_the_right" class="hidden peer/lateroflexion_to_the_right_not_limited" />
                <label for="lateroflexion_to_the_right_not_limited" class="cursor-pointer peer-checked/lateroflexion_to_the_right_not_limited:border-white-500 peer-checked/lateroflexion_to_the_right_not_limited:border-b-2">Не ограничена</label>

                <span>/</span>

                <input type="radio" id="lateroflexion_to_the_right_limited" name="lateroflexion_to_the_right" class="hidden peer/lateroflexion_to_the_right_limited" />
                <label for="lateroflexion_to_the_right_limited" class="cursor-pointer peer-checked/lateroflexion_to_the_right_limited:dark:border-white-500 peer-checked/lateroflexion_to_the_right_limited:border-b-2">Ограничена</label>
            </div>

            <div class="flex items-center me-3">
				<input id="lateroflexion_to_the_right_cervical_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_to_the_right_spine"/>
				<label for="lateroflexion_to_the_right_cervical_spine" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="lateroflexion_to_the_right_thoracic_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_to_the_right_spine"/>
				<label for="lateroflexion_to_the_right_thoracic_spine" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="lateroflexion_to_the_right_lumbar_spine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="lateroflexion_to_the_right_spine"/>
				<label for="lateroflexion_to_the_right_lumbar_spine" class="ms-2">Поп</label>
			</div>
        
        </div>

		<div class="flex justify-end">
			<PrimaryBtn class="block mb-5 content-end">Сохранить</PrimaryBtn>
		</div>

    </div>
</template>