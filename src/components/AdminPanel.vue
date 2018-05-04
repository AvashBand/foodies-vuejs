<template>
	<div class="container-fluid">
		<Menu-Bar v-bind:MenuToggle="MenuToggle"></Menu-Bar>
		<div id="PageContainer" style="visibility: visible;">
			
		</div>
	</div>
</template>

<script>
	export default {
	  components: {

	  },
	  data(){
	    return{
	    	MenuToggle:{
	    	  ShowUser : false,
	    	  ShowFood: true,
	    	  ShowOrder : false
	    	}
	    }
	  },
	  methods:{
	  	
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
		transition: 0.2s;
		width: 98%;
		margin: 60px 10px 10px 10px;
		/*width: calc(100% - 250px);*/
	}

</style>

