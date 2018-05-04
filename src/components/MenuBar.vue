<template>
	<div>
		<!-- <Sidebar-nav class="sidebar-nav"></Sidebar-nav>	 -->

		<!-- <Sidebar-nav></Sidebar-nav>	 -->
		<div class="container-fluid">
			<div class="side-bar"><!-- col-md-2 cancel-default-padding-of-col-md-2  -->
				<div id="MySideNav" class="sidenav" v-bind:class="SidenavTransition">
					<ul class="menu-list">
						<!-- <li v-for="Menu in MenuItems">
							<a class="menu-item" v-bind:class="Active">
								<span class="menu-icon">
									<i class= "glyphicon " v-bind:class="Menu.icon"></i>
									<span class="menu-name"> {{ Menu.name }}</span>
								</span>
							</a>
						</li> -->
						<li>
							<router-link to="/usertable" class="router-link">
								<div class="menu-item" v-bind:class="UserTableMenu">
									<span class="menu-icon">
										<i class= "glyphicon glyphicon-user"></i>
										<span class="menu-name"> User Table</span>
									</span>
								</div>
							</router-link>
						</li>
						<li>
							<router-link to="/foodtable" exact class="router-link">
								<div class="menu-item" v-bind:class="FoodTableMenu">
									<span class="menu-icon">
										<i class= "glyphicon glyphicon-glass"></i>
										<span class="menu-name"> Food Table</span>
									</span>
								</div>
							</router-link>
						</li>
						<li>
							<router-link to="/orderrecords" exact class="router-link">
								<div class="menu-item" v-bind:class="OrderRecordsMenu">
									<span class="menu-icon">
										<i class= "glyphicon glyphicon-list-alt"></i>
										<span class="menu-name"> Order Records Table</span>
									</span>
								</div>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Menu Bar	 -->
		<div class="MenuBar" style="visibility:visible;">
			<nav class="navbar navbar-expand-md navbar-fixed-top" style="background-color:#ff1a75;">
				<div class="menu-header">
					<span class="menu-show-button">
						<i class= "glyphicon " v-bind:class="MenuButton"></i>
					</span>
					<span style="float:right;">
						<img src="../assets/foodies.png" style="height:30px;">
					</span>
				</div>
			    <div class="collapse navbar-collapse" id="navbarCollapse">
			        <ul class="navbar-nav mr-auto">
			            <li class="nav-item">
			            </li>
			        </ul>
			        <form class="form-inline mt-2 mt-md-0">
			            <div class="MenuBtn">
			            	<button type="button" style="border-radius:0px; margin-right:30px;" class="btn btn-outline-light" v-on:click="Show">Log Out</button>
			          	</div>
			        </form>
			    </div>
			</nav>
		</div>

		<!-- Log Out Popup -->
		<div class="logoutBox" :class="{ShowBox:ShowLogoutBox}">
			<div class="LogoutMessage">
				<p>Are you sure you want to log out?</p>
			</div>
			<div class="button-area">
				<button class="btn btn-primary" style="margin-right: 10px;" v-on:click="Navigate">Logout</button>
				<button class="btn btn-danger" v-on:click="CancelLogout">Cancel</button>
			</div>
		</div>	
	</div>	
</template>

<script>
	export default {
		mounted(){
			this.ShowSideBar();
			var CurrentPage = this.$route.path;
			switch (CurrentPage) {
				case '/usertable':
						// alert(CurrentPage);
						this.UserTableMenu = 'menu-option-active';
						break;
				case '/foodtable':
						this.FoodTableMenu = 'menu-option-active';
						break;
				case '/orderrecords' :
						this.OrderRecordsMenu = 'menu-option-active';
						;
				default:
						break;
			}
		},
		computed : {
			MenuItems(){
				return this.$store.state.MenuOptions;
			}
		},
		components: {

		},
		data(){
	    	return{
	    		Active : '',
	    		ShowLogoutBox : false,
	    		MenuButton : 'glyphicon-tasks',
	    		UserTableMenu : '',
	    		FoodTableMenu : '',
	    		OrderRecordsMenu : '',	    		
	    		SideBarOpened : false,

	    		//ClickEventChangeTransition
	    		// SidenavTransition : '',
	    		// PageContainerTransition: '',
	    		// ContainerWidth: document.getElementById("PageContainer").getAttribute()
	    		// loadedFrom : 'url'
	    	}
	  	},
	  	methods:{
	  		Show : function(){
	  			this.ShowLogoutBox = true;
	  		},
	  		CancelLogout : function(){
	  			this.ShowLogoutBox = false;
	  		},
	  		Navigate : function(){
	  			localStorage.removeItem('token');
	  			localStorage.removeItem('expiration');
	  			localStorage.removeItem('is_active');
	  			localStorage.removeItem('is_admin');
	  			localStorage.removeItem('name');
	  			localStorage.removeItem('username');
	  			this.$router.push('/');
	  		},
	  		ShowSideBar : function(){
	  			this.MenuButton = 'glyphicon-tasks';
	  			document.getElementById("MySideNav").style.width = "inherit";
	  			document.getElementById("PageContainer").style.marginLeft = "260px";
	  			document.getElementById("PageContainer").style.width = "calc(100% - 20.3%)";
	  			this.SideBarOpened = true;
	  		},
	  		HideSideBar : function(){
	  			this.MenuButton = 'glyphicon-tasks';
	  			document.getElementById("MySideNav").style.width = "0";	
	  			document.getElementById("PageContainer").style.marginLeft = "10px";
	  			document.getElementById("PageContainer").style.width = "98%";
	  			this.SideBarOpened = false;
	  		},
	  		ToggleNav : function(){
	  			if(this.SideBarOpened == false){	
	  				this.ShowSideBar();
	  			}
	  			else{
	  				if(this.SideBarOpened == true){
	  					this.HideSideBar();	
	  				}
	  			}
	  		}
	  	}
	}
</script>
	
<!-- Style For MenuBar and Logout PopUp -->
<style scoped>
	.router-link{
		text-decoration: none;
		color: white;
	}
	.MenuBar{
		z-index: -1;
		border: none;
		outline: none;
	}
	.logoutBox{
		z-index: 1;
		position: absolute;
		width: 250px;
		height: 140px;
		background-color: rgb(0, 0, 0, 0.9);
		color: white;
		border: 2px solid #e6e6e6;
		border-radius: 5px;
		padding: 10px;
		top: 20%;
		left: 40%;
		visibility: hidden;
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
	  10%, 90% { transform: translate3d(-1px, 0, 0); }
	  20%, 80% { transform: translate3d(2px, 0, 0); }
	  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
	  40%, 60% { transform: translate3d(4px, 0, 0); }
	}

	.blink_me{
		background-color: red;
    	animation-name: example;
    	animation-duration: 4s;
	}
	@keyframes example {
	    from {background-color: red;}
	    to {background-color: yellow;}
	}

	.btn{
		width: 90px;
	}
</style>

<style scoped>
	.sidenav{
		height: 612px;
		width: 0;
		position: relative;
		z-index: 0;
		top: 0px;
		left: 0;
		background-color: #b30047;
		overflow: hidden;
/*		animation-name: animation;
		animation-duration: 1s;
		animation-iteration-count: 1;*/
	}
	.sidenav-transition{
		transition: 0.2s;
	}
	.sidenav-fixed{
		transition: 0s;
	}
	.PageContainer-transition{
		transition: 0.2s;
	}
	.PageContainer-fixed{
		transition: 0s;
	}
/*	@keyframes animation {
		0% {
			transform: translateX(-300px);
			opacity: 0;					
		}

		50% {
			transform: translateX(0px);
			opacity: 1;			
		}
	}*/
	.menu-header{
		/*background-color: #537093;*/
		height: 49px;
		/*background-color: #405772;*/
		color: white;
		padding: 10px 20px;
		margin-left: 0px;
		font-size: 18px;
		font-weight: bold;
		position: absolute;
		top:0px;
		left: 0px;  
	}
	.menu-show-button{
		transition: 0.3s;
	}
	.menu-show-button:hover{
		cursor: pointer;
		color: #ffe5ec;
	}
	.cancel-default-padding-of-col-md-2{
		padding-left: 0px;
		padding-right: 0px;
	}
	.side-bar{
		width: 250px;
		height: calc(100% - 50px);
		color: white;
		z-index: 3;
		position: absolute;
		top: 50px;
		left: 0px;
	}
	.menu-list{
		list-style-type: none;
		padding: 0px;
	}
	.menu-icon{
		font-size: 14px;
	}
	.menu-name{
		padding-left: 15px;
	}

	.menu-item{
		display: block;
		padding: 15px 20px;
		color: #fff;
		text-decoration: none;
		transition: 0.3s;
	}
	.menu-item:hover{
		background-color: #660029;
		cursor: pointer;
	}
	.menu-option-active{
		background-color: #cc0052;
	}
</style>
