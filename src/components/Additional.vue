<script setup>
import { auth } from '@/helpers'
import { truncate } from '@/utils' // Предполагается, что функция truncate экспортируется из '@/utils'
import { ref, onMounted } from 'vue'

const props = defineProps(['medcard_id'])

const doctors_consulted = ref([]);
const mri_file_uuids = ref([]);
const mri_files = ref([]);
const ultrasound_file_uuids = ref([]);
const ultrasound_files = ref([]);
const lab_file_uuids = ref([]);
const lab_files = ref([]);
const rg_file_uuids = ref([]);
const rg_files = ref([]);
const ct_file_uuids = ref([]);
const ct_files = ref([]);
const drug_therapy = ref(null);
const recommendations = ref(null);
const comment = ref(null);

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
            mri_file_uuids.value = file_uuids;
            mri_files.value = await fetch_files_by_uuids(mri_file_uuids.value);
            break;
        case 'ultrasound':
            ultrasound_file_uuids.value = file_uuids;
            ultrasound_files.value = await fetch_files_by_uuids(ultrasound_file_uuids.value);
            break;
        case 'lab':
            lab_file_uuids.value = file_uuids;
            lab_files.value = await fetch_files_by_uuids(lab_file_uuids.value);
            break;
        case 'rg':
            rg_file_uuids.value = file_uuids;
            rg_files.value = await fetch_files_by_uuids(rg_file_uuids.value);
            break;
        case 'ct':
            ct_file_uuids.value = file_uuids;
            ct_files.value = await fetch_files_by_uuids(ct_file_uuids.value);
            break;
    }
}

// Функция сохранения дополнительной информации
async function save(medcard_id) {
    let data = await auth.post('save_additional_info', {
        body: JSON.stringify({
            medcard_id: medcard_id,
            doctors_consulted: doctors_consulted.value,
            mri_file_ids: mri_file_uuids.value,
            ultrasound_file_ids: ultrasound_file_uuids.value,
            lab_file_ids: lab_file_uuids.value,
            rg_file_ids: rg_file_uuids.value,
            ct_file_ids: ct_file_uuids.value,
            drug_therapy: drug_therapy.value,
            recommendations: recommendations.value,
            comment: comment.value
        }),
    });

    if (data === null) return;

    // После сохранения обновляем дополнительную информацию, включая файлы
    await fetch_additional_info(medcard_id);
}

// Функция получения дополнительной информации
async function fetch_additional_info(medcard_id) {
    let data = await auth.post('get_additional_info', {
        body: JSON.stringify({
            medcard_id: medcard_id,
        })
    })
    if (data === null) return;

    if (Object.keys(data).length === 0) {
        return;
    }

    if (data.doctors_consulted !== null) doctors_consulted.value = data.doctors_consulted;
    mri_file_uuids.value = data.mri_file_ids || [];
    mri_files.value = data.mri_files || [];
    ultrasound_file_uuids.value = data.ultrasound_file_ids || [];
    ultrasound_files.value = data.ultrasound_files || [];
    lab_file_uuids.value = data.lab_file_ids || [];
    lab_files.value = data.lab_files || [];
    rg_file_uuids.value = data.rg_file_ids || [];
    rg_files.value = data.rg_files || [];
    ct_file_uuids.value = data.ct_file_ids || [];
    ct_files.value = data.ct_files || [];
    drug_therapy.value = data.drug_therapy;
    recommendations.value = data.recommendations;
    comment.value = data.comment;
}

// Инициализация при монтировании компонента
onMounted(async () => {
    await fetch_additional_info(props.medcard_id)
})
</script>

<template>
    <div>
        <!-- Консультация специалиста -->
        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">
            <div class="me-2">Консультация специалиста:</div>
            
            <!-- Невролог -->
            <div class="flex items-center me-4">
                <input
                    type="checkbox"
                    :id="'neurologist' + props.medcard_id"
                    v-model="doctors_consulted"
                    :value="'neurologist'"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label :for="'neurologist' + props.medcard_id" class="ms-2">Невролог</label>
            </div>

            <!-- Терапевт -->
            <div class="flex items-center me-4">
                <input
                    type="checkbox"
                    :id="'therapist' + props.medcard_id"
                    v-model="doctors_consulted"
                    :value="'therapist'"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label :for="'therapist' + props.medcard_id" class="ms-2">Терапевт</label>
            </div>

            <!-- Педиатр -->
            <div class="flex items-center me-4">
                <input
                    type="checkbox"
                    :id="'pediatrician' + props.medcard_id"
                    v-model="doctors_consulted"
                    :value="'pediatrician'"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label :for="'pediatrician' + props.medcard_id" class="ms-2">Педиатр</label>
            </div>

            <!-- Ортопед -->
            <div class="flex items-center me-4">
                <input
                    type="checkbox"
                    :id="'orthopedist' + props.medcard_id"
                    v-model="doctors_consulted"
                    :value="'orthopedist'"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label :for="'orthopedist' + props.medcard_id" class="ms-2">Ортопед</label>
            </div>

            <!-- Стоматолог -->
            <div class="flex items-center me-4">
                <input
                    type="checkbox"
                    :id="'dentist' + props.medcard_id"
                    v-model="doctors_consulted"
                    :value="'dentist'"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label :for="'dentist' + props.medcard_id" class="ms-2">Стоматолог</label>
            </div>
        </div>

        <!-- МРТ файлы -->
        <div class="mb-0"></div>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
            <label :for="'file_input_mri_' + props.medcard_id" class="w-1/12 sm:w-1/12">МРТ</label>
            <div class="w-1/6">
                <div v-if="mri_files.length > 0">
                    <ul>
                        <li v-for="file in mri_files" :key="file.id">
                            <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                        </li>
                    </ul>
                </div>
                <div v-else>Файлы не найдены</div>
            </div>
            <input @input="on_file_changed($event, 'mri')" 
                   class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                   :id="'file_input_mri_' + props.medcard_id" 
                   type="file" multiple>
        </div>

        <!-- УЗИ файлы -->
        <div class="mb-0"></div>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
            <label :for="'file_input_ultrasound_' + props.medcard_id" class="w-1/12 sm:w-1/12">УЗИ</label>
            <div class="w-1/6">
                <div v-if="ultrasound_files.length > 0">
                    <ul>
                        <li v-for="file in ultrasound_files" :key="file.id">
                            <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                        </li>
                    </ul>
                </div>
                <div v-else>Файлы не найдены</div>
            </div>
            <input @input="on_file_changed($event, 'ultrasound')" 
                   class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                   :id="'file_input_ultrasound_' + props.medcard_id" 
                   type="file" multiple>
        </div>

        <!-- Лабораторные файлы -->
        <div class="mb-0"></div>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
            <label :for="'file_input_lab_' + props.medcard_id" class="w-1/12 sm:w-1/12">Лаб</label>
            <div class="w-1/6">
                <div v-if="lab_files.length > 0">
                    <ul>
                        <li v-for="file in lab_files" :key="file.id">
                            <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                        </li>
                    </ul>
                </div>
                <div v-else>Файлы не найдены</div>
            </div>
            <input @input="on_file_changed($event, 'lab')" 
                   class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                   :id="'file_input_lab_' + props.medcard_id" 
                   type="file" multiple>
        </div>

        <!-- Рентгеновские файлы -->
        <div class="mb-0"></div>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
            <label :for="'file_input_rg_' + props.medcard_id" class="w-1/12 sm:w-1/12">РГ</label>
            <div class="w-1/6">
                <div v-if="rg_files.length > 0">
                    <ul>
                        <li v-for="file in rg_files" :key="file.id">
                            <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                        </li>
                    </ul>
                </div>
                <div v-else>Файлы не найдены</div>
            </div>
            <input @input="on_file_changed($event, 'rg')" 
                   class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                   :id="'file_input_rg_' + props.medcard_id" 
                   type="file" multiple>
        </div>

        <!-- КТ файлы -->
        <div class="mb-0"></div>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
            <label :for="'file_input_ct_' + props.medcard_id" class="w-1/12 sm:w-1/12">КТ</label>
            <div class="w-1/6">
                <div v-if="ct_files.length > 0">
                    <ul>
                        <li v-for="file in ct_files" :key="file.id">
                            <a :href="'/api/get_file?uuid=' + file.id" class="truncate">{{ truncate(file.name, 10) }}</a>
                        </li>
                    </ul>
                </div>
                <div v-else>Файлы не найдены</div>
            </div>
            <input @input="on_file_changed($event, 'ct')" 
                   class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                   :id="'file_input_ct_' + props.medcard_id" 
                   type="file" multiple>
        </div>

        <!-- Рекомендации и комментарии -->
        <div class="font-bold mb-4">Рекомендации</div>
        <textarea v-model="recommendations" 
                  class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"></textarea>
        <div class="mb-0"></div>
        <textarea v-model="comment" 
                  class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700" 
                  placeholder="Комментарий записи..."></textarea>
        <div class="mb-0"></div>

        <!-- Кнопка сохранения -->
        <div class="flex justify-end">
            <PrimaryBtn @click="save(props.medcard_id)" class="block mb-0 content-end">Сохранить</PrimaryBtn>
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
