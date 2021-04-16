import axios from 'axios'

const quensFromDatabes = {
    addQuen(quenData,dispatch) {
      const data = quenData 
        axios.post("/quens", {
           data
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else if(response.data.insertedCount!==1) {alert('Błąd, nie dodano rekordu!')}
            else {
            dispatch({type:'add', data:response.data.quenData})
            }
        })
        .catch(function (error) {
           console.log(error);
        });
    },
    
    getQuens(dispatch) {
        axios
        .get("/quens", {
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            return dispatch({type:'fetch', data:response.data})
        })
        .catch(function (error) {
           console.log(error);
        });
      },

    deleteQuen(id) {
        axios
        .delete("/quens", {
          params: {id}
        })
        .then(function (response) {
          if (response.data.deletedNumber===0)
          { window.alert("Błąd! Nie można usunąć!")}
        })
        .catch(function (error) {});
      },
}

export default quensFromDatabes