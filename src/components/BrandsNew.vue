<template>
    <div>
        <label
            role="button"
            for="modal-control"
            class="tertiary"
        >Добавить бренд</label>

        <input
            v-model="visible"
            type="checkbox"
            id="modal-control"
            class="modal"
        >
        <div role="dialog" aria-labelledby="dialog-title">
            <div class="card">
                <label for="modal-control" class="modal-close"></label>
                <h3 class="section" id="dialog-title">Новый бренд</h3>
                <p class="section">
                    <input
                        v-model="newBrand"
                        @focus="clearError"
                        type="text"
                        placeholder="Название бренда"
                    />
                    <mark
                        v-if="isError"
                        class="inline-block secondary"
                    >{{errorMessage}}</mark>
                    <button
                        @click="addBrand"
                        class="tertiary"
                    >Добавить</button>
                    <button @click="closeModal">Отмена</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import config from '../configs/brands';

    export default {
        name: "BrandsNew",
        data () {
            return {
                visible: false,
                newBrand: '',
                errorCode: ''
            }
        },
        computed: {
            isError () {
                return this.errorCode !== '';
            },
            errorMessage () {
                return this.errorCode !== ''
                    ? _.find(config.errors, { code: this.errorCode }).message
                    : '';
            }
        },
        methods: {
            setError (errorCode) {
                this.errorCode = errorCode;
            },
            clearError () {
                this.errorCode = '';
            },
            validate (brand) {
                if (brand === '') {
                    this.setError('brand_empty');
                    return false;
                }
                if (brand.length > 20) {
                    this.setError('brand_long_title');
                    return false;
                }

                // Если валидация прошла успешно
                this.clearError();
                return true;
            },
            addBrand () {
                if (this.validate(this.newBrand)) {
                    this.$store.dispatch('brands/addBrand', this.newBrand).then(
                        response => {
                            this.newBrand = '';
                            this.closeModal();
                        },
                        error => {
                            let resp = error.response;
                            let errorCode = (resp && resp.data && resp.data.code) ? resp.data.code : 'unknown_error';
                            this.setError(errorCode);
                        });
                }
            },
            closeModal () {
                this.visible = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        input {
            width: 98%;
        }
        mark {
            display: block;
            margin: 5px 0 10px 5px;
        }
        button {
            width: 44%;
            margin-left: 2%;
        }
    }
</style>