<script setup>
</script>

<template>
	<div>
		<div class="mb-2"></div>
		<input
			type="checkbox"
			id="checkbox1"
			v-model="toggle"
			true-value="yes"
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			false-value="no" />
		<label for="checkbox1" class="ms-2">Нарушение функции опорно-двигательного аппарата</label>

		<div class="mb-2"></div>
		<input
			type="checkbox"
			id="checkbox2"
			v-model="toggle"
			true-value="yes"
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			false-value="no" />
		<label for="checkbox2" class="ms-2">Нарушение функции дыхательной системы</label>

		<div class="mb-2"></div>
		<input
			type="checkbox"
			id="checkbox3"
			v-model="toggle"
			true-value="yes"
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			false-value="no" />
		<label for="checkbox3" class="ms-2">Нарушение функции органов желудочно-кишечного тракта</label>

		<div class="mb-2"></div>
		<input
			type="checkbox"
			id="checkbox4"
			v-model="toggle"
			true-value="yes"
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			false-value="no" />
		<label for="checkbox4" class="ms-2">Нарушение функции мочевыделительной и половой систем</label>

		<div class="mb-2"></div>
		<input
			type="checkbox"
			id="checkbox5"
			v-model="toggle"
			true-value="yes"
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			false-value="no" />
		<label for="checkbox5" class="ms-2">Нарушение функции сердечно-сосудистой системы</label>

		<div class="mb-2"></div>
		<input
			type="checkbox"
			id="checkbox6"
			v-model="toggle"
			true-value="yes"
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			false-value="no" />
		<label for="checkbox6" class="ms-2">Болевой синдром</label>

		<div class="mb-4"></div>

		<textarea class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700" placeholder="Дополнительно"></textarea>

		<div class="mb-2"></div>
	</div>
</template>

<style>
</style>
