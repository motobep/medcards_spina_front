<script setup>
import Calendar from 'primevue/calendar';
import CreateCard from '@components/CreateCard.vue'
import ShowCard from '@components/ShowCard.vue';
import History from '@components/History.vue';
import Header from '@components/Header.vue';

import { ref } from 'vue'

const list = [
	'Spina Муштари',
	'Spina Муштари',
	'Spina Муштари',
]

const date = ref('19/03/24')

let clients = [
	{
	 name: 'Колотова Александра Александровна 1',
	 service: 'Услуга',
	 time: '11:00 - 12:00',
	},
	{
	 name: 'Колотова Александра Александровна 2',
	 service: 'Услуга',
	 time: '11:00 - 12:00',
	},
	{
	 name: 'Колотова Александра Александровна 3',
	 service: 'Услуга',
	 time: '11:00 - 12:00',
	},
]

let history = [
	['14/11/23', 'Ханов', 'Ожидание', 'Коррекция'],
	['14/10/23', 'Ханов 2', 'Ожидание 2', 'Коррекция 2'],
]

let tab = ref(0)

let clientId = ref(0)
</script>
<template>
	<div class="flex">
		<div class="w-80 px-2 border-e-2 pt-4 flex flex-col h-screen">
			<select class="px-2 py-1 mb-3 rounded-lg dark:bg-gray-700">
				<option v-for="(el, idx) in list" class="" value="el" :selected="idx === 0">{{ el }}</option>
			</select>

			<Calendar class="mb-2" v-model="date" inline dateFormat="dd/mm/yy" />

			<div class="overflow-y-auto">
				<div v-for="(c, idx) in clients" class="border border-gray-500 rounded-lg p-2 mt-4 cursor-pointer"
					:class="{ 'bg-gray-200': clientId === idx }" @click="clientId = idx">
					<div class="border-b border-gray-400 mb-1">{{ c.time }}</div>
					<div class="mb-2">{{ c.service }}</div>
					<div>{{ c.name }}</div>
				</div>
			</div>
		</div>
		<div class="w-5/6">
			<Header name="Ханов Рамиль Юсупович" />

			<div class="px-5 py-2">
				<div class="mb-1">Клинет: {{ clients[clientId].name }}</div>
				<PrimaryBtn @click="tab = 0" class="me-8 mb-5" :class="{ 'font-bold': tab === 0 }">История посещений</PrimaryBtn>
				<PrimaryBtn @click="tab = 1" class="me-8" :class="{ 'font-bold': tab === 1 }">Создать медкарту</PrimaryBtn>
				<PrimaryBtn @click="tab = 2" :class="{ 'font-bold': tab === 2 }">Посмотреть медкарту</PrimaryBtn>

				<div class="border rounded-lg p-4 ">
					<History v-if="tab === 0" :history="history" @show-card="tab = 2" />
					<CreateCard v-if="tab === 1" />
					<ShowCard v-if="tab === 2" />
				</div>

			</div>
		</div>
	</div>
</template>
