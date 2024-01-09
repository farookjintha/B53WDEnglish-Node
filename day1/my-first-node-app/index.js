
const http = require('http'); // built-in package for building http server
const path = require('path');
const url = require('url');

// Frontend -> Request -> Backend -> Response -> Frontend.


// Status Code
// 2xx -> success
// 3xx -> redirection
// 4xx -> client side error
// 5xx -> server side error


const server = http.createServer((req, res) => {
    // backend logic

    const reqUrl = url.parse(req.url);
    console.log('Request URL: ', reqUrl)
    // console.log('HTTP Method: ', req.method)
    // console.log('URL: ', req.url);
    // const pathBaseName = path.basename(req.url);

    // console.log('Base Name: ', pathBaseName)


    res.statusCode  = 200;
    res.end('Hello World');

}); // function used to create server.


server.listen(4001, () => {
    console.log('App is running at PORT 5001')
});


// http://localhost:5001/


