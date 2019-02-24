const express = require('express');
const path = require('path');

const app = express();

const PORT = Process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')))



require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

const db = require('./models');

db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        console.log(`App is listening on PORT ${PORT}`);
        console.log('The database is synced');
    })
});
