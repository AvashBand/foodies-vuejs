<template>
	<div class="container-fluid">
		<Menu-Bar></Menu-Bar>
		<button id="logo" class="success-div" v-bind:class="{ShowBox:ShowLogoutBox}" v-on:click="CancelLogout">
			 <i class= "glyphicon glyphicon-ok"></i>
		</button>	
		<div id="page-container">
			<div>
				<span class="user-addressing">
					Welcome
					<span style="font-size: 18px; font-weight:normal;">{{ UserName }}!</span>
				</span>
			</div>
			<div class="table-area w3-container w3-center w3-animate-opacity" v-if="!ShowOrderPanel">
				<div style="margin:50px;">
					<div class="order-completed">
						Please Select a food item that you prefer.
						<i class= "glyphicon glyphicon-ice-lolly"></i>
					</div>
				</div>
				<table>
				  <tr>
				    <th>SN</th>
				    <th>Food Name</th>
				    <th>Order</th>
				  </tr>
				  <tr v-for="food in Foods">
				    <td> {{ food.id }} </td>
				    <td>{{ food.name }}</td>
				    <td>
				    	<button class="btn btn-primary" v-on:click="CreateOrder" :value="food.id">Order</button>
				    </td>
				  </tr>
				</table>
			</div>
			
			<!-- Order Panel -->
			<div class="table-area w3-container w3-center w3-animate-opacity" v-if="ShowOrderPanel">
				<div   style="margin:50px;">
					<div class="order-completed">
						You've already ordered your lunch for today.	
						<i class= "glyphicon glyphicon-ice-lolly-tasted"></i>
						<br/>
						<img style="margin-top:20px;" src="../assets/EmptyPlate.png">
					</div>
					<div class="ordered-item">
						<span style="font-weight:600; padding-right:20px;">Ordered Item:</span>{{ orderedFood.food_name }}
						<div class="button-area" style="padding-top: 50px;">
							<span class="margin-right:30px; font-size:20px">Want to cancel your order?</span>
							<button class="btn btn-success btn-lg" style="font-size: 20px;" v-on:click="CancelOrder">Click Here</button>
						</div>
					</div>
				</div>
			</div>


		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				sN : 0,
				ShowLogoutBox : false,
				ShowOrderPanel : false,
				Foods : [],
				UserName : '',
				orderedFood: {
					order_id : '',
					food_name : ''
				}
			}
		},
		methods:{
			Show : function(){
				this.ShowLogoutBox = true;
				var self = this;
				setTimeout(function(){
					self.ShowLogoutBox = false;	
					self.ShowOrderPanel = true;
				}, 800);
			},
			CancelLogout : function(){
				this.ShowLogoutBox = false;
			},
			Navigate : function(){
				this.$router.push('/');
			},
			CancelOrder: function(){
				axios({
					method: 'put',
					url: 'http://foods.test/api/order/' + this.orderedFood.order_id,
					headers:{
						'Content-Type' : 'application/json',
						'Accept' : 'application/json',
						'Authorization' : 'Bearer ' + localStorage.getItem('token'),
					}
				}).then( 
					response => { 
						this.orderedFood.order_id = '';
						this.orderedFood.food_name = ''; 								
						this.ShowOrderPanel = false;
					}
				 );
			},
			CreateOrder: function(e){
				const data = {
					"food_id" : e.target.value 
				}

				axios({
					method: 'post',
					url: 'http://foods.test/api/order',
					data: data,
					headers:{
						'Content-Type' : 'application/json',
						'Accept' : 'application/json',
						'Authorization' : 'Bearer ' + localStorage.getItem('token'),
					}
				}).then(
					response => {
						if (response.status == 201) {
							this.orderedFood.order_id = response.data.order_id;
							this.orderedFood.food_name = response.data.food_name; 								
							this.Show();
						}
					}	
				);

			}
		},
		created(){
			this.UserName = localStorage.getItem('name');

			axios({
				method: 'get',
				url: 'http://foods.test/api/foods',
				headers:{
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
					'Authorization' : 'Bearer ' + localStorage.getItem('token'),
				}
			}).then(
				response => {
					this.Foods = response.data.data;
				}
			);
		},
		mounted(){
			axios({
				method: 'get',
				url: 'http://foods.test/api/order/hasordered',
				headers:{
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
					'Authorization' : 'Bearer ' + localStorage.getItem('token'),
				}
			}).then(
				response => {
					if (response.data.hasOrdered) 
					{
						this.orderedFood.order_id = response.data.order_id;
						this.orderedFood.food_name = response.data.food_name;
						this.ShowOrderPanel = true;
					}
				}
			);	
		}
	}
</script>
<style>
	.success-div{
		outline: none;
		visibility: hidden;
		height: 100px;
		position: absolute;
		z-index: 3;
		top:35%;
		left: 45%;
		border-radius: 50%;
		font-size: 40px;
		font-weight: bold;
		padding: 20px 29px;
		background-color: #39e600;
		color: white;
		border: 2px solid #e6e6e6;
		/*opacity: 0;*/
	}
	.LogoutMessage{
		text-align: center;
		margin-bottom: 20px;
		font-size: 18px;
		font-weight: 600;
	}
	.button-area{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ShowBox{
		visibility: visible;
		animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}
	@keyframes shake {
	  0% { opacity: 0 }
	  30% {opacity : 1}
	  10%, 90% { transform: translate3d(-1px, 0, 0); }
	  20%, 80% { transform: translate3d(2px, 0, 0); }
	  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
	  40%, 60% { transform: translate3d(4px, 0, 0); }
	  70% {opacity : 1}
	  100% { opacity: 0; visibility: hidden;}
	}
	.menu-show-button{
		visibility: hidden;
	}
	.side-bar{
		visibility: hidden;
	}
	.container-fluid{
		margin: 0px;
		padding: 0px;
		background-color: #ffe5ec;
	}
	#page-container{
		min-height: 590px;
		max-height: 590px;
		background-color: white;
		position:static;
		padding: 15px;
		transition: 0.2s;
		width: auto;
		margin: -10px 10px 10px 10px;
	}
	.user-addressing{
		font-size: 20px; 
		font-weight:600; 
		padding-right:10px; 
		float:right;
	}
	.order-completed{
		margin-top:20px;
		font-size: 38px;
		padding: 10px;
		text-align: center;
		font-weight: 600;
		transition: 0.3s;
	}
	.ordered-item{
		padding: 40px;
		font-size:30px;
		text-align:center;
		transition: 0.3s;
	}
	.ordered-image{
		margin-top:40px;
		height: 150px;
		transition: 0.3s;
	}
	.btn-lg{
		font-size: 20px;
		transition: 0.3px;
		margin-left: 10px;
	}
	@media screen and (max-width: 1000px){
		.order-completed{
			margin-top:20px;
			font-size: 25px;
			transition: 0.3s;

		}
		.ordered-item{
			font-size:20px;
			transition: 0.3s;
		}
		.ordered-image{
			margin-top:10px;
			height: 100px;
			transition: 0.3s;
		}
		.btn-lg{
			font-size: 15px;
			transition: 0.3px;
		}
	}
	table {
	    border-collapse: collapse;
	    border-spacing: 0;
	    width: 100%;
	    border: 1px solid #ddd;
	}

	th, td {
	    text-align: left;
	    padding: 10px;
	}

	th {
		background-color: black;
	    color: white;
	}
	tr:nth-child(even) {
	    background-color: #f2f2f2
	}
	td{
		padding: 5px; 
	}
</style>