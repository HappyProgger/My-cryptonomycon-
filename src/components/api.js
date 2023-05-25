

const api_key='&api_key={80cb5da39e733176c0c0c2e8aa8dc6c5e18c7165ff0067659d144d1114acfd11}';


const URL_API=`wss://streamer.cryptocompare.com/v2${api_key}`;


export const dataExchange = fetch(URL_API).then(r => r.json());