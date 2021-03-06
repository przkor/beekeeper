import axios from 'axios'

const hivesFromDatabes = {
  getHives(setHives,apiaryID) { 
    axios
      .post("/getHives", {apiaryID
      })
      .then(function (response) {
        setHives(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });    
  },
  deleteHive(hiveID) { 
    axios
      .post("/deleteHive", {hiveID
      })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });    
  }
}

export default hivesFromDatabes