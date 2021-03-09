const express = require("express")
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const user = require("./user");
const event = require("./event");
const profile = require("./profile");
const apiary = require("./apiary");
const hives = require("./hives");
const quens = require("./quens");
const treatment = require("./treatment");
const app = express();
const logout = require('./logout');
const deleteElement = require ("./deleteElement")

const APIARY = 'apiary'
const HIVES = 'hives'
const EVENT = 'event'
const QUENS = 'quens'
const TREATMENT = 'treatment'
const USER = 'user'

  
app.use(session({ 
  secret: "ErbY78P16Jk" ,
  saveUninitialized: false ,
  resave:true,
  cookie : {
    maxAge: 6000000,
    sameSite: 'strict', 
  }
 // resave:true
}));
let sessions;

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());

const checkIsLogged = (sessions)=> {
  if (sessions!==undefined) {return true}
  else {return false} 
}


app.post("/signin", function (req, res) {
  const login = req.body.login;
  const password = req.body.password;
  user.validateSignIn(login, password, function (result) {
    if (result) {
      req.session.username = login;
      res.send("success");
    } else {
      res.send("failure");
    }
  });
});

app.post("/signup", function (req, res) {
  let login = req.body.login;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  if (login && name && email && password) {
    user.signup(login, name, email, password, function (result) {
      if (result) {
        res.send("success");
      } else {
        res.send("failure");
      }
    });
  } 
  else {
    res.send("Failure");
  }
});

app.post("/getUsername", function (req, res) {
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  res.send(username) 
});

app.post("/addEvent", function (req, res) { 
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const id = req.body.id;
  const title = req.body.title;
  const subject = req.body.subject;
  if (id === "" || id === undefined) {
    event.addEvent(username, title, subject, function (result) {
      res.send(result);
    });
  } else {
    event.updateEvent(username, id, title, subject, function (result) {
      res.send(result);
    });
  }
});

app.post("/getEvents", function (req, res) {
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  event.getEvents(username, function (result) {
    res.send(result);
  });
});

app.post("/getEventWithId", function (req, res) {
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const id = req.body.id;
  event.getEventWithId(username, id, function (result) {
    res.send(result);
  });
});

app.post("/deleteEvent", function (req, res) {
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const id = req.body.id;
  event.deleteEvent(username, id, function (result) {
    res.send(result);
  });
});

app.post("/getProfile", function (req, res) {
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  event.getProfile(username, sessions, function (result) {
    res.send(result);
  });
});

app.post("/updateProfile", function (req, res) {
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const name = req.body.name;
  const password = req.body.password;
  profile.updateProfile(username, name, password, function (result) {
    res.send(result);
  });
});

/*
app.post("/addApiary", function (req, res) { 
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const data = req.body.data;
  apiary.addApiary(username, data, function (result) {
    res.send(result);
  });
});

app.post("/deleteApiary", function (req, res) {
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const id = req.body.id;
  apiary.deleteApiary(username, id, function (result) {
    res.send(result);
  });
});
*/

app.post("/getApiary", function (req, res) { 
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  apiary.getApiary(username, function (result) {
    res.send(result);
  });
});
/*
app.post("/updateApiary", function (req, res) { 
  sessions = req.session.username;
  const data = req.body.data;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  apiary.updateApiary(username,data, function (result) {
    res.send(result);
  });
});
*/

app.post("/addHive", function (req, res) { 
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const hive = req.body.hive;
  hives.addHive(username, hive, 
    function (result) {
    res.send(result);
  });
});

app.post("/getHives", function (req, res) { 
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  let apiaryID= req.body.apiaryID
  if (apiaryID===null || apiaryID===undefined) {apiaryID=''}
  hives.getHives(username, apiaryID, function (result) {
    res.send(result);
  });
});

app.post("/getHivesNumbers", function (req, res) { 
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  hives.getHivesNumbers(username, function (result) {
    res.send(result);
  });
});



app.post("/getHivesAmount", function (req, res) { 
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
    hives.getHivesAmount(username, function (result) {
      res.send(result);
    });
});

app.post("/deleteHive", function (req, res) {
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const hiveID = req.body.hiveID;
  hives.deleteHive(username, hiveID, function (result) {
    res.send(result);
  });
});

app.post("/getQuens", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  quens.getQuens(username, function (result) {
    res.send(result);
  });
});

app.post("/addQuen", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const quenData = req.body.quenData;
  quens.addQuen(username, quenData, 
    function (result) {
    res.send(result);
  });
});

app.post("/deleteQuen", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const quenData = req.body.id;
  quens.deleteQuen(username, quenData, 
    function (result) {
    res.send(result);
  });
});

/*
app.post("/addDrug", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const data = req.body.data;
  treatment.addDrug(username, data, 
    function (result) {
    res.send(result);
  });
});

app.post("/getDrugs", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  treatment.getDrugs(username, function (result) {
    res.send(result);
  });
});

app.post("/updateDrugs", function (req, res) { 
  sessions = req.session.username;
  const data = req.body.data;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  treatment.updateDrugs(username,data, function (result) {
    res.send(result);
  });
});
*/
/*
app.post("/deleteElement", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const id = req.body.data.id;
  const collection = req.body.dbCollection
  deleteElement.delete(username, id, collection, 
    function (result) {
    res.send(result);
  });
});
*/

//PONIŻSZE FNUKCJĘ SĄ NIE DO USUNIĘCIA !!!
app.post("/getHivesAmountInApiary", function (req, res) { 
  sessions = req.session.username;
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const id = req.body._id
  hives.getHivesAmountInApiary(username,id, function (result) {
    res.send(result);
  });
});

app.post("/delete", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const id = req.body.data.id;
  const collection = req.body.dbCollection
  if (collection === 'hives') {
    hives.deleteHive(username, id, 
      function (result) {
      res.send(result);
    });
  }
  else {
    deleteElement.delete(username, id, collection, 
    function (result) {
    res.send(result);
  });
}
});


app.post("/add", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const dbCollection = req.body.dbCollection;
  const data = req.body.data;
  switch (dbCollection) {
    case APIARY: {
      return apiary.addApiary(username, data, 
        function (result) {
        res.send(result);
        })
    }
    case HIVES: {
      return hives.addHive(username, data, 
        function (result) {
        res.send(result);
      });   
    }
    case EVENT: {
      return
    }
    case QUENS: {
      return quens.addQuen(username, data, 
        function (result) {
        res.send(result);
      });
    }
    case TREATMENT: {
      return treatment.addDrug(username, data, 
        function (result) {
        res.send(result);
      });
    }
    case USER: {
      return
    }
    default: {console.warn('Błąd!. Nie znaleziono odpowiedniej bazy do dodania elementu')}
  }
});

app.post("/update", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const dbCollection = req.body.dbCollection;
  const data = req.body.data;
  switch (dbCollection) {
    case APIARY: {
      return apiary.updateApiary(username,data, function (result) {
        res.send(result);
      });
    }
    case HIVES: {
      return hives.updateHive(username, data, 
        function (result) {
        res.send(result);
      });   
    }
    case EVENT: {
      return
    }
    case QUENS: {
      return quens.addQuen(username, data, 
        function (result) {
        res.send(result);
      });
    }
    case TREATMENT: {
      return treatment.updateDrugs(username,data, function (result) {
        res.send(result);
      });
    }
    case USER: {
      return
    }
    default: {console.warn('Błąd!. Nie znaleziono odpowiedniej bazy do dodania elementu')}
  }
});

app.post("/get", function (req, res) { 
  sessions = req.session.username;
  if (!checkIsLogged(sessions)) {res.send('access denied') ;return}
  const sessionUsername = sessions.split("@");
  const username = sessionUsername[0];
  const dbCollection = req.body.dbCollection;
  switch (dbCollection) {
    case APIARY: {
      return apiary.getApiary(username, function (result) {
        res.send(result);
      });
    }
    case HIVES: {
      let apiaryID= req.body.apiaryID
      if (apiaryID===null || apiaryID===undefined) {apiaryID=''}
      return hives.getHives(username, apiaryID, function (result) {
        res.send(result);
      }); 
    }
    case EVENT: {
      return
    }
    case QUENS: {
      return quens.getQuens(username, function (result) {
        res.send(result);
      });
    }
    case TREATMENT: {
      return treatment.getDrugs(username, function (result) {
        res.send(result);
      });
    }
    case USER: {
      return
    }
    default: {console.warn('Błąd!. Nie znaleziono odpowiedniej bazy do dodania elementu')}
  }
});

app.post("/logout", function (req, res) {
  logout.logoutMe(req.session, function (result) {
    sessions=""
    res.send(result);
  });
});

app.listen(7777, function () {
  console.log("Started listening on port", 7777);
});
