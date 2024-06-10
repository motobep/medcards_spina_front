<template>
    <div>
        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">

            <div class="me-2">Консультация специалиста:</div>
            
            <div class="flex items-center me-4">
                <input
                type="checkbox"
                id="neurologist"
                true-value="yes"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                false-value="no" />
                <label for="neurologist" class="ms-2">Невролог</label>
            </div>

            <div class="flex items-center me-4">

                <input
                type="checkbox"
                id="therapist"
                true-value="yes"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                false-value="no" />
                <label for="therapist" class="ms-2">Терапевт</label>

            </div>

            <div class="flex items-center me-4">
                <input
                type="checkbox"
                id="pediatrician"
                true-value="yes"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                false-value="no" />
                <label for="pediatrician" class="ms-2">Педиатр</label>
            </div>

            <div class="flex items-center me-4">
                <input
                type="checkbox"
                id="orthopedist"
                true-value="yes"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                false-value="no" />
                <label for="orthopedist" class="ms-2">Ортопед</label>
            </div>

            <div class="flex items-center me-4">
                <input
                type="checkbox"
                id="dentist"
                true-value="yes"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                false-value="no" />
                <label for="dentist" class="ms-2">Стоматолог</label>
            </div>

            
        </div>
      
        <div class="mb-6"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="file_input" class="w-1/12 sm:w-1/12">МРТ</label>

            <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
		</div>
        <div class="mb-4"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="file_input" class="w-1/12 sm:w-1/12">УЗИ</label>

            <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
		</div>
        <div class="mb-4"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="file_input" class="w-1/12 sm:w-1/12">Лаб</label>

            <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
		</div>
        <div class="mb-4"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="file_input" class="w-1/12 sm:w-1/12">Rg</label>

            <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
		</div>
        <div class="mb-4"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label for="file_input" class="w-1/12 sm:w-1/12">Кт</label>

            <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
		</div>
        <div class="mb-4"/>

        <div class="font-bold mb-4">Медикоментозная терапия</div>
        <textarea class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"/>
        <div class="mb-4"/>

        <div class="font-bold mb-4">Не медикоментозная терапия</div>
        <textarea class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"/>
        <div class="mb-4"/>

        <textarea class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700" placeholder="Комментарий записи..."/>
        <div class="mb-4"/>

        <div class="flex justify-end">
			<PrimaryBtn class="block mb-5 content-end">Сохранить</PrimaryBtn>
		</div>
    </div>
</template>