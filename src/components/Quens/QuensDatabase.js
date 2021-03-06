import axios from 'axios'

const quensFromDatabes = {
    addQuen(quenData,dispatch) {
        axios.post("/addQuen", {
            quenData
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
        .post("/getQuens", {
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
      console.log(`Quen ID do delete: ${id}`)
        axios
        .post("/deleteQuen", {
          id
        })
        .then(function (response) {
          if (response.data.deletedNumber===0)
          { window.alert("Błąd! Nie można usunąć!")}
        })
        .catch(function (error) {});
      },
}

export default quensFromDatabes