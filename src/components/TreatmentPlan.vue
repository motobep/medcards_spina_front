<script setup>
import { ref, onMounted, computed } from 'vue';
import { auth } from '@/helpers';
import moment from 'moment';

// Определение свойств компонента
const props = defineProps(['medcard_id']);

// Состояния для хранения всех записей плана лечения и выбранной записи
const treatment_plans = ref([]);
const selected_plan_id = ref(null);

// Выбранный план лечения на основе selected_plan_id
const selected_plan = computed(() => {
  return treatment_plans.value.find(plan => plan.id === selected_plan_id.value) || null;
});

/**
 * Функция сохранения текущего плана лечения
 * @param {number} medcard_id - ID медкарты
 * @param {object} plan - Объект плана лечения для сохранения
 */
async function save_treatment_plan(medcard_id, plan) {
  if (!plan) return;

  const response = await auth.post('save_treatment_plan', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: plan.id,
      medcard_id: medcard_id,
      performed_manipulations: plan.performed_manipulations,
      upcoming_manipulations: plan.upcoming_manipulations,
    }),
  });

  if (response === null) return;

  // Обновляем список планов лечения после сохранения
  await fetch_treatment_plan(medcard_id);
}

/**
 * Функция получения всех планов лечения по заданному medcard_id
 * @param {number} medcard_id - ID медкарты
 */
async function fetch_treatment_plan(medcard_id) {
  let response = await auth.post('get_treatment_plan', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      medcard_id: medcard_id,
    })
  });

  if (response === null || !Array.isArray(response)) {
    treatment_plans.value = [];
    selected_plan_id.value = null;
    return;
  }

  // Маппим полученные данные и форматируем дату
  treatment_plans.value = response.map((el) => ({
    id: el.id,
    medcard_id: el.medcard_id,
    performed_manipulations: el.performed_manipulations || '',
    upcoming_manipulations: el.upcoming_manipulations || '',
    created_at: moment.unix(el.created_at).format('DD.MM.YYYY HH:mm:ss'), // Форматируем дату
  }));

  // Добавляем пустую запись для создания нового плана лечения
  treatment_plans.value.push({
    id: -1,
    medcard_id: medcard_id,
    performed_manipulations: '',
    upcoming_manipulations: '',
    created_at: 'Новый',
  });

  // Выбираем последний план лечения по умолчанию
  if (treatment_plans.value.length > 0 && selected_plan_id.value === null) {
    selected_plan_id.value = treatment_plans.value[treatment_plans.value.length - 1].id;
  }
}

/**
 * Функция удаления плана лечения
 * @param {object} plan - Объект плана лечения для удаления
 */
async function delete_treatment_plan(plan) {
  if (!plan || plan.id === -1) return; // Не удаляем новую запись

  const response = await auth.get('delete_treatment_plan?' + new URLSearchParams({
    id: plan.id,
  }));

  if (response === null) return;

  // Обновляем список планов лечения после удаления
  await fetch_treatment_plan(props.medcard_id);
}

onMounted(async () => {
  await fetch_treatment_plan(props.medcard_id);
});
</script>

<template>
  <div>
    <!-- Вкладки для отображения планов лечения по датам -->
    <v-tabs show-arrows v-model="selected_plan_id">
      <v-tab
        v-for="plan in treatment_plans"
        :key="plan.id"
        :value="plan.id"
      >
        {{ plan.created_at }}
      </v-tab>
    </v-tabs>

    <div v-if="selected_plan !== null">
      <!-- Поле для редактирования проведённых манипуляций -->
      <div class="font-bold mb-4">Проведённые манипуляции</div>
      <textarea
        v-model="selected_plan.performed_manipulations"
        class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"
        placeholder="Проведённые манипуляции"
      ></textarea>
      <div class="mb-0"></div>

      <!-- Поле для редактирования предстоящих манипуляций -->
      <div class="font-bold mb-4">Предстоящие манипуляции</div>
      <textarea
        v-model="selected_plan.upcoming_manipulations"
        class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"
        placeholder="Предстоящие манипуляции"
      ></textarea>
    </div>
    <div v-else class="text-gray-500 p-3">
      Пожалуйста, выберите план лечения из списка.
    </div>
    <div class="mb-0"></div>

    <!-- Кнопка сохранения изменений -->
    <div v-if="selected_plan_id !== null && selected_plan_id === -1" class="flex justify-end">
      <PrimaryBtn
        @click="save_treatment_plan(props.medcard_id, selected_plan)"
        class="block mb-0 content-end"
        :disabled="selected_plan === null"
      >
        Сохранить
      </PrimaryBtn>
    </div>
    <div v-else class="flex justify-end">
      <PrimaryBtn
        @click="delete_treatment_plan(selected_plan)"
        class="block mb-0 content-end"
        :disabled="selected_plan === null"
      >
        Удалить
      </PrimaryBtn>
    </div>
  </div>
</template>
