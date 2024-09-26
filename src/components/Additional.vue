<script setup>
import { auth } from '@/helpers'
import { truncate } from '@/utils' // Предполагается, что функция truncate экспортируется из '@/utils'
import { ref, onMounted, computed } from 'vue'
import moment from 'moment'

const props = defineProps(['medcard_id'])

const additional_entries = ref([]);
const selected_additional_id = ref(null);

const selected_additional = computed(() => {
  return additional_entries.value.find(additional => additional.id === selected_additional_id.value) || null;
});

const mri_files = ref([]);
const ultrasound_files = ref([]);
const lab_files = ref([]);
const rg_files = ref([]);
const ct_files = ref([]);

// Функция для получения файлов по UUID
async function fetch_files_by_uuids(uuids) {
    if (!uuids || uuids.length === 0) return [];

    let data = await auth.post('get_files', {
        body: JSON.stringify({
            uuids: uuids,
        })
    });

    if (data === null || !data.files) return [];

    return data.files;
}

// Обработчик изменения файлов (загрузка)
async function on_file_changed(event, input_name) {
    if (!event.target.files || event.target.files.length === 0) return;

    let file_uuids = [];

    for (let i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i];

        var data = new FormData();
        data.append('file', file);

        let resp_data = await auth.post('upload_file', {
            body: data
        });

        if (resp_data !== null && resp_data['uuid']) {
            file_uuids.push(resp_data['uuid']);
        }
    }

    if (file_uuids.length === 0) return;

    switch (input_name) {
        case 'mri':
            selected_additional.value.mri_file_uuids = file_uuids;
            mri_files.value = await fetch_files_by_uuids(selected_additional.value.mri_file_uuids);
            break;
        case 'ultrasound':
            selected_additional.value.ultrasound_file_uuids = file_uuids;
            ultrasound_files.value = await fetch_files_by_uuids(selected_additional.value.ultrasound_file_uuids);
            break;
        case 'lab':
            selected_additional.value.lab_file_uuids = file_uuids;
            lab_files.value = await fetch_files_by_uuids(selected_additional.value.lab_file_uuids);
            break;
        case 'rg':
            selected_additional.value.rg_file_uuids = file_uuids;
            rg_files.value = await fetch_files_by_uuids(selected_additional.value.rg_file_uuids);
            break;
        case 'ct':
            selected_additional.value.ct_file_uuids = file_uuids;
            ct_files.value = await fetch_files_by_uuids(selected_additional.value.ct_file_uuids);
            break;
    }
}

// Функция сохранения дополнительной информации
async function save_additional_info(medcard_id, additional) {
    let data = await auth.post('save_additional_info', {
        body: JSON.stringify({
            medcard_id: medcard_id,
            doctors_consulted: additional.doctors_consulted,
            mri_file_ids: additional.mri_file_uuids,
            ultrasound_file_ids: additional.ultrasound_file_uuids,
            lab_file_ids: additional.lab_file_uuids,
            rg_file_ids: additional.rg_file_uuids,
            ct_file_ids: additional.ct_file_uuids,
            recommendations: additional.recommendations,
            comment: additional.comment
        }),
    });

    if (data === null) return;

    // После сохранения обновляем дополнительную информацию, включая файлы
    await fetch_additional_info(medcard_id);
}

async function delete_additional_info(additional) {
    if (!additional) return;

    const response = await auth.get('delete_additional_info?' + new URLSearchParams({
      id: additional.id
    }));

    // После сохранения обновляем список жалоб
    await fetch_additional_info(props.medcard_id);
}

async function fetch_additional_info(medcard_id) {
    const response = await auth.post('get_additional_info', {
        body: JSON.stringify({
            medcard_id: medcard_id,
        })
    });

    if (response === null || !Array.isArray(response)) {
        additional_entries.value = [];
        selected_additional_id.value = null;
        return;
    }

    // Маппим полученные данные и форматируем дату
    additional_entries.value = response.map((el) => ({
        id: el.id, // Уникальный идентификатор записи
        medcard_id: el.medcard_id,
        doctors_consulted: el.doctors_consulted || [],
        mri_files: el.mri_files || [],
        ultrasound_files: el.ultrasound_files || [],
        lab_files: el.lab_files || [],
        rg_files: el.rg_files || [],
        ct_files: el.ct_files || [],
        recommendations: el.recommendations || '',
        comment: el.comment || '',
        created_at: moment.unix(el.created_at).format('DD.MM.YYYY HH:mm:ss') || 'Дата неизвестна',
    }));

    // Сортируем записи по id в порядке возрастания
    additional_entries.value.sort((a, b) => a.id - b.id);

    // Добавляем новую запись с id -1 для создания новой записи
    additional_entries.value.push({
        id: -1,
        medcard_id: medcard_id,
        doctors_consulted: [],
        mri_files: [],
        ultrasound_files: [],
        lab_files: [],
        rg_files: [],
        ct_files: [],
        recommendations: '',
        comment: '',
        created_at: "Новый",
    });

    // Выбираем последнюю запись по умолчанию, если ни одна не выбрана
    if (additional_entries.value.length > 0 && selected_additional_id.value === null) {
        selected_additional_id.value = additional_entries.value[additional_entries.value.length - 1].id;
    }
}
// Инициализация при монтировании компонента
onMounted(async () => {
    await fetch_additional_info(props.medcard_id)
})
</script>

<template>
    <div @click="console.log(selected_additional)">
        <v-tabs
            show-arrows
            v-model="selected_additional_id">
            <v-tab
                v-for="additional in additional_entries"
                :key="additional.id"
                :value="additional.id">
                {{ additional.created_at }}
            </v-tab>
        </v-tabs>
        <div v-if="selected_additional !== null">
            <!-- Консультация специалиста -->
            <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
                <div class="me-2">Консультация специалиста:</div>
                
                <!-- Невролог -->
                <div class="flex items-center me-4">
                    <input
                        type="checkbox"
                        :id="'neurologist' + props.medcard_id + selected_additional_id"
                        v-model="selected_additional.doctors_consulted"
                        :value="'neurologist'"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label :for="'neurologist' + props.medcard_id + selected_additional_id" class="ms-2">Невролог</label>
                </div>

                <!-- Терапевт -->
                <div class="flex items-center me-4">
                    <input
                        type="checkbox"
                        :id="'therapist' + props.medcard_id + selected_additional_id"
                        v-model="selected_additional.doctors_consulted"
                        :value="'therapist'"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label :for="'therapist' + props.medcard_id + selected_additional_id" class="ms-2">Терапевт</label>
                </div>

                <!-- Педиатр -->
                <div class="flex items-center me-4">
                    <input
                        type="checkbox"
                        :id="'pediatrician' + props.medcard_id + selected_additional_id"
                        v-model="selected_additional.doctors_consulted"
                        :value="'pediatrician'"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label :for="'pediatrician' + props.medcard_id + selected_additional_id" class="ms-2">Педиатр</label>
                </div>

                <!-- Ортопед -->
                <div class="flex items-center me-4">
                    <input
                        type="checkbox"
                        :id="'orthopedist' + props.medcard_id + selected_additional_id"
                        v-model="selected_additional.doctors_consulted"
                        :value="'orthopedist'"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label :for="'orthopedist' + props.medcard_id + selected_additional_id" class="ms-2">Ортопед</label>
                </div>

                <!-- Стоматолог -->
                <div class="flex items-center me-4">
                    <input
                        type="checkbox"
                        :id="'dentist' + props.medcard_id + selected_additional_id"
                        v-model="selected_additional.doctors_consulted"
                        :value="'dentist'"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label :for="'dentist' + props.medcard_id + selected_additional_id" class="ms-2">Стоматолог</label>
                </div>
            </div>

            <!-- МРТ файлы -->
            <div class="mb-0"></div>
            <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
                <label :for="'file_input_mri_' + props.medcard_id + selected_additional_id" class="w-1/12 sm:w-1/12">МРТ</label>
                <div class="w-1/6">
                    <div v-if="selected_additional.mri_files.length > 0">
                        <ul>
                            <li v-for="file in selected_additional.mri_files" :key="file.id">
                                <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                            </li>
                        </ul>
                    </div>
                    <div v-else>Файлы не найдены</div>
                </div>
                <input @input="on_file_changed($event, 'mri')" 
                    class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    :id="'file_input_mri_' + props.medcard_id + selected_additional_id" 
                    type="file" multiple>
            </div>

            <!-- УЗИ файлы -->
            <div class="mb-0"></div>
            <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
                <label :for="'file_input_ultrasound_' + props.medcard_id + selected_additional_id" class="w-1/12 sm:w-1/12">УЗИ</label>
                <div class="w-1/6">
                    <div v-if="selected_additional.ultrasound_files.length > 0">
                        <ul>
                            <li v-for="file in selected_additional.ultrasound_files" :key="file.id">
                                <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                            </li>
                        </ul>
                    </div>
                    <div v-else>Файлы не найдены</div>
                </div>
                <input @input="on_file_changed($event, 'ultrasound')" 
                    class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    :id="'file_input_ultrasound_' + props.medcard_id + selected_additional_id" 
                    type="file" multiple>
            </div>

            <!-- Лабораторные файлы -->
            <div class="mb-0"></div>
            <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
                <label :for="'file_input_lab_' + props.medcard_id + selected_additional_id" class="w-1/12 sm:w-1/12">Лаб</label>
                <div class="w-1/6">
                    <div v-if="selected_additional.lab_files.length > 0">
                        <ul>
                            <li v-for="file in selected_additional.lab_files" :key="file.id">
                                <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                            </li>
                        </ul>
                    </div>
                    <div v-else>Файлы не найдены</div>
                </div>
                <input @input="on_file_changed($event, 'lab')" 
                    class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    :id="'file_input_lab_' + props.medcard_id + selected_additional_id" 
                    type="file" multiple>
            </div>

            <!-- Рентгеновские файлы -->
            <div class="mb-0"></div>
            <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
                <label :for="'file_input_rg_' + props.medcard_id + selected_additional_id" class="w-1/12 sm:w-1/12">РГ</label>
                <div class="w-1/6">
                    <div v-if="selected_additional.rg_files.length > 0">
                        <ul>
                            <li v-for="file in selected_additional.rg_files" :key="file.id">
                                <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                            </li>
                        </ul>
                    </div>
                    <div v-else>Файлы не найдены</div>
                </div>
                <input @input="on_file_changed($event, 'rg')" 
                    class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    :id="'file_input_rg_' + props.medcard_id + selected_additional_id" 
                    type="file" multiple>
            </div>

            <!-- КТ файлы -->
            <div class="mb-0"></div>
            <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
                <label :for="'file_input_ct_' + props.medcard_id + selected_additional_id" class="w-1/12 sm:w-1/12">КТ</label>
                <div class="w-1/6">
                    <div v-if="selected_additional.ct_files.length > 0">
                        <ul>
                            <li v-for="file in selected_additional.ct_files" :key="file.id">
                                <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                            </li>
                        </ul>
                    </div>
                    <div v-else>Файлы не найдены</div>
                </div>
                <input @input="on_file_changed($event, 'ct')" 
                    class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    :id="'file_input_ct_' + props.medcard_id + selected_additional_id" 
                    type="file" multiple>
            </div>

            <!-- Рекомендации и комментарии -->
            <div class="font-bold mb-4">Рекомендации</div>
            <textarea v-model="selected_additional.recommendations" 
                    class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"></textarea>
            <div class="mb-0"></div>
            <textarea v-model="selected_additional.comment" 
                    class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700" 
                    placeholder="Комментарий записи..."></textarea>
            <div class="mb-0"></div>

            <div v-if="selected_additional_id !== null && selected_additional_id === -1" class="flex justify-end">
                <PrimaryBtn 
                @click="save_additional_info(props.medcard_id, selected_additional)" 
                class="block mb-0 content-end"
                :disabled="selected_additional === null"
                >
                Добавить
                </PrimaryBtn>
            </div>
            <div v-else class="flex justify-end">
                <PrimaryBtn 
                @click="delete_additional_info(selected_additional)" 
                class="block mb-0 content-end"
                :disabled="selected_additional === null"
                >
                Удалить
                </PrimaryBtn>
            </div>
        </div>
        <div v-else class="text-gray-500 p-3">
            Пожалуйста, выберите запись из списка.
        </div>
    </div>
</template>

<style scoped>
.truncate {
    display: inline-block;
    max-width: 150px; /* Настройте по необходимости */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
