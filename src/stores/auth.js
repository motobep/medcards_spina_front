import { computed } from 'vue'
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', () => {
	const jwt = computed(() => getCookie('jwt'))
	function saveJwt(token) {
		setCookie('jwt', token, {
			'SameSite': 'Strict',
		})
	}

	function deleteJwt() {
		setCookie('jwt', '', {
			'SameSite': 'Strict',
			'expires': 'Thu, 01 Jan 1970 00:00:00 UTC',
		})
	}

	return { jwt, saveJwt, deleteJwt }
})


export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
