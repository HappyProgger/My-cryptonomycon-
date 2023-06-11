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
            <ticker-graph :graph = "[...this.graph]"   :sel="sel" @graph-hide="this.sel = ''; "></ticker-graph>
          </div>
        </section>
      </div>
    </div>
  </body>

</template>

<script>
import tickerAdd from '@/components/tickerAdd.vue';
import tickerGraph from '@/components/tickerGraph.vue';

import {subscribeOnTicker, unsubscribeOnTicker } from './components/api.js'

// import { get } from 'https';



export default{
  components : {tickerAdd, tickerGraph},

  data(){
    return{

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
      
      // console.log(Array.from(this.tickers).slice(0,1))
      if (this.tickName){
        const newTicker = {
        tickName: this.tickName,
        priceTicker : "-",
      }
     
      // WS_subscribe(newTicker.tickName);

      if ( !this.tickers){ 
      this.tickers = []
      }
      console.log('123123213123123',this.tickers)

      this.tickers.push(newTicker)

    subscribeOnTicker(this.tickName, (fromsymbol, newprice) => this.updateInfoTickers(fromsymbol,newprice))
      


  

      localStorage.setItem("addTickers", JSON.stringify(this.tickers))

      // try{
      // setInterval(async () => {
      //   // const res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${newTicker.tickName}&tsyms=USD&api_key={80cb5da39e733176c0c0c2e8aa8dc6c5e18c7165ff0067659d144d1114acfd11}`)

      //   // const data1 = await res.json();
      //   let data_curency = '-';
      //   // const data1 = { USD : 1};    //remove !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

      //   subscribeOnTicker(this.tickName, (newprice)=>{data_curency = newprice})
      //   // console.log(dataExchange)
      //   let data = data_curency

 
        

        

 
      //   data > 1 ? data = data.toFixed(2) : data =  data.toFixed(6);

      //   // console.log(this.sel)

      //   if (this.sel.tickName === newTicker.tickName){
      //     if ( this.graph.length === 10){
      //       this.graph.shift();

      //     }
      //     this.graph.push(data)
      //     // console.log(this.graph)

      //   }
      // }, 6000)


      // // console.log(this.sel)
      // this.pageCount = this.getPageCount()
      // this.tickName = ""
      // this.masOfSearch = []
      // } catch(e){
      //   return
      // }
      
      

      
      }
      this.tickName = '';
    },
    // filter(){
    //   return this.ticckers.includes(this.)
    // },

    updateInfoTickers(updatingTicker, changed_price){
      console.log(this.$refs.tickerGraph)
      console.log("Updating coin ", updatingTicker)
      this.tickers.filter(t => t.tickName === updatingTicker  ).priceTicker = changed_price;
      
      console.log( this.tickers.filter(t => (t.tickName === updatingTicker)).forEach(t => t.priceTicker = changed_price ))
      if (this.sel.tickName === updatingTicker){
        this.graph.push(changed_price);
      }
  

    },

    // updateInfoTickers(ticker){ 
    //   setInterval(async () => {
    //     // const res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${ticker.tickName}&tsyms=USD&api_key={80cb5da39e733176c0c0c2e8aa8dc6c5e18c7165ff0067659d144d1114acfd11}`)

    //     // const data1 = await res.json();
        
    //     // let data = dataExchange;
    //     // let data = data1.USD




    //     let data = 1                                      //remove!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //     console.log(data)
    //     ticker.curentPrice = data;




    //     data > 1 ? data = data.toFixed(2) : data =  data.toFixed(6);
    //     this.tickers.find(t => t.tickName  === ticker.tickName).priceTicker = data;
    //     // console.log(newTicker.curentPrice )
        

    //     // console.log(this.sel)

    //     if (this.sel.tickName === ticker.tickName){
    //       if ( this.graph.length === 10){
    //         this.graph.shift();

    //       }
    //       this.graph.push(data)
    //       // console.log(this.graph)

    //     }
    //   }, 6000)

    // },

  
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

      


      // console.log(this.sel.tickName)
    },

    isOne(){
      if (this.tickers){
        for (let i=0;i< this.tickers.length; i++ ){
          // console.log(this.tickers[i])
          if( this.tickName.toLowerCase() === this.tickers[i].tickName.toLowerCase()){
            return true
            }
          }
        return false}

    return false

    },
    // isOne(){

    //     for (let i=0;i< this.tickers.length; i++ ){
    //       // console.log(this.tickers[i])
    //       if( this.tickName.toLowerCase() === this.tickers[i].tickName.toLowerCase()){
    //         return true
    //         }
    //       }
    //     return false

    // },

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
      // console.log(this.masOfSearch)
      
    }





  
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
        // console.log("111111111111111111111")
        this.findMaches();

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

