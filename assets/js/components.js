import Vue from 'vue'

Vue.component('bc', {
    data: function () {
      return {
        count: 0
      }
    },
    props: ['channel'],
    template: '<button v-on:click="tryit">You got list</button>',
    methods: {
        tryit: function(){

        console.log("pushing")
        this.$parent.$appChannel.push("deck:new", { x: "y" })
      }
    }
  })