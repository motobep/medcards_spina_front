<script setup>
let history = [
	['14/11/23', 'Ханов', 'Ожидание', 'Коррекция'],
	['14/10/23', 'Ханов 2', 'Ожидание 2', 'Коррекция 2'],
]
</script>

<template>
	<table class="table-bordered">
		<thead>
			<tr>
				<td class="px-4">Дата</td>
				<td class="px-4">Сотрудник</td>
				<td class="px-4">Статус</td>
				<td class="px-4">Услуга</td>
				<td class="px-4">Мед арты</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in history">
				<td class="px-4" v-for="cell in row">{{ cell }}</td>
				<td class="px-4">
					<PrimaryBtn class="mb-2" @click="$emit('showCard')">Посмотреть медкарту</PrimaryBtn>
				</td>
			</tr>
		</tbody>
	</table>
</template>
