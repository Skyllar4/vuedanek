<template>
    <div>
        <h1>Категории</h1>
        <pre>{{ categories }}</pre>
    </div>
</template>

<script>
    export default {
        computed: {
            categories () {
                return this.$store.state.categories.all;
            }
        }
    }
</script>