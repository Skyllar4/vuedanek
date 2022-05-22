import Vue from 'vue';
import VueRouter from 'vue-router';

import AppProducts from './components/AppProducts';
import ProductsCard from './components/ProductsCard';
import AppCategories from './components/AppCategories';
import AppBrands from './components/AppBrands';
import AppNotFound from './components/AppNotFound';

Vue.use(VueRouter);

let routes = [
    { name: 'products', path: '/', component: AppProducts},
    { name: 'productsCard', path: '/products/:id', component: ProductsCard},
    { name: 'categories', path: '/categories', component: AppCategories },
    { name: 'brands', path: '/brands', component: AppBrands},
    { name: 'notFound', path: '*', component: AppNotFound}
];

export default new VueRouter({
    // mode: 'history',
    routes
});