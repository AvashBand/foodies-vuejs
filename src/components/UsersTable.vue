<template>
	<div class="container-fluid">
		<Menu-Bar></Menu-Bar>
		<div id="PageContainer" v-bind:class="PageContainerTransition" style="visibility: visible;">
			<div class="Dashboard">
				<span style="font-weight:bold; font-size:20pt; padding-right:10px;">
					<i class= "glyphicon glyphicon-user" style="font-size:18px; margin:0px 20px;"></i>User Table
				</span>
				<span style="font-weight:600;">Admin Panel</span>
			</div>
			<div class="ContentBox">
				<table class="table" style="border: 3px solid #e6e6e6;">
				  <thead class="thead-dark">
				    <tr>
				      <th scope="col">SN</th>
				      <th scope="col">Username</th>
				      <th scope="col">Full Name</th>
				      <th scope="col">Status</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr v-for="user in users">
				      <td scope="row"> {{ user.id }} </td>
				      <td> {{ user.email }} </td>
				      <td> {{ user.name }} </td>
				      <td>
				      	<label class="switch">
				      	
					      	<div v-if="user.is_active">
					      	  <input type="checkbox" checked/>
					      	  <span class="slider round" v-on:click="activateUser" :id="user.id"></span>
					      	</div>
					      	<div v-else>
					      		<input type="checkbox" unchecked />
					      		<span class="slider round" v-on:click="activateUser" :id="user.id"></span>
					      	</div>
				      	</label>
				      </td>
				    </tr>
				  </tbody>
				</table>
			</div>
		</div>	
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				SideBarOpened : false,
				users: []
			}
		},
		methods:{
			ToggleSideBar : function(){
				if(document.getElementById("PageContainer").style.marginLeft == "260px"){
					this.SideBarOpened = true;
					console.log(this.SideBarOpened);
				}
				else{
					this.SideBarOpened = false;
					console.log(this.SideBarOpened);
				}
			},
			activateUser: function(e){
				var user_id = e.target.id;
				axios({
						method: 'post',
						url: 'http://foods.test/api/admin/members/' + user_id,
						headers:{
							'Content-Type' : 'application/json',
							'Accept' : 'application/json',
							'Authorization' : 'Bearer ' + localStorage.getItem('token'),
						}
					});
			}

		},
		created(){

			axios({
				method: 'get',
				url: 'http://foods.test/api/admin/members',
				headers:{
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
					'Authorization' : 'Bearer ' + localStorage.getItem('token'),
				}
			}).then(
				response => {
					this.users = response.data.data;
				}
			);
		}
	}
</script>
<style scoped>
	.container-fluid{
		margin: 0px;
		padding: 0px;
		background-color: #ffe5ec;
	}
	#PageContainer{
		background-color: white;
		position:static;
		/*left: calc(238px);*/
		padding: 15px;
		width: 98%;
		margin: -10px 10px 10px 10px;
		/*width: calc(100% - 250px);*/
	}
	.ContentBox{
		min-height: 520px;
		max-height: 520px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		/*background-color: #f4f4f4;*/
		padding: 10px;
		height: auto;
		margin-bottom: 0px;
		/*background-color: rgba(222, 222, 222, 1);*/
	}

	/*Switch*/
	.switch {
	  position: relative;
	  display: inline-block;
	  width: 50px;
	  height: 26px;
	}

	/* Hide default HTML checkbox */
	.switch input {display:none;}

	/* The slider */
	.slider {
	  position: absolute;
	  cursor: pointer;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  background-color: #ccc;
	  -webkit-transition: .4s;
	  transition: .4s;
	}

	.slider:before {
	  position: absolute;
	  content: "";
	  height: 20px;
	  width: 20px;
	  left: 2px;
	  bottom: 3px;
	  background-color: white;
	  -webkit-transition: .4s;
	  transition: .4s;
	}

	input:checked + .slider {
	  background-color: #2196F3;
	}

	input:focus + .slider {
	  box-shadow: 0 0 1px #2196F3;
	}

	input:checked + .slider:before {
	  -webkit-transform: translateX(26px);
	  -ms-transform: translateX(26px);
	  transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
	  border-radius: 34px;
	}

	.slider.round:before {
	  border-radius: 50%;
	}
</style>