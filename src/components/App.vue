<template>
    <div id="app">
        <div class="container">
            <header
                is="AppHeader"
                :tabs="tabs"
            ></header>

            <div class="row">
                <div class="col-sm-1"></div>
                <router-view class="col-sm-10"></router-view>
                <div class="col-sm-1"></div>
            </div>

            <footer is="AppFooter"></footer>
        </div>
    </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

export default {
    name: 'app',
    components: {
        AppHeader,
        AppFooter
    },
    data () {
        return {
            tabs: [{
                link: '/',
                title: 'Товары'
            }, {
                link: '/categories',
                title: 'Категории'
            }, {
                link: '/brands',
                title: 'Бренды'
            }]
        }
    },
    created () {
        this.$store.dispatch('categories/getCategories');
        this.$store.dispatch('brands/getBrands');
        this.$store.dispatch('products/getProducts');
    }
}
</script>
