<template>
	<div class="container">

		<div class="row">
			<div class="col-md-12">
				<h2 align="center">Test Form</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-1">
				<label for="txtID">ID</label>
			</div>
			<div class="col-md-4">
				<input v-model="id" type="text" class="form-control" id="txtID">
			</div>
			<div class="col-md-4"></div>
		</div>
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-1">
				<label for="txtName">Name</label>
			</div>
			<div class="col-md-4">
				<input v-model="name" type="text" class="form-control" id="txtName">
			</div>
			<div class="col-md-4"></div>
		</div>
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-1">
				<label for="txtPost">Post</label>
			</div>
			<div class="col-md-4">
				<input v-model="post" type="textPost" class="form-control" id="txtPost">
			</div>
			<div class="col-md-4"></div>
		</div>
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-1">
				<label for="txtSalary">Salary</label>
			</div>
			<div class="col-md-4">
				<input v-model="salary" type="number" class="form-control" id="txtSalary">
			</div>
			<div class="col-md-4"></div>
		</div>
		<div class="row">
			<div class="col-md-4"></div>
			<div class="col-md-2">
				<button v-on:click="submitData" class="form-control btn btn-outline-success">Submit</button>
			</div>
			<div class="col-md-2">
				<button v-on:click="resetData" class="form-control btn btn-outline-danger">Reset</button>
			</div>
			<div class="col-md-4"></div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				id : '',
				name : '',
				post : '',
				salary : ''
			}
		},
		methods: {
			submitData : function(){
				var employee = {
					name : this.name,
					post : this.post,
					salary : this.salary
				};
				axios({
					menthod : 'post',
					header : {
						'Content-type' : 'application/json',
						'Accept' : 'application/json'
					},
					data : employee
				}).then(
					response => {
						alert(response);
					}
				);				
			},
			resetData : function(){
				this.id = '';
				this.name = '';
				this.post = '';
				this.salary = '';
			}
		}
	}
</script>
<style>
	body{
		background-color: grey;
	}
	.container{
		background-color: #e6e6e6;
		padding: 20px;
		margin-top: 100px;
	}
	.row{
		padding: 5px;
	}
	.btn{
		border-radius: 0;
		width: 150px;
	}
</style>