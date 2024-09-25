<script setup>
import { ref, onMounted, computed } from 'vue';
import { auth } from '@/helpers';
import moment from 'moment';

// Определение свойств компонента
const props = defineProps(['client_id', 'medcard_id']);

// Состояния для хранения всех диагнозов и выбранного диагноза
const detailed_diagnoses = ref([]);
const selected_diagnosis_id = ref(null);

// Выбранный диагноз на основе selected_diagnosis_id
const selected_diagnosis = computed(() => {
  console.log(detailed_diagnoses.value.find(d => d.id === selected_diagnosis_id.value) || null)
  return detailed_diagnoses.value.find(d => d.id === selected_diagnosis_id.value) || null;
});

/**
 * Функция сохранения текущего диагноза
 * @param {number} medcard_id - ID медкарты
 */
async function save_detailed_diagnosis(medcard_id, diagnosis) {
  if (!diagnosis) return;

  let data = await auth.post('save_detailed_diagnosis', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: diagnosis.id,
      medcard_id: medcard_id,
      doctors_report: diagnosis.doctors_report,
      complications: diagnosis.complications,
      related_diseases: diagnosis.related_diseases,
    }),
  });

  if (data === null) return;

  // Обновляем список диагнозов после сохранения
  await fetch_detailed_diagnosis(medcard_id);
}

/**
 * Функция получения всех диагнозов по заданному medcard_id
 * @param {number} medcard_id - ID медкарты
 */
async function fetch_detailed_diagnosis(medcard_id) {
  let response = await auth.post('get_detailed_diagnosis', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      medcard_id: medcard_id,
    })
  });


  if (response === null || !Array.isArray(response)) {
    detailed_diagnoses.value = [];
    selected_diagnosis_id.value = null; 
    return;
  }

  // Маппим полученные данные и форматируем дату
  detailed_diagnoses.value = response.map((el) => ({
    id: el.id,
    medcard_id: el.medcard_id,
    doctors_report: el.doctors_report || '',
    complications: el.complications || '',
    related_diseases: el.related_diseases || '',
    created_at: moment.unix(el.created_at).format('DD.MM.YYYY HH:mm:ss'), // Форматируем дату
  }));

  detailed_diagnoses.value.push(
    {
      id: -1,
      medcard_id: medcard_id,
      created_at: "Новый", // Форматируем дату
      doctors_report: '',
      complications: '',
      related_diseases:  '',
    }
  )

  // Выбираем последний диагноз по умолчанию
  if (detailed_diagnoses.value.length > 0 && selected_diagnosis_id.value === null) {
    selected_diagnosis_id.value = detailed_diagnoses.value[detailed_diagnoses.value.length - 1].id;
  }
}


async function delete_detailed_diagnosis(disgnosis) {
  if (!disgnosis) return;

    const response = await auth.get('delete_detailed_diagnosis?' + new URLSearchParams({
      id: disgnosis.id
    }));

    // После сохранения обновляем список жалоб
    await fetch_detailed_diagnosis(props.medcard_id);
 
}

onMounted(async () => {
  await fetch_detailed_diagnosis(props.medcard_id);
});
</script>

<template>
  <div>
    <!-- Вкладки для отображения диагнозов по датам -->
    <v-tabs show-arrows v-model="selected_diagnosis_id">
      <v-tab
        v-for="diagnosis in detailed_diagnoses"
        :key="diagnosis.id"
        :value="diagnosis.id"
      >
        {{ diagnosis.created_at }}
      </v-tab>
    </v-tabs>

    <div v-if="selected_diagnosis !== null">
      <!-- Поле для редактирования заключения -->
      <div class="font-bold mb-4">Заключение</div>
      <textarea
        v-model="selected_diagnosis.doctors_report"
        class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"
        placeholder="Заключение"
      ></textarea>
      <div class="mb-0"></div>

      <!-- Поле для редактирования осложнений -->
      <div class="font-bold mb-4">Осложнения</div>
      <textarea
        v-model="selected_diagnosis.complications"
        class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"
        placeholder="Осложнения"
      ></textarea>
      <div class="mb-0"></div>

      <!-- Поле для редактирования сопутствующих заболеваний -->
      <div class="font-bold mb-4">Сопутствующие заболевания</div>
      <textarea
        v-model="selected_diagnosis.related_diseases"
        class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"
        placeholder="Сопутствующие заболевания"
      ></textarea>
    </div>
    <div v-else class="text-gray-500 p-3">
      Пожалуйста, выберите диагнозы из списка.
    </div>
    <div class="mb-0"></div>

    <!-- Кнопка сохранения изменений -->
    <div v-if="selected_diagnosis_id !== null && selected_diagnosis_id === -1" class="flex justify-end">
      <PrimaryBtn
        @click="save_detailed_diagnosis(props.medcard_id, selected_diagnosis)"
        class="block mb-0 content-end"
        :disabled="selected_diagnosis === null"
      >
        Сохранить
      </PrimaryBtn>
    </div>
    <div v-else class="flex justify-end">
      <PrimaryBtn
        @click="delete_detailed_diagnosis(selected_diagnosis)"
        class="block mb-0 content-end"
        :disabled="selected_diagnosis === null"
      >
        Удалить
      </PrimaryBtn>
    </div>
  </div>
</template>
