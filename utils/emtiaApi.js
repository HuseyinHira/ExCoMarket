const API_URL = 'http://hasanadiguzel.com.tr/api/emtiafiyatlari'

export const fetchEmtia= async ()=>{
     return await fetch(API_URL)
        .then(res => res.json())
}
