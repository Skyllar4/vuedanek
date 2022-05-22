import _ from 'lodash';
import axios from 'axios';

const state = {
    all: []
};

const getters = {
    minPrice: (state) => {
        return state.all.length
            ? Number(_.minBy(state.all, 'price').price)
            : 0;
    },
    maxPrice: (state) => {
        return state.all.length
            ? Number(_.maxBy(state.all, 'price').price)
            : 0;
    },
    getProductsByFilter: state => filter => {
        // Фильтруем товары
        let filtered = state.all
            // По категории
            .filter(product => {
                return filter.selectCategory == 0 || product.categoryId == filter.selectCategory;
            })

            // По брендам
            .filter(product => {
                return filter.selectBrand == 0 || product.brandId == filter.selectBrand;
            })

            // По ценам
            .filter(product => {
                return Number(product.price) >= filter.minPrice && Number(product.price) <= filter.maxPrice;
            })

            // По полю поиска
            .filter(product => {
                return filter.inputSearch == '' || product.title.toLowerCase().indexOf(filter.inputSearch.toLowerCase()) !== -1;
            });

        // Сортируем
        let sortKey = filter.selectSort.split(':')[0];
        let sortDir = filter.selectSort.split(':')[1];

        let sorted = _.sortBy(filtered, product => {
            return Number(product[sortKey]);
        });

        // При необходимости сортируем в обратном направлении
        if (sortDir === 'desc') {
            sorted = sorted.reverse();
        }

        return sorted;
    },

    getProduct: (state, getters, rootState, rootGetters) => (id) => {
        let product = _.find(state.all, { id: id });

        if (product) {
            let category = rootGetters['categories/getCategory'](product.categoryId);

            return _.extend(product, {
                category: category.title
            });
        } else {
            return null;
        }
    }
};

const mutations = {
    SET_PRODUCTS (state, products) {
        state.all = products;
    }
};

const actions = {
    getProducts (context) {
        axios
            .get('/admin/api/v1/products')
            .then(response => {
                context.commit('SET_PRODUCTS', response.data.records)
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