module.exports = {
  logoutMe: function (session, callback) {
    session.destroy(function (err) {
      if (err) {
        console.log("Error z session destroy" + err);
        callback(false);
      } else {
        callback(true);
      }
      console.log("Info z session destroy: OK " + session.username);
    });
  },
};
