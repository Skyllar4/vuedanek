<template>
    <tr>
        <td>{{ brand.id }}</td>
        <td>
            <div v-if="!editing">
                {{ brand.title }}
                <span
                    class="icon-edit"
                    title="Редактировать"
                    @click="editEnter(brand)"
                ></span>
            </div>
            <div v-if="editing">
                <input
                    v-model="brand.title"
                    type="text"
                    placeholder="Введите название бренда"
                />
                <button
                    class="primary"
                    @click="editSave(brand)"
                >OK</button>
                <button
                    class="secondary"
                    @click="editCancel(brand)"
                >Отмена</button>
            </div>
        </td>
        <td>
            <button
                class="secondary"
                @click="remove(brand.id)"
            >Удалить</button>
        </td>
    </tr>
</template>

<script>
    export default {
        props: ['brand'],
        data () {
            return {
                editing: false,
                oldTitle: ''
            }
        },
        methods: {
            remove (id) {
                this.$store.dispatch('brands/removeBrand', id);
            },
            editEnter (brand) {
                this.oldTitle = brand.title;
                this.editing = true;
            },
            editCancel (brand) {
                brand.title = this.oldTitle;
                this.editing = false;
            },
            editSave (brand) {
                this.$store.dispatch('brands/updateBrand', brand);
                this.editing = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .icon-edit {
        cursor: pointer;
    }
</style>