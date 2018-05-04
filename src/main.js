import Vue from 'vue'
import App from './App.vue';
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import { store } from './store/store'
import MenuBar from './components/MenuBar.vue'
import UsersTable from './components/UsersTable.vue'
import FoodTable from './components/FoodTable.vue'
import OrderRecords from './components/OrderRecords.vue'
import VueCookie from 'vue-cookie'
import Auth from './packages/Oauth.js'
 
Vue.use(VueRouter);
Vue.use(VueCookie);

Vue.component('Menu-Bar', MenuBar);
Vue.component('User-table', UsersTable);
Vue.component('food-table', FoodTable);
Vue.component('order-table', OrderRecords);


const router = new VueRouter({
	routes : Routes, 
	mode: 'history'
});

router.beforeEach(
	(to, from, next) => {

		if (to.matched.some(record => record.meta.forVisitors)) {
			if(isActive()){
				if (isAdmin()) 
				{
				   next('/usertable');	
				}
				else{
				   next('/fullui');	
				}
			}
			else{
				next();
			}
		}

		else if (to.matched.some(record => record.meta.forAuth)) {

			if(!isActive()){
			   next('/');	
			}

			else{
				if (to.matched.some(record => record.meta.forAdmin)) {
					if (isAdmin()) 
					{
					   next();	
					}
					else{
					   next('/error403');	
					}
				}
				else{
					next();
				}
			}
		}
		else if (to.matched.some(record => record.meta.forAll)){
			next();
		}

		else{
			next('/error404');
		}
	}
)

function isActive(){
	if (localStorage.getItem('is_active') != null) {
		return  localStorage.getItem('is_active') != 0 ? true : false;
	}
	return false;
}

function isAdmin(){
	if (localStorage.getItem('is_active') != null) {
		return localStorage.getItem('is_admin') != 0 ? true : false; 
	}
}

Vue.filter('snippet', function(value){
	return value.slice(0,100)+ '...';
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
})
