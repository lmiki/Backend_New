const noteRoutes = require('./note_routes');

//const noteRoutes = require('./routes/note_routes');
module.exports = function (app, db) {
  noteRoutes(app, db);
};
