<template>
    <div>
        <div class="font-bold mb-2">Изгибы позвоночника в саггитальной плоскости: </div>
        <div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<label class="w-2/5 sm:w-1/5" for="general">Шейный лордоз: </label>
			<div class="flex items-center me-3">
				<input id="gen_health_status_satisfactory" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_satisfactory" class="ms-2">Сохранён</label>
			</div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Сглажен</label>
			</div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_severe" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_severe" class="ms-2">Усилен</label>
			</div>
		</div>

        <div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<label class="w-2/5 sm:w-1/5" for="general">Грудной кифоз: </label>
			<div class="flex items-center me-3">
				<input id="gen_health_status_satisfactory" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_satisfactory" class="ms-2">Сохранён</label>
			</div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Сглажен</label>
			</div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_severe" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_severe" class="ms-2">Усилен</label>
			</div>
		</div>

        <div class="mb-2 w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
			<label class="w-2/5 sm:w-1/5" for="general">Поясничный лордоз: </label>
			<div class="flex items-center me-3">
				<input id="gen_health_status_satisfactory" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_satisfactory" class="ms-2">Сохранён</label>
			</div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Сглажен</label>
			</div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_severe" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_severe" class="ms-2">Усилен</label>
			</div>
		</div>
        
        <div class="mb-8"/>
        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-2/5 sm:w-1/5 font-bold" for="general">Мышечный тонус: </label>
			<div class="flex items-center me-3">
				<input id="gen_health_status_satisfactory" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_satisfactory" class="ms-2">Симметричный</label>
			</div>
			<div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Асимметричный</label>
			</div>
        </div>

        <div class="mb-8"/>
        <div class="font-bold mb-2">Активные тесты: </div>
        
        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-3/12 sm:w-3/12" for="general">Общая флексия: </label>
            <div class="relative flex items-center space-x-4 me-3">
                <input type="radio" id="yes" name="decision" class="hidden peer/yes" />
                <label for="yes" class="cursor-pointer dark:peer-checked/no:border-white-500 peer-checked/yes:border-black peer-checked/yes:border-b-2">Не ограничена</label>

                <span>/</span>

                <input type="radio" id="no" name="decision" class="hidden peer/no" />
                <label for="no" class="cursor-pointer dark:peer-checked/no:border-white-500 peer-checked/no:border-black peer-checked/no:border-b-2">Ограничена</label>
            </div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Поп</label>
			</div>
        
        </div>

        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-3/12 sm:w-3/12" for="general">Общая экстензия: </label>
            <div class="relative flex items-center space-x-4 me-3">
                <input type="radio" id="yes" name="decision" class="hidden peer/yes" />
                <label for="yes" class="cursor-pointer dark:peer-checked/no:border-white-500 peer-checked/yes:border-black peer-checked/yes:border-b-2">Не ограничена</label>

                <span>/</span>

                <input type="radio" id="no" name="decision" class="hidden peer/no" />
                <label for="no" class="cursor-pointer dark:peer-checked/no:border-white-500 peer-checked/no:border-black peer-checked/no:border-b-2">Ограничена</label>
            </div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Поп</label>
			</div>
        
        </div>

        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-3/12 sm:w-3/12" for="general">Латерофлексия влево: </label>
            <div class="relative flex items-center space-x-4 me-3">
                <input type="radio" id="yes" name="decision" class="hidden peer/yes" />
                <label for="yes" class="cursor-pointer dark:peer-checked/no:border-white-500 peer-checked/yes:border-black peer-checked/yes:border-b-2">Не ограничена</label>

                <span>/</span>

                <input type="radio" id="no" name="decision" class="hidden peer/no" />
                <label for="no" class="cursor-pointer dark:peer-checked/no:border-white-500 peer-checked/no:border-black peer-checked/no:border-b-2">Ограничена</label>
            </div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Поп</label>
			</div>
        
        </div>

        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <label class="w-3/12 sm:w-3/12" for="general">Латерофлексия вправо: </label>
            <div class="relative flex items-center space-x-4 me-3">
                <input type="radio" id="yes" name="decision" class="hidden peer/yes" />
                <label for="yes" class="cursor-pointer dark:peer-checked/no:border-white-500 peer-checked/yes:border-black peer-checked/yes:border-b-2">Не ограничена</label>

                <span>/</span>

                <input type="radio" id="no" name="decision" class="hidden peer/no" />
                <label for="no" class="cursor-pointer dark:peer-checked/no:border-white-500 peer-checked/no:border-black peer-checked/no:border-b-2">Ограничена</label>
            </div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Шоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Гоп</label>
			</div>

            <div class="flex items-center me-3">
				<input id="gen_health_status_moderate" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="radio" name="gen_health_status"/>
				<label for="gen_health_status_moderate" class="ms-2">Поп</label>
			</div>
        
        </div>
    </div>
</template>