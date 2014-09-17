

exports.isAuth = function(req, res){
  if(!req.session.email){
      return false;
  } else {
      return true;
  }
};

exports.resubmissionData = function (req, res) {
    console.log('resubmit');
        if (req.session.email) {
            var data = {
                action: 'resubmissionData',
                role: req.session.role,
                email: req.session.email,
                username: req.session.username
            };

            res.json(data);

        }
};