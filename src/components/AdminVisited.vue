<script setup>
defineProps(['data'])
</script>

<template>
	<table class="table-bordered table-gapped">
		<thead>
			<tr>
				<td>№</td>
				<td>Услуга</td>
				<td>Назначено</td>
				<td>Посещено</td>
				<td>Сумма приемов</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="entity in data">
				<td>{{ entity.id }}</td>
				<td>{{ entity.service_name }}</td>
				<td>{{ entity.count }}</td>
				<td>{{ entity.visit_count }}</td>
				<td>{{ entity.sum }}</td>
			</tr>
		</tbody>
	</table>
</template>
