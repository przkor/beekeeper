import axios from 'axios'

export const GETapiarys = 'getApiarys'

export function getApiarys(callback) {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/apiarys',
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else {
                dispatch({type:GETapiarys,data:response.data})  
                callback()    
            }
        })
        .catch(function (error) {
           console.log(error);
        });
      
  }
}


