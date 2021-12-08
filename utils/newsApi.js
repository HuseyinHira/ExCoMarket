const API_URL = 'https://newsapi.org/v2/top-headlines?country=tr&category=business&apiKey=3ef1189d9a5a4c02a76bee03db27c431'

export const fetchNews = async ()=>{
     return await fetch(API_URL)
        .then(res => res.json())
}
