var passport = require('passport');
var users = require('../models/users').users;
var randomstring  = require('randomstring');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.login = function(req, res){
	
	if(!req.body.email || !req.body.password){
	
		 sendJsonResponse(res, 400,{
		 	"message":'all fields are required'
		 });

		 return;
	}

	else{
		sendJsonResponse(res, 200,{
		 	"message":'login successfully'
		 });
		return;
	}	
}

module.exports.register = function(req,res){

	var user = new users();
	user.email = req.body.email;
	user.password = req.body.password;
	user.first_name = req.body.first_name;
	user.last_name = req.body.last_name;
	user.gender = req.body.gender;
	user.mobile = req.body.mobile;
	console.log(user)
	user.save(function(err){
		if(err){
			sendJsonResponse(res, 500,{
		 		"message":'registration unsuccessfull'
			});
			return;
		}
		else{
			res.json({
              "message" : "Registered"
            });
		}
	}) 
}