import axios from 'axios'

const apiarysFromDatabes = {
    addApiary(name,location,setName,setLocation,setConfirmation,setAddedApiary) {
        axios.post("/addApiary", {
          name,
          location,
        })
        .then(function (response) {
          setName('')
          setLocation('')
          setConfirmation('Dodano nową pasiekę')
          setAddedApiary(prevValue => !prevValue)
        })
        .catch(function (error) {
           console.log(error);
        });
    },
    
    getApiarys(setApiarys) {
        axios
        .post("/getApiary", {
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            setApiarys(response.data)
        })
        .catch(function (error) {
           console.log(error);
        });
      },

    getHivesAmount(setHivesAmount) {
        axios
        .post("/getHivesAmountInApiary", {
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            setHivesAmount(response.data)
        })
        .catch(function (error) {
           console.log(error);
        });
      },

    deleteApiary(id,toggleDeleteApiary) {
        axios
        .post("/deleteApiary", {
          id: id,
        })
        .then(function (response) {
          if (response.data.deletedNumber===0)
          { window.alert("Nie można usunąć! W pasiece znajdują się przypisane do niej ule!")}
          else {
            window.alert("Usunięto z bazy pasieke")
            toggleDeleteApiary()
          }
          
        })
        .catch(function (error) {});
      },
}

export default apiarysFromDatabes