<script setup>
defineProps(['data'])
</script>

<template>
	<table class="table-bordered table-gapped">
		<thead>
			<tr>
				<td>№</td>
				<td>Дата</td>
				<td>Сотрудник</td>
				<td>Текст</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="entity in data">
				<td>{{ entity.id }}</td>
				<td>{{ entity.created_at }}</td>
				<td>{{ entity.creator_name }}</td>
				<td>{{ entity.text }}</td>
			</tr>
		</tbody>
	</table>
</template>
