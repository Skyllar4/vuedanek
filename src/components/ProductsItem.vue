<template>
    <tr>
        <td>{{ product.id }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.brand }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.rating }}</td>
        <td>
            <router-link
                :to="linkOpen"
                tag="button"
                class="button primary"
            >Открыть</router-link>
        </td>
    </tr>
</template>

<script>
    export default {
        props: ['product'],
        computed: {
            linkOpen () {
                return `/products/${this.product.id}`;
            }
        }
    }
</script>