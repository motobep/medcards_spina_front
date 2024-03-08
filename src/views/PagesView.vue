<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
	<div class="p-12">
		<RouterLink class="text-blue-600" to="/login">
			Логин
		</RouterLink><br>
		<RouterLink class="text-blue-600" to="/worker">
			Сотрудник
		</RouterLink><br>
		<RouterLink class="text-blue-600" to="/admin">
			Админ
		</RouterLink>
	</div>
</template>
