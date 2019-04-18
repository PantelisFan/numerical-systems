var http = require('http');

//Creating the server 
const server = http.createServer((req, res) => {
    res.write('Server running');
    res.end();

    var url = req.url;
    // console.log(url)
    if (req.method === 'GET') {
        const getRegex = new RegExp("^\/((roman)|(all)|(arabic))\/([a-zA-Z0-9]+)$");
        let result = getRegex.exec(url)
        if (result && result[0] === url) {
            // let romanNumber = url.split('/roman/').pop()
            // console.log(romanNumber)
            const path = url.split('/')[1];
            const param = url.split('/')[2];

            switch (path) {
                case 'roman':
                    console.log('Convert param to arabic', param);
                    break;
                case 'arabic':
                    console.log('Convert param to roman', param);
                    break;
                case 'all':
                    console.log('Get all documents  of type: ', param);
                    break;

                default:
                    break;
            }
        } else {
            console.log('path is wrong, partial match');
        }

    } else if (req.method === 'DELETE' && url === '/remove/all') {

        console.log('delete all');

    } else {
        console.log('404');
        // res.write('404 not found');
    }
    res.end();
})
    .listen(3000, () => {
        console.log("Listening at por 3000");
    });