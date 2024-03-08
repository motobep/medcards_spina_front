<script setup>
import CreateServices from './CreateServices.vue';

const list = [
	'Услуга 1',
	'Услуга 2',
	'Услуга 3',
]
</script>

<template>
	<div class="w-[1000px]">
		<div class="font-bold mb-2">Диагноз</div>
		<textarea class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700 mb-5" id="text" name="content"
			rows="5"></textarea>

		<div>
			<div class="font-bold mb-2">Назначения</div>
			<CreateServices :list="list"/>
		</div>
	</div>
</template>
