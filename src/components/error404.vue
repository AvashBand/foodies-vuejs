<template>
	<div class="container-fluid table-area w3-container w3-center w3-animate-opacity">
		<div class="row">
			<div class="col-md-12">
				<div class="error-box">404</div>
				<div style="">
					<p style="font-size:30px; font-weight: 600;">PAGE NOT FOUND</p>
					<p>It looks like you're lost.</p>
				</div>
				<img class="error-image" src="../assets/Error404.png"><br/>
				<button class="btn btn-lg" style=""> TAKE ME OUT OF HERE</button>
			</div>
		</div>
	</div>
</template>

<style>
	body{
		background: rgb(0,249,255);
		background: linear-gradient(103deg, rgba(0,249,255,1) 0%, rgba(172,253,255,1) 0%, rgba(255,255,255,1) 52%, rgba(252,251,175,1) 100%, rgba(246,243,2,1) 100%);
	}
	p{
		margin: 0px;
		text-align: center;
	}
	.container-fluid{
		/*background-color: green;*/
	}
	.btn{
		margin: 40px;
		width:260px;
		color: white;
		background-color:#79A842;
	}	
	.error-box{
		font-size: 80px;
		font-family: 'impact regular';
		color: #79A842;
		text-align : center;
		margin-top:	30px;
	}
	.error-image{
		margin-top: 30px;
		width : 500px;
	}
	@media (max-width: 1000px){
		.error-box{
			font-size: 30px;
			transition: 0.3s;
		}
		.error-image{
			margin-top: 30px;
			width : 100px;
		}

	}
</style>