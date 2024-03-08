<script setup>
defineProps(['data'])
</script>

<template>
	<table class="table-bordered table-gapped">
		<thead>
			<tr>
				<td>№</td>
				<td>Сотрудник</td>
				<td>Дата</td>
				<td>Услуга</td>
				<td>Количество</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="entity in data">
				<td>{{ entity.id }}</td>
				<td>{{ entity.worker }}</td>
				<td>{{ entity.date }}</td>
				<td>{{ entity.service }}</td>
				<td>{{ entity.amount }}</td>
			</tr>
		</tbody>
	</table>
</template>
