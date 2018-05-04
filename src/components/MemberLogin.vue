<template>
	<div>
		<div class="splash-container">
			<div class="home-splash">
				<img class="home-splash" src="../assets/HomeSplash.gif">
			</div>
		</div>
		<div id="loginbox">
			<img src="../assets/loginAvatar.png" class="avatar">
			<h1 style="font-weight:600; margin-bottom:20px; color:#b30059;">Login Here</h1>
			<div>
				<p>Username</p>
				<input type="text" id="txtUsername" value="" autocomplete="off" placeholder="Enter Username" v-on:click="hideErrors" v-on:keyup.enter="GetChar(event)"  v-model="User.Username">
				<br>
				<p v-bind:class="{UsernameError:UErrorShown}" class="errorMsg">Please Enter Username</p>
				<p>Password</p>

				<input type="password" id="txtPassword" placeholder="Enter Password" v-on:click="hideErrors" v-on:keyup.enter="GetChar(event)" v-model="User.Password">
				<p v-bind:class="{PasswordError:PErrorShown}" class="errorMsg">Please Enter Password</p>

				<div width="100%" style="margin-top: 20px; margin-bottom: 30px;">
					<p v-bind:class="{UsernameAndPasswordError:UPErrorShown}" class="errorMsg" style="float:left;">Username or Password Error</p>

					<button type="button" class="btnRefresh " v-on:click="ClearTextBox">
						<img src="../assets/reload.png" width="30px;">
					</button>
				</div>
				<br>
				<button class="btnSubmit" v-on:click="LoginValidation">Log In</button>
				<br/>
				<br/>
				<a href="#">Forgot your Password?</a><br>
				 <router-link to="/reg" exact>
				 	<a>Create a new Account</a>
				 </router-link>
				
				<br>
			</div>	
		</div>
	</div>
</template>

<script type="text/javascript">

import axios from 'axios'
import qs from 'qs'

	export default{
		components: {

		},
		data(){
			return{
				User: {
					Username: "",
					Password: ""
				},
				UErrorShown : false,
				PErrorShown : false,
				UPErrorShown : false,
				token : "",
			}
		},
		
		methods:{
			LoginValidation : function(){
				var Uname = this.User.Username;
				var Pword = this.User.Password;
				if(Uname == "" && Pword == ""){
					
					this.UErrorShown = true;
					this.PErrorShown = true;
				}
				else{

					const data = {
						grant_type : "password",
						client_id : "2",
						client_secret : "d4XkOlnJCUJWsD2Gne9bASIZIDgzK8dz21VoIGYo",

						username: this.User.Username,
						password : this.User.Password
						}

						axios({
							method: 'post',
							url: 'http://foods.test/oauth/token',
							data: data,
							headers: {
									  'Content-Type' : 'application/json',
									  'Accept' : 'application/json'
									}

						}).then(
							response => {
								console.log(response);
								localStorage.setItem('token', response.data.access_token);
								localStorage.setItem('expiration', response.data.expires_in + Date.now());
								axios({
									method: 'get',
									url: 'http://foods.test/api/user',
									data: data,
									headers: {
											  'Content-Type' : 'application/json',
											  'Accept' : 'application/json',
											  'Authorization' : 'Bearer ' + response.data.access_token,
											},

								}).then(
									response => {
										console.log(response);
										localStorage.setItem('name', response.data.name);
										localStorage.setItem('username', response.data.email);
										localStorage.setItem('is_active', response.data.is_active);
										localStorage.setItem('is_admin', response.data.is_admin);
										
										if (localStorage.getItem('is_admin') != null && localStorage.getItem('is_admin') != 0) 
										{
											this.$router.push('/usertable');
											return;
										}

										this.$router.push('/fullui');
									}

								);

								
							}

						).catch(error => {
							
							if (error == 'Error: Request failed with status code 401') {
								this.UPErrorShown = true;
								localStorage.removeItem('token');
								localStorage.removeItem('expiration');
								localStorage.removeItem('is_active');
								localStorage.removeItem('is_admin');
							}

						});
				}
			},

			afterValidated: function(){
				alert('sample');
				
			},

			hideErrors: function(){
				this.UErrorShown = false;
				this.PErrorShown = false;
				this.UPErrorShown = false;
			},
			GetChar : function(e){

			},
			ClearTextBox : function(){
				this.User.Username = "";
				this.User.Password = "";
				this.hideErrors();
			}
		}
	}
</script>

<style scoped>
	.splash-container{
		background-color: rgb(255, 0, 64, 0.1);
		width: 100%;
		height: 662px;
		z-index: 5;
	}

	.home-splash{
		position: fixed;
		top:-50px;
		left: 35%;
		min-width: 80%;
		z-index: -1;
	}
	#loginbox{
		width: 320px;
		height: 500px;	
		background: rgba(255, 255, 255, 0.8);	
		color: #000;
		top: 50%;
		left: 17%;
		position: absolute;
		transform: translate(-50%, -50%);
		padding: 90px 20px;
		border-radius: 10px;
		box-shadow: 3px 6px 8px #888888;
	}

	.avatar{
		width: 120px;
		height: 120px;
		border-radius: 50%;
		position: absolute;
		top: -60px;
		left: calc(50% - 50px);
	}

	h1{
		margin: 0px;
		padding: 0px;
		text-align: center;
		font-size: 22px;
		margin-bottom: 10px;
	}

	#loginbox p{
		margin: 0px;
		padding: 0px;
		font-weight: bold;
	}
	#loginbox input{
		width: 100%;
		margin-bottom: 20px;
	}

	#loginbox input[type="text"], input[type="password"]{
		border: none;
		border-bottom: 1px solid #000;
		background : transparent;
		outline: none;
		height: 40px;
		color: #000;
		font-size: 16px;
	}

	.btnSubmit{
		border: none;
		outline: none;
		height: 40px;
		background-color: #e6005c;
		color: #fff;
		font-size: 17px;
		border-radius: 30px;
		width: 100%;
	}

	.btnSubmit:hover{
		cursor: pointer;
		background: #ffc107;
		color: #000;
	}

	#loginbox a{
		text-decoration: none;
		font-size: 12px;
		line-height: 25px;
		color: green;
		font-weight:600;
	}
	#loginbox a:hover{
		color: #ffc107;
	}

	.errorMsg{
		text-align: right;
		color: red;
		font-size: 12px;
		line-height: 0px;
		visibility: hidden;
	}

	.UsernameError{
		visibility: visible;
	}
	.PasswordError{
		visibility: visible;
	}
	.UsernameAndPasswordError{
		text-align: left;
		line-height: 20px;
		visibility: visible;
	}

	.btnRefresh{
	    background-color: transparent;
	    border: none;
	    color: white;
	    padding: 5px;
	    font-size:18px;
	    cursor: pointer;
	    background-repeat: no-repeat;
	    float: right;
	    margin-bottom: 10px;
	}
	.btnRefresh:hover {
	    background-color: rgb(199, 191, 191, 0.3);
	    border-radius: 50%;
	}


</style>