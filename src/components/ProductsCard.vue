<template>
    <div>
        <div v-if="product">
            <table>
                <caption>{{ product.title }} (артикул {{ product.id }})</caption>
                <thead>
                    <tr>
                        <th>Свойство</th>
                        <th>Значение</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="field in fields"
                        :key="field.key"
                    >
                        <td data-label="key">{{ field.title }}</td>
                        <td data-label="value">{{ field.value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <h1>Товар не найден</h1>
        </div>
    </div>
</template>

<script>
    import config from '../configs/products';

    export default {
        computed: {
            productId () {
                return +this.$route.params.id;
            },
            product () {
                return this.$store.getters['products/getProduct'](this.productId);
            },
            fields () {
                return config.cardFields.map(field => {
                    return {
                        key: field.key,
                        title: field.title,
                        value: this.product[field.key]
                    }
                });
            }
        }
    }
</script>
