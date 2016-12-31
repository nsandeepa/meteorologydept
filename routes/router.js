/**
 * Created by nilupul on 12/30/16.
 */
//3rd party modules
var express = require('express');

//Router
var router = express.Router();

router.get('/', function(request, response) {
    response.send("Hello World");
    console.log(process.pid);
});
module.exports = router;