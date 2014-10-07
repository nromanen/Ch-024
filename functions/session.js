exports.get = function(req, res) {
	//Check for authentication
    if(req.session.email){
        res.send(200, {
            auth : true,
            email : req.session.email,
            role: req.session.role,
            user: req.session.user
        });
    }else{
        res.send(401, {
            auth : false
        });
    }
};