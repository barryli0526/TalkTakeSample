


module.exports = function (app) {


    app.use(function(req, res, next){
//        var ua =  req.headers['user-agent'],
//     //   console.log(req.headers['user-agent']);
//
//        $ = {};
//
//        if (/mobile/i.test(ua))
//            $.Mobile = true;
//
//        if (/like Mac OS X/.test(ua)) {
//            $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
//            $.iPhone = /iPhone/.test(ua);
//            $.iPad = /iPad/.test(ua);
//        }
//
//        if (/Android/.test(ua))
//            $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
//
//        if (/webOS\//.test(ua))
//            $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
//
//        if (/(Intel|PPC) Mac OS X/.test(ua))
//            $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;
//
//        if (/Windows NT/.test(ua))
//            $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
        console.log(req.headers['user-agent']);
        console.log($);
        return next();
    })

  // home page
  app.get('/', function(req, res){

      res.render('home',{
          layout:null
      });
  })

//    app.get('/test', function(req, res){
//
//        res.render('test',{
//            layout:null
//        });
//    })
//
//    app.get('/demo', function(req, res){
//
//        res.render('demo',{
//            layout:null
//        });
//    })
}
