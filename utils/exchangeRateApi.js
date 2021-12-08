const API_URL = 'http://hasanadiguzel.com.tr/api/kurgetir'

export const fetchExchangeRate = async ()=>{
  return await fetch(API_URL)
  .then(res => res.json())
  // return await axios.get(API_URL,  mode= 'no-cors')
  //   .then((res) => res.json())
}