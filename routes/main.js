var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser');

var csurf = require('csurf');
global.csrfProtect = csurf({ cookie: true });

router.use(cookieParser());

router.get('/',function(req,resp){
    resp.render('index', {
        locals: {
          title:  'Welcome!'
        },
        partials: {
            body: '/header/index'
        }
    });

});

router.get('/actor',csrfProtect,function(req,resp){
    resp.render('index', {
        locals: {
          title: 'Actor',
          token: req.csrfToken()
        },
        partials: {
            body: '/actor/index'
        }
    });

});

module.exports = router;