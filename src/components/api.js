// const WS_open = 1
// const WS_closed = 3

const api_key='?api_key=3656acb980c4a61c0690dccd820728d77a4b85c9a00b519266d8b1ea2bd388ce';

const URL_API=`wss://streamer.cryptocompare.com/v2${api_key}`;
//      

const WS = new WebSocket(URL_API);

const TYPE_SUCCES_TRANSITION_TO_USD = "5";
// const TYPE_FAILE_TRANSITION_TO_USD = "500";

const tickersHandlers = new Map();





WS.addEventListener("message", (event) => {
    let message_data = event.data;
    const { 'TYPE': type, 'FROMSYMBOL': fromsymbol,'TOSYMBOL' : curency, 'PRICE': newprice } = JSON.parse(event.data);

    // if (type != TYPE_SUCCES_TRANSITION_TO_USD){



    if (type != TYPE_SUCCES_TRANSITION_TO_USD || newprice === undefined ){
       console.log(type,TYPE_SUCCES_TRANSITION_TO_USD)
        return
        
    }
    // let message_data = JSON.parse(event.data);
    // if (message_data.TYPE === '5'){
    //     return 123
    // }    
    // const message = {} = JSON.parse(event.data)

    console.log("Message from server ",  message_data)  

    console.log(curency)  

    const handlers = tickersHandlers.get(fromsymbol) ?? [];
    
    // console.log("Message_to_par", handlers)
    handlers.forEach(fn => fn(fromsymbol, newprice))
    // if (WS.readyState != WS_open){
    //     let WS = new WebSocket(URL_API);x
    //     return
    // let 
    
});


function WS_send(message){
    const message_str = JSON.stringify(message);
    if(WS.readyState === WS.OPEN){
        WS.send(message_str)
        return 
    }
    
    WS.addEventListener('open', () => {
        WS.send(message_str)
        return
    },
    { once: true })

   


}


function WS_subscribe(ticker){
    let WS_message_to_send = 
    
        {
            "action": "SubAdd",
            "subs" : [`5~CCCAGG~${ticker}~USD`],  
        
        };

        WS_send(WS_message_to_send);
    return 

    
}




function WS_describe(ticker){
    // if(WS.readyState === WS_closed){
    //     let WS = new WebSocket(URL_API);
    // }
    // if (WS.readyState != WS_open){
    //     let WS = new WebSocket(URL_API);
    //     return
    // }

    let WS_message_to_send = 
    
        {
            "action": "SubRemove",
            "subs" : [`5~CCCAGG~${ticker}~USD`],  
    
        };

        WS_send(WS_message_to_send);
    return 

    
}

const subscribeOnTicker = (ticker, cb) => {

    const subscribers = tickersHandlers.get(ticker) || [];
    
    tickersHandlers.set(ticker,[...subscribers, cb]);   
    WS_subscribe(ticker);

}

const unsubscribeOnTicker = (ticker) => {
    // const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.delete(ticker)
    WS_describe(ticker);

}
export  {subscribeOnTicker, unsubscribeOnTicker};