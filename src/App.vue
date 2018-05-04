<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import MemberLogin from './components/MemberLogin.vue'
  import MemberReg from './components/MemberRegistration.vue'
  import OrderPanel from './components/OrderPanel.vue'
 
  export default {
    components: {
      // 'Menu-Bar': MenuBar
    },

    name: 'app',
    data(){
      return{

      }
    }
  }


</script>

<style type="text/css">
  body{
    margin: 0;
    font-size: 16px;
    padding : 0px;
    font-family :  'Raleway', sans-serif;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
  }
</style>