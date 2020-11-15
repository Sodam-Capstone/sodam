exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        //res.send('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><script type="text/javascript">alert("로그인이 필요합니다.");</script>');
        res.redirect('/login');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
};