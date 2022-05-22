<template>
    <div>
        <h1>Бренды</h1>
        <brands-new />
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Бренд</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <tr
                    is="BrandsItem"
                    v-for="brand in brands"
                    :brand="brand"
                    :key="brand.id"
                ></tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import BrandsItem from './BrandsItem';
    import BrandsNew from './BrandsNew';

    export default {
        components: {
            BrandsItem,
            BrandsNew
        },
        computed: {
            brands () {
                return this.$store.state.brands.all;
            }
        }
    }
</script>
