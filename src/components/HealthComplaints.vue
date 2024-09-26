<script setup>
import { auth } from '@/helpers'
import { ref, onMounted, computed } from 'vue';
import moment from 'moment'

// Определение свойств компонента
const props = defineProps(['client_id', 'medcard_id'])

// Состояние для хранения всех жалоб
const complaints_entries = ref([])

// Состояние для выбранной жалобы (id)
const selected_complaint_id = ref(null)

// Выбранная жалоба на основе selected_complaint_id
const selected_complaint = computed(() => {
  return complaints_entries.value.find(c => c.id === selected_complaint_id.value) || null;
});

/**
 * Функция сохранения жалобы
 * @param {number} medcard_id - ID медкарты
 * @param {object} complaint - Объект выбранной жалобы
 */
async function save_health_complaints(medcard_id, complaint) {
  if (!complaint) return;

    const response = await auth.post('save_health_complaints', {
      body: JSON.stringify({
        id: complaint.id, // Передаём ID для обновления конкретной записи
        medcard_id: medcard_id,
        additional_text: complaint.additional_text,
      }),
    });

    if (response === null) {
      console.error('Не удалось сохранить жалобу.');
      return;
    }

    // После сохранения обновляем список жалоб
    await fetch_health_complaints(props.client_id, props.medcard_id);
  
}

async function delete_health_complaints(complaint) {
  if (!complaint) return;

    const response = await auth.get('delete_health_complaints?' + new URLSearchParams({
      id: complaint.id
    }));

    // После сохранения обновляем список жалоб
    await fetch_health_complaints(props.client_id, props.medcard_id);
 
}

/**
 * Функция получения всех жалоб клиента
 * @param {number} client_id - ID клиента
 * @param {number} medcard_id - ID медкарты
 */
async function fetch_health_complaints(client_id, medcard_id) {

    const response = await auth.post('get_health_complaints', {
      body: JSON.stringify({
        yclients_client_id: client_id,
        medcard_id: medcard_id,
      })
    });

    if (response === null || !Array.isArray(response)) {
      complaints_entries.value = [];
      selected_complaint_id.value = null;
      return;
    }


    // Маппим полученные данные и форматируем дату
    complaints_entries.value = response.map((el) => ({
      id: el.id, // Уникальный идентификатор
      medcard_id: el.medcard_id,
      created_at: moment.unix(el.created_at).format('DD.MM.YYYY HH:mm:ss'), // Форматируем дату
      additional_text: el.additional_text,
    }));

    // Сортируем записи по id в порядке возрастания
    complaints_entries.value.sort((a, b) => a.id - b.id);
    complaints_entries.value.push(
      {
        id: -1,
        medcard_id: medcard_id,
        created_at: "Новый", // Форматируем дату
      }
    )

    // Выбираем последнюю запись по умолчанию, если ни одна не выбрана
    if (complaints_entries.value.length > 0 && selected_complaint_id.value === null) {
      selected_complaint_id.value = complaints_entries.value[complaints_entries.value.length - 1].id;
    }
}

onMounted(async () => {
  await fetch_health_complaints(props.client_id, props.medcard_id);
});
</script>

<template>
  <div>
    <!-- Вкладки для отображения жалоб по датам -->
    <v-tabs
      show-arrows
      v-model="selected_complaint_id"
    >
      <v-tab
        v-for="complaint in complaints_entries"
        :key="complaint.id"
        :value="complaint.id"
      >
        {{ complaint.created_at }}
      </v-tab>
    </v-tabs>
    <div v-if="selected_complaint !== null" >
      <!-- Поле для редактирования дополнительного текста выбранной жалобы -->
      <textarea
        v-model="selected_complaint.additional_text"
        class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"
        placeholder="Дополнительно"
      ></textarea>

      <!-- Кнопка сохранения изменений -->
      <div class="mb-0"></div>
      <div v-if="selected_complaint_id !== null && selected_complaint_id === -1" class="flex justify-end">
        <PrimaryBtn 
          @click="save_health_complaints(props.medcard_id, selected_complaint)" 
          class="block mb-0 content-end"
          :disabled="selected_complaint === null"
        >
          Добавить
        </PrimaryBtn>
      </div>
      <div v-else class="flex justify-end">
        <PrimaryBtn 
          @click="delete_health_complaints(selected_complaint)" 
          class="block mb-0 content-end"
          :disabled="selected_complaint === null"
        >
          Удалить
        </PrimaryBtn>
      </div>
    </div>
    <div v-else class="text-gray-500 p-3">
      Пожалуйста, выберите жалобу из списка.
    </div>
  </div>
 
</template>
