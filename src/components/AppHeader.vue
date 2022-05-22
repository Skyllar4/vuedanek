<template>
    <header class="sticky">
        <a href="/" class="logo">Webdevkin</a>
        <router-link
            v-for="tab in tabs"
            :key="tab.link"
            :to="tab.link"
            tag="button"
            class="button"
        >{{ tab.title }}</router-link>
        <a href="/admin/api/v1/auth/logout" class="button">Выйти</a>
    </header>
</template>

<script>
    export default {
        props: ['tabs']
    }
</script>

<style lang="scss">
    .button.router-link-exact-active {
        border-bottom: solid 3px steelblue;
    }
</style>