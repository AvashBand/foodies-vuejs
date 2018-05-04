<template>
	<div class="container-fluid table-area w3-container w3-center w3-animate-opacity">
		<div class="row">
			<div class="col-md-12">
				<div class="error-box">403</div>
				<div style="color:white;">
					<p style="font-size:30px; font-weight: 600;">ACCESS DENIED/FORBIDDEN</p>
					<p>The page you were trying to request is absolutely forbidden for some reasons.</p>
				</div>
				<img class="error-image" src="../assets/Error403.png"><br/>
				<button class="btn btn-lg" style=""> TAKE ME OUT OF HERE</button>
			</div>
		</div>
	</div>
</template>

<style>
	body{
		background: rgb(255,255,255);
		background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(246,2,2,1) 0%, rgba(122,17,15,1) 66%, rgba(122,17,15,1) 86%);
	}
	p{
		margin: 0px;
		text-align: center;
	}
	.container-fluid{
		/*background-color: green;*/
	}
	.btn{
		margin: 95px;
		width:260px; 
		color: white;
		background-color:#ff1619;
	}
	.btn:hover{
		color: white;
		background-color: #e42023;/*#820406;*/
	}
	.error-box{
		font-size: 80px;
		font-family: 'stencil regular';
		color: white;
		text-align : center;
		margin-top:	30px;
	}
	.error-image{
		margin-top: 30px;
		width : 200px;
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