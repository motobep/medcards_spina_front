import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue, { defaultOptions } from 'primevue/config';
import Notifications from '@kyvg/vue3-notification'
import VueScrollableTabs from "vue-scrollable-tabs";
import PrimaryBtn from '@components/buttons/PrimaryBtn.vue'
import vSelect from 'vue-select'
import 'primevue/resources/themes/aura-light-indigo/theme.css';
import '../node_modules/flowbite-vue/dist/index.css'
import '@mdi/font/css/materialdesignicons.css';

// vuetify
// -------------
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// -------------

if (
	localStorage.getItem('color-theme') === 'dark' ||
	(!('color-theme' in localStorage) &&
		window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}

const vuetify = createVuetify({
	components,
	directives,
	
	icons: {
		iconfont: 'mdi', // Используем Material Design Icons
	},
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(Notifications)
app.use(VueScrollableTabs)
app.component('v-select', vSelect)
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
app.use(vuetify);

app.component('PrimaryBtn', PrimaryBtn)
app.mount('#app')

