const express = require("express");
const app = express();

const cors = require('cors');

app.use(cors());
app.options('*', cors());

const port = 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.get("/api/documents", (req, res, next) => {
    const documents = require('./resources/document_1.json');
    res.json(documents);
})

app.get("/headerElements", (req, res, next) => {
    const headerConfig = [
        {
            text: 'Files Page',
            route: '/files-page',
            img: ''
        },
        {
            text: 'Text Page',
            route: '/text-page',
            img: ''
        },
        {
            text: 'Options Page',
            route: '/options-page',
            img: ''
        },
        {
            text: 'Exit',
            route: '/login-page',
            img: ''
        }
    ];

    res.send(headerConfig);

    res.end();
})

app.listen(port, () => {
    console.log("Server running on port 3000");
});
