var express = require('express');
var router = express.Router();
var db = require('../db/mysql');
const Actor = db.import("../models/actor");
const Filn_Actor = db.import("../models/film_actor");

router.get('/get',function(req,resp){
    var pageInt = parseInt(req.query.page);
    var limitInt = parseInt(req.query.limit);
    var start = (pageInt - 1) * limitInt;

    var fName = req.query.firstName;
    var lName = req.query.lastName;

    if(fName || lName) {
        var actorList = Actor.findAndCountAll({ where : {$or : [{first_name:fName},{last_name : lName}] } ,offset : start , limit : limitInt}).then(function(actor){        
            resp.status(200).send(JSON.stringify({records : actor.rows , total : actor.count }));
        });
    }else{
        var actorList = Actor.findAndCountAll({offset : start , limit : limitInt}).then(function(actor){        
            resp.status(200).send(JSON.stringify({records : actor.rows , total : actor.count }));
        });
    }

});

router.post('/save',parseForm,csrfProtect,function(req,resp){
    if(req.body.id){
        Actor.update(
            {first_name : req.body.firstName,last_name : req.body.lastName},
            {where : { actor_id : req.body.id }}).
        then(function(actor){
            resp.status(200).send(JSON.stringify({result : true}));
        });
    }else{

        Actor.create({
            first_name:req.body.firstName,
            last_name:req.body.lastName
        },{fields : ['first_name','last_name']}).
        then(function(entity){
            resp.status(200).send(JSON.stringify({result : true}));
            console.log(entity.dataValues);
        });

        resp.status(500).send('Error');
    }
});

router.post('/delete',function(req,resp){
    if(req.body.id){
        Filn_Actor.destroy({
            where:{
                actor_id:req.body.id
            }
        });

        Actor.destroy({
            where:{
                actor_id:req.body.id
            }
        }).then(function(actor){
            resp.status(200).send(JSON.stringify({result : true}));

        });
    }else{
        resp.status(500).send('Error');
    }

});

module.exports = router;