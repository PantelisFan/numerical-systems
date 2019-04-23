const controllers = require('./controllers');
const http = require('http');
const mongoCtrl = require('./mongodb');

//Creating the server 
http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify({ a: 1 }, null, 3));
    // res.write('Server running');
    // res.end();

    var url = req.url;
    // console.log(url)
    if (req.method === 'GET') {
        const getRegex = new RegExp("^\/((roman)|(all)|(arabic))\/([a-zA-Z0-9]+)$");
        let result = getRegex.exec(url)
        if (result && result[0] === url) {
            // let romanNumber = url.split('/roman/').pop() 
            // console.log(romanNumber)
            const path = url.split('/')[1];
            let param = url.split('/')[2];
            // console.log(param)

            switch (path) {
                case 'arabic':
                    controllers.romanToArab(param.toUpperCase())
                        .then(data =>  res.end(JSON.stringify(data, null, 3)))
                        .catch(err => {
                            if (err === 400) {
                                res.statusCode = err;
                                res.end();
                            }
                            else {
                                res.end(JSON.stringify(err, null, 3));
                            }
                        });
                    break;
                case 'roman':
                    controllers.arabToRoman(param)
                        .then(data => res.end(JSON.stringify(data, null, 3)))
                        .catch(err => {
                            if (err === 400) {
                                res.statusCode = err;
                                res.end();
                            }
                            else {
                                res.end(JSON.stringify(err, null, 3));
                            }
                        });
                    break;
                case 'all':
                    controllers.getAll(param)
                        .then(data => res.end(JSON.stringify(data, null, 3)))
                        .catch(err => {
                            if (err === 400) {
                                res.statusCode = err;
                                res.end();
                            }
                            else {
                                res.end(JSON.stringify(err, null, 3));
                            }
                        });
                    break;

                default:
                    break;
            }
        } else {
            res.end('Path is  wrong!');
        }

    } else if (req.method === 'DELETE' && url === '/remove/all') {
        //Object error if not stringified.
        controllers.deleteAll()
            .then(()=> {
                res.statusCode = 200;
                res.end();
            })
            .catch(err => {
                res.statusCode = 500;
                res.end();
            })
    } else {
        res.statusCode = 404;
        res.end();
        // res.write('404 not found');
    }
    // res.end();
})
    .listen(3000, () => {
        console.log("Listening at por 3000");
    });