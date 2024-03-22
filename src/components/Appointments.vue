<script setup>
defineProps(['data', 'accept_handler', 'use_accept'])
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
				<td>Посещено</td>
				<td v-if="use_accept">Действия</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="entity in data">
				<td>{{ entity.id }}</td>
				<td>{{ entity.creator_name }}</td>
				<td>{{ entity.created_at }}</td>
				<td>{{ entity.service }}</td>
				<td>{{ entity.amount }}</td>
				<td v-if="use_accept">{{ entity.visited }}</td>
				<td><PrimaryBtn @click="accept_handler(entity.id)" class="mb-3">Принять</PrimaryBtn></td>
			</tr>
		</tbody>
	</table>
</template>
