import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		products: [
			{name: 'Banana', price: 20},
			{name: 'Apple', price: 30},
			{name: 'Mango', price: 40},
			{name: 'Guava', price: 50}
		],
		MenuOptions: [
			// {name: 'Dashboard', icon: 'glyphicon-dashboard'},
			{name: 'Users', icon: 'glyphicon-user'},
			{name: 'Food Items', icon: 'glyphicon-glass'},
			{name: 'Order Records', icon: 'glyphicon-list-alt'}
		]
	}
})