<template>
    <div>
        <h1>Список товаров</h1>
        <products-filters @filter="filter"></products-filters>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Название</th>
                    <th>Бренд</th>
                    <th>Цена</th>
                    <th>Рейтинг</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    is="ProductsItem"
                    v-for="product in filteredProducts"
                    :product="product"
                    :key="product.id"
                ></tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import ProductsFilters from './ProductsFilters'
    import ProductsItem from './ProductsItem'

    export default {
        components: {
            ProductsFilters,
            ProductsItem
        },
        data () {
            return {
                filteredProducts: []
            }
        },
        methods: {
            filter (filter) {
                this.filteredProducts = this.$store.getters['products/getProductsByFilter'](filter);
            }
        }
    }
</script>

<style lang="scss" scoped>
    table {
        max-height: 1000px;
    }
</style>
