import { createApp } from 'vue'
import App from './App.vue'
import  tickerAdd from  "@/components/tickerAdd.vue"
// import graph from "@/components/tickerGraph.vue"

createApp(App).mount('#app')

App.component('ticker-add', {
  tickerAdd
})

// App.component('graph', {
//   graph
// })