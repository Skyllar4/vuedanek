<template>
    <div>
        <select v-model="filter.selectCategory">
            <option value="0">Все категории</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
        </select>

        <select v-model="filter.selectBrand">
            <option value="0">Все бренды</option>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.title }}</option>
        </select>

        <label>Фильтр по цене</label>
        <input v-model.number="filter.minPrice" type="number" />
        <input v-model.number="filter.maxPrice" type="number" />

        <input v-model.trim="filter.inputSearch" type="text" placeholder="Поиск по названию товара" />

        <select v-model="filter.selectSort">
            <option v-for="rule in sortRules" :key="rule.key" :value="rule.key">{{ rule.title }}</option>
        </select>

        <button @click="clear" class="primary small">Сбросить фильтры</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "ProductsFilters",
        data () {
            return {
                sortRules: [
                    { key :'id:asc', title: 'По порядку' },
                    { key :'rating:desc', title: 'По рейтингу' },
                    { key :'price:asc', title: 'По цене, сначала дешевые' },
                    { key :'price:desc', title: 'По цене, сначала дорогие' }
                ],
                filter: {
                    inputSearch: '',
                    selectCategory: 0,
                    selectBrand: 0,
                    minPrice: 0,
                    maxPrice: 0,
                    selectSort: 'id:asc'
                }
            }
        },
        computed: {
            ...mapGetters('products', {
                minPriceAll: 'minPrice',
                maxPriceAll: 'maxPrice'
            }),
            categories () {
                return this.$store.state.categories.all;
            },
            brands () {
                return this.$store.state.brands.all;
            },
            products () {
                return this.$store.state.products.all;
            }
        },
        mounted () {
            this.clear();
        },
        watch: {
            products () {
                this.filter.minPrice = this.minPriceAll;
                this.filter.maxPrice = this.maxPriceAll;
            },
            filter: {
                handler (newFilter) {
                    this.$emit('filter', newFilter);
                },
                deep: true
            }
        },
        methods: {
            clear () {
                this.filter = {
                    inputSearch: '',
                    selectCategory: 0,
                    selectBrand: 0,
                    minPrice: this.minPriceAll,
                    maxPrice: this.maxPriceAll,
                    selectSort: 'id:asc'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>