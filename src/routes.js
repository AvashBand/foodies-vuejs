import MemberLogin  from './components/MemberLogin.vue';
import MemberReg  from './components/MemberRegistration.vue';
// import AdminPanel  from './components/AdminPanel.vue';
import OrderPanel  from './components/OrderPanel.vue';

import UserTable  from './components/UsersTable.vue';
import FoodTable from './components/FoodTable.vue';
import OrderRecords from './components/OrderRecords.vue';

import UserfullUI from './components/USERFULLUI.vue'
import error403 from './components/Error403.vue'
import error404 from './components/error404.vue'

import test from './components/test.vue'

export default [
	{ 
		path: '/test',  
		component: test,
		meta: {
			forVisitors: true
		} 
	},
	{ 
		path: '/',  
		component: MemberLogin,
		meta: {
			forVisitors: true
		} 
	},
	{ 
		path: '/reg', 
		component: MemberReg,
		meta: {
			forVisitors: true
		} 
	},
	{ 
		path: '/order', 
		component: OrderPanel,
		meta: {
			forAuth: true
		} 
	},
	{ 
		path: '/fullui',  
		component: OrderPanel,
		meta: {
			forAuth: true
		}
	},

	{ 
		path: '/usertable',  
		component: UserTable,
		meta: {
			forAuth: true,
			forAdmin: true
		}
	},
	{ 
		path: '/foodtable',  
		component: FoodTable,
		meta: {
			forAuth: true,
			forAdmin: true
		}
	},
    { 
    	path: '/orderrecords',  
    	component: OrderRecords,
    	meta: {
			forAuth: true,
			forAdmin: true
		}
    },
    { 
    	path: '/error403',  
    	component: error403,
    	meta:{
    		forAll: true
    	}
    },
    {
    	path: '/error404',
    	component: error404,
    	meta:{
    		forAll: true
    	}
    }

]