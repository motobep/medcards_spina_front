<template>
	<div class="flex items-center flex-col w-full mt-14">
    <h1 class="text-lg font-bold mb-4">Войти</h1>
    <div>
        <form action="/manager/login" method="POST">
            <div class="mb-1 ml-2">Логин</div>
            <input name="username" class="border border-gray-500 rounded-xl px-2 py-0.5 mb-3 dark:bg-gray-700" type="text"> <br>
            <div class="mb-1 ml-2">Пароль</div>
            <input name="password" class="border border-gray-500 rounded-xl px-2 py-0.5 mb-3 dark:bg-gray-700" type="password"> <br>
            <button id="send" type="submit" class="border border-gray-700 bg-gray-100 rounded-md px-2 mt-4 dark:bg-gray-800 dark:shadow-sm dark:shadow-gray-700">Войти</button>
        </form>
    </div>
</div>
</template>
