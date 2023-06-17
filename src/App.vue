<template>


  <body>
    <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div class="container">
        <section>
          <div class="flex">
            <div class="max-w-xs">
              <label for="wallet" class="block text-sm font-medium text-gray-700"
                >Тикер</label
              >
              <div class="mt-1 relative rounded-md shadow-md">
                <input 
                  v-model = "tickName"
                  type="text"
                  name="wallet"
                  id="wallet"
                  class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  placeholder="Например DOGE"
                />
              </div>
              <div class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
                <span v-if="this.masOfSearch[0]" @click=" this.tickName = this.masOfSearch[0];console.log(typeof(this.tickName)); this.masOfSearch = [null,null,null,null];" class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
                  {{ this.masOfSearch[0] }}
                </span>
                <span v-if="this.masOfSearch[1]" @click="this.tickName = this.masOfSearch[1]" class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
                  {{ this.masOfSearch[1] }}
                </span>
                <span v-if="this.masOfSearch[2]"  @click="this.tickName = this.masOfSearch[2]" class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
                  {{ this.masOfSearch[2] }}
                </span>
                <span v-if="this.masOfSearch[3]" @click="this.tickName = this.masOfSearch[3]" class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
                  {{ this.masOfSearch[3] }}
                </span>
              </div >
              <div v-if="isOne()" class="text-sm text-red-600">Такой тикер уже добавлен</div>
            </div>
          </div>
          <button
          v-if="!isOne()"
          @click="add"           
          type="button"
          class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg
              class="-ml-0.5 mr-2 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#ffffff"
            >
              <path
                d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              ></path>
            </svg>
            Добавить
          </button>
        </section>
        
        <button v-if="pageCurent >1"
          @click="pageCurent = pageCurent-1"              
          type="button"
          class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Назад
          </button>
        <button
        v-if="pageCurent < getPageCount()"
            type="button"
            @click ="pageCurent = pageCurent+1"  
            class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Вперед
            </button>
      

          <!-- <hr v-if="`${tikers ? tickers.length}` "   class="w-full border-t border-gray-600 my-4" /> -->
          <input  

                  @change="this.pageCurent = 1"
                  v-model = "filterValue"
                  type="text"
                  name="wallet"
                  id="filter"
                  class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  placeholder="Введите название тикера для фильтра:"
                />
          <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <!-- <div v-for="tick in tickers.slice((this.pageCurent - 1)*4 , this.pageCurent*4)" -->
          <div v-for="tick in this.filteredTickers"
                
                :key="tick.tickName" >
                <ticker-add 
                  :isReached="tick.isReached" 
                  :class="{'border-4' : this.sel === tick}"
                  class="bg-white overflow-hidden shadow rounded-lg border-purple-800  border-solid cursor-pointer"
                  @click.stop="sel = tick; this.graph = []"
                  @ticker-delete="deleteCurentTicker"
                  @graph-hide = "this.sel = ''"
                  :tickName="tick.tickName" 
                  :price="tick.priceTicker"
                  >
                 
                
                </ticker-add>
              </div>
           
           
          </dl>
          <hr v-if="` tickers ? tictickers.length`" class="w-full border-t border-gray-600 my-4" />
        <section v-if="sel"   class="relative">
        
          <div>
            <ticker-graph :graph = "[...this.graph]"  :sel="sel" @graph-hide="this.sel = ''; "></ticker-graph>
          </div>
        </section>
      </div>
    </div>
  </body>

</template>

<script>
import tickerAdd from '@/components/tickerAdd.vue';
import tickerGraph from '@/components/tickerGraph.vue';

import {nextTick } from 'vue';

import {subscribeOnTicker, unsubscribeOnTicker } from './components/api.js'

// import { get } from 'https';



export default{
  components : { tickerGraph, tickerAdd},

  data(){
    return{
      count_column_of_graph : 1,

      curentPrice : "-",
      tickName : "",
      filterValue : "",
      tickers : null,
      graph : [],
      sel : "",
      listOfCoins : [],
      masOfSearch : [],
      pageCurent : 1,
      pageCount : 1,
      countTickersOnPage : 3,
    } 
  },
  async created(){
    // setInterval(
   

    const data = await fetch("https://min-api.cryptocompare.com/data/all/coinlist?summary=true");
    // const data = dataExchange;
    localStorage.setItem("coins", Object.keys((await data.json()).Data) )
    // localStorage.setItem("coins", Object.keys((await data.json()).Data) )
    console.log(localStorage.coins.split(","))
    this.listOfCoins = localStorage.coins.split(",")
    

    

    this.tickers = JSON.parse(localStorage.getItem("addTickers"))
    console.log(this.tickers)
 
    // this.tickers.forEach(ticker =>  { this.updateInfoTickers(ticker)
    // this.getPageCount();
    
    // })
  

    const params = Object.fromEntries(new URL(window.location).searchParams.entries())

    if (params.filter){
      this.filterValue = params.filter;
    }

    if (params.page){
      this.pageCurent = params.page;
    } 
    
    
    // console.log(localStorage["addTickers"])

    
  },
  methods :{

    add(){
      
      
      if (this.tickName){
        const newTicker = {
        tickName: this.tickName,
        priceTicker : "-",
        isReached : true,

      }
      this.sel = newTicker;


      if ( !this.tickers){ 
      this.tickers = []
      }
      console.log('123123213123123',this.tickers)

      this.tickers.push(newTicker)
    subscribeOnTicker(this.tickName, (name_of_failed_ticker) => this.change_color_of_ticker(name_of_failed_ticker) )
    subscribeOnTicker(this.tickName, (fromsymbol, newprice) => this.updateInfoTickers(fromsymbol,newprice))
   


    
      
//console.log(name_of_failed_ticker, "нет в списке!!!!!!!!!!!!!")

  

      localStorage.setItem("addTickers", JSON.stringify(this.tickers))
      
      }
   
    },
    change_color_of_ticker(name_of_failed_ticker){
      console.log("Цвет поменялся")
      console.log("Тикер для замены",name_of_failed_ticker)
      // this.tickers.filter(t => t.tickName === name_of_failed_ticker  ).isReached = false;
      console.log( this.tickers.filter(t => (t.tickName === name_of_failed_ticker)).forEach(t => t.isReached = false ))
      console.log(this.tickers)
      console.log(this.tickers.filter(t => console.log(t)))
    },


    async return_graph_column_width(){
      if(!document.querySelector(".column_of_graph")){
        return 
      }
      console.log("Ширина колонки графа", document.querySelector(".column_of_graph").clientWidth)
        return(document.querySelector(".column_of_graph").clientWidth)
      },
    async return_graph_width(){
      await nextTick() 
      console.log("Ширина  графа", document.querySelector("#graph").clientWidth)
      return(document.querySelector("#graph").clientWidth)
    },

    async return_count_column_of_graph(){
      const columnW = await this.return_graph_column_width();
      const graphW = await this.return_graph_width();
      this.count_column_of_graph = Math.floor(graphW/columnW)

      console.log("количество колонок на странице",this.count_column_of_graph)
    },

    control_graph_column(){
      
      try{
        
        this.return_count_column_of_graph();
        console.log(this.count_column_of_graph)
        if(this.graph.length >= this.count_column_of_graph){
          console.log("Resize!!!!!1")
          while(this.graph.length >= this.count_column_of_graph){
              this.graph.shift()
          }
        }
        
      }catch{
        console.log("Error")
      }
    },
    

    



    updateInfoTickers(updatingTicker, changed_price){
      
      this.control_graph_column();
      console.log("Updating coin ", updatingTicker)
      this.tickers.filter(t => t.tickName === updatingTicker  ).priceTicker = changed_price;
      
      console.log( this.tickers.filter(t => (t.tickName === updatingTicker)).forEach(t => t.priceTicker = changed_price ))
      if (this.sel.tickName === updatingTicker){
        this.graph.push(changed_price);
      }
      

      this.return_count_column_of_graph();  
      
      
    },

   
  
    deleteCurentTicker(tickName1){
      

      this.tickers = this.tickers.filter((tick) => tickName1 != tick.tickName );
      localStorage.setItem("addTickers", JSON.stringify(this.tickers));
      this.sel = null;
      this.pageCount = this.getPageCount()
      unsubscribeOnTicker(tickName1);
      if ((this.tickers.length % this.countTickersOnPage === 0)  &&  (this.pageCurent != 1)){
        this.pageCurent = this.pageCurent -1;
        console.log(this.pageCurent)
      }
      unsubscribeOnTicker(tickName1);

      



    },

    isOne(){
      if (this.tickers){
        for (let i=0;i< this.tickers.length; i++ ){

          if( this.tickName.toLowerCase() === this.tickers[i].tickName.toLowerCase()){
            return true
            }
          }
        return false}

    return false

    },

    getPageCount(){
      if (this.tickers){
        this.pageCount =  Math.ceil(this.tickers.filter( el => el.tickName.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0 ).length
                                                                    / this.countTickersOnPage);

      // console.log(this.pageCount)
      return this.pageCount
      }
      return 1
      
    },


    findMaches(){
      this.masOfSearch = []
      for(let i =0; i < this.listOfCoins.length; i++ ){
        
        if ( this.listOfCoins[i].toLowerCase().indexOf(this.tickName.toLowerCase()) >= 0 ){
          this.masOfSearch.push(this.listOfCoins[i])
          
        }
        if (this.masOfSearch.length >= 4){
          this.masOfSearch = [...this.masOfSearch].sort()
          break
        }
      }
      
    }
  },




    mounted() {
    window.addEventListener('resize', this.control_graph_column)
   
    // window.addEventListener('resize', ()=> console.log('resize!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1') );  
    

  },
  unmounted() {
    window.EventListener('resize', this.control_graph_column)
   
    // window.addEventListener('resize', ()=> console.log('resize!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1') );  
    

  },
  
  

  computed :{
    filteredTickers(){
      let start = (this.pageCurent-1) * this.countTickersOnPage
      let end = (this.pageCurent) * this.countTickersOnPage
      if (this.tickers){
      return this.tickers.filter( el => el.tickName.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0 ).slice(start,end)
      }
      return []
    },
  },



  watch :{
    

      tickName(){
        this.findMaches();

      },
      graph(){
        console.log("Изменился массив графа!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // this.return_graph_width();
        
        
      },

      filterValue(){
        window.history.replaceState(
          null,
          null,
          `${document.location.pathname}?filter=${this.filterValue}&page=${this.pageCurent}`
          // `?filter=${this.filterValue}&page=${this.pageCurent}`
        )
      },
      pageCurent(){
        window.history.replaceState(
          null,
          null,
          `${document.location.pathname}?filter=${this.filterValue}&page=${this.pageCurent}`
          // `?filter=${this.filterValue}&page=${this.pageCurent}`
        )
      }

    }

  




  }

</script>

<style src="@/app.css">  
</style>

