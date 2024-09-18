<script setup>
import { auth } from '@/helpers'
import { ref, onMounted } from 'vue'
const props = defineProps(['medcard_id'])

const doctors_consulted = ref([]);
const mri_file_uuid = ref(null);
const ultrasound_file_uuid = ref(null);
const lab_file_uuid = ref(null);
const rg_file_uuid = ref(null);
const ct_file_uuid = ref(null);
const drug_therapy = ref(null);
const non_drug_therapy = ref(null);
const comment = ref(null);

async function on_file_changed(event, input_name) {
    if (event.target.files === null) return;
    if (event.target.files.length != 1) return;

    var data = new FormData()
    data.append('file', event.target.files[0])
    let resp_data = await auth.post('upload_file',
		{
			body: data
		}
	)

    if (resp_data === null) return;


    switch (input_name) {
        case 'mri':
            mri_file_uuid.value = resp_data['uuid'];
            break;
        case 'ultrasound':
            ultrasound_file_uuid.value = resp_data['uuid'];
            break;
        case 'lab':
            lab_file_uuid.value = resp_data['uuid'];
            break;
        case 'rg':
            rg_file_uuid.value = resp_data['uuid'];
            break;
        case 'ct':
            ct_file_uuid.value = resp_data['uuid'];
            break;
    }
}

async function save(medcard_id) {
    let data = await auth.post('save_additional_info', {
        body: JSON.stringify({
            medcard_id: medcard_id,
            doctors_consulted: doctors_consulted.value,
            mri_file_id: mri_file_uuid.value,
            ultrasound_file_id: ultrasound_file_uuid.value,
            lab_file_id: lab_file_uuid.value,
            rg_file_id: rg_file_uuid.value,
            ct_file_id: ct_file_uuid.value,
            drug_therapy: drug_therapy.value,
            non_drug_therapy: non_drug_therapy.value,
            comment: comment.value
        }),
    });

    if (data === null) return;
}

async function fetch_additional_info(medcard_id) {
    let data = await auth.post('get_additional_info', {
		body: JSON.stringify({
			medcard_id: medcard_id,
		})
	})
	if (data === null) return;

    if (data.length == 0) {
		return;
	}
	
    if (data.doctors_consulted !== null) doctors_consulted.value = data.doctors_consulted;
    mri_file_uuid.value = data.mri_file_id;
    ultrasound_file_uuid.value = data.ultrasound_file_id;
    lab_file_uuid.value = data.lab_file_id;
    rg_file_uuid.value = data.rg_file_id;
    ct_file_uuid.value = data.ct_file_id;
    drug_therapy.value = data.drug_therapy;
    non_drug_therapy.value = data.non_drug_therapy;
    comment.value = data.comment;
}

onMounted(async () => {
	await fetch_additional_info(props.medcard_id)
})


</script>


<template>
    <div>
        <div class="w-full flex-none flex items-center p-10 sm:p-6 lg:p-5 xl:p-0">

            <div class="me-2">Консультация специалиста:</div>
            
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
      
        <div class="mb-0"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label :for="'file_input' + props.medcard_id" class="w-1/12 sm:w-1/12">МРТ</label>
            <a v-if="mri_file_uuid" class="w-1/6" v-bind:href="'/api/get_file?uuid='+mri_file_uuid">Скачать</a>
            <a v-else class="w-1/6">Файл не найден</a>
            <input @input="on_file_changed($event, 'mri')" class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" :id="'file_input' + props.medcard_id" type="file">
		</div>
        <div class="mb-0"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label :for="'file_input' + props.medcard_id" class="w-1/12 sm:w-1/12">УЗИ</label>
            <a v-if="ultrasound_file_uuid" class="w-1/6" v-bind:href="'/api/get_file?uuid='+ultrasound_file_uuid">Скачать</a>
            <a v-else class="w-1/6">Файл не найден</a>
            <input @input="on_file_changed($event, 'ultrasound')" class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" :id="'file_input' + props.medcard_id" type="file">
		</div>
        <div class="mb-0"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
            <label :for="'file_input' + props.medcard_id" class="w-1/12 sm:w-1/12">Лаб</label>
            <a v-if="lab_file_uuid" class="w-1/6" v-bind:href="'/api/get_file?uuid='+lab_file_uuid">Скачать</a>
            <a v-else class="w-1/6">Файл не найден</a>
            <input @input="on_file_changed($event, 'lab')" class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" :id="'file_input' + props.medcard_id" type="file">
		</div>
        <div class="mb-0"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label :for="'file_input' + props.medcard_id" class="w-1/12 sm:w-1/12">Rg</label>
            <a v-if="rg_file_uuid" class="w-1/6" v-bind:href="'/api/get_file?uuid='+rg_file_uuid">Скачать</a>
            <a v-else class="w-1/6">Файл не найден</a>
            <input @input="on_file_changed($event, 'rg')" class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" :id="'file_input' + props.medcard_id" type="file">
		</div>
        <div class="mb-0"/>
        <div class="flex items-center mb-2 w-full p-10 sm:p-6 lg:p-5 xl:p-0">
			<label :for="'file_input' + props.medcard_id" class="w-1/12 sm:w-1/12">Кт</label>
            <a v-if="ct_file_uuid" class="w-1/6" v-bind:href="'/api/get_file?uuid='+ct_file_uuid">Скачать</a>
            <a v-else class="w-1/6">Файл не найден</a>
            <input @input="on_file_changed($event, 'ct')" class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" :id="'file_input' + props.medcard_id" type="file">
		</div>
        <div class="mb-0"/>

        <div class="font-bold mb-4">Медикаментозная терапия</div>
        <textarea v-model="drug_therapy" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"/>
        <div class="mb-0"/>

        <div class="font-bold mb-4">Не медикаментозная терапия</div>
        <textarea v-model="non_drug_therapy" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700"/>
        <div class="mb-0"/>

        <textarea v-model="comment" class="border border-gray-500 w-11/12 rounded-xl p-3 dark:bg-gray-700" placeholder="Комментарий записи..."/>
        <div class="mb-0"/>

        <div class="flex justify-end">
			<PrimaryBtn @click="save(medcard_id)" class="block mb-0 content-end">Сохранить</PrimaryBtn>
		</div>
    </div>
</template>