const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    
    let filepath = "";

    
    switch (req.url) {
        case "/":
            filepath = "home.html";
            break;

        case "/about":
            filepath = "about.html";
            break;

            case "/content":
            filepath = "content.html";
            break;
        default:
            filepath = "404_not_found.html";
            break;
    }

    let err;
    
    fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server Error");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });

});



server.listen(8000, () => {
    console.log("Server is running at http://localhost:8000");
});
