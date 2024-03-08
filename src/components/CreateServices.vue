<script setup>
defineProps(['list'])
</script>

<template>
	<div>
		<select class="px-2 py-1 mb-3 rounded-lg dark:bg-gray-700 me-5">
			<option v-for="(el, idx) in list" class="" value="el" :selected="idx === 0">{{ el }}</option>
		</select>

		<input type="number" class="w-[130px] rounded-lg py-1 px-2 me-5" placeholder="Количество">

		<span class="text-lg font-bold cursor-pointer">+</span>
	</div>
</template>
