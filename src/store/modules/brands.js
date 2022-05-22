import _ from 'lodash';
import axios from 'axios';

const state = {
    all: []
};

const getters = {};

const mutations = {
    SET_BRANDS (state, brands) {
        state.all = brands;
    },
    ADD_BRAND (state, brand) {
        state.all.push(brand);
    },
    REMOVE_BRAND (state, brandId) {
        state.all = state.all.filter(brand => brand.id !== brandId);
    },
    UPDATE_BRAND (state, payload) {
        let brand = _.find(state.all, { id: payload.id });
        brand.title = payload.title;
    }
};

const actions = {
    getBrands (context) {
        axios
            .get('/admin/api/v1/brands')
            .then(response => {
                context.commit('SET_BRANDS', response.data.records)
            });
    },
    addBrand (context, newBrand) {
        const data = 'title=' + newBrand;

        return new Promise((resolve, reject) => {
            axios
                .post('/admin/api/v1/brands', data)
                .then(response => {
                    context.commit('ADD_BRAND', response.data);
                    resolve(response);
                }, error => {
                    reject(error);
                });
        });
    },
    removeBrand (context, brandId) {
        axios
            .delete('/admin/api/v1/brands/' + brandId)
            .then(response => {
                context.commit('REMOVE_BRAND', response.data.id)
            });
    },
    updateBrand (context, payload) {
        const data = 'title=' + payload.title;

        axios
            .put('/admin/api/v1/brands/' + payload.id, data)
            .then(response => {
                context.commit('UPDATE_BRAND', payload)
            });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}