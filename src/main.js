import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue, { defaultOptions } from 'primevue/config';

import 'primevue/resources/themes/aura-light-indigo/theme.css';

import PrimaryBtn from '@components/buttons/PrimaryBtn.vue'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    unstyled: false,
	locale: {
		...defaultOptions.locale,
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		firstDayOfWeek: 1,
        monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
    }
});
app.component('PrimaryBtn', PrimaryBtn)
app.mount('#app')

