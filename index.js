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

const fs = require('fs');

const multiparty = require('multiparty');

let files = [];
let filesIds = 0;

let textSections = [
    {
        header: "История",
        childSections: [
            {
                header: "Историография",
                childSections: [],
                text: "Термин историография имеет несколько значений. Во-первых, это наука о том, как пишется" +
                    " история, насколько правильно применяется исторический метод и как развивается историческое " +
                    "познание. Во-вторых, тем же термином обозначают совокупность исторических трудов, часто " +
                    "тематически или иным способом отобранных из общей совокупности (например, историография 1960-х " +
                    "годов о Средних веках)."
            },
            {
                header: "Методы истории",
                childSections: [],
                text: "Исторический метод заключается в следовании принципам и правилам работы с первоисточниками " +
                    "и другими свидетельствами, найденными в ходе исследования и затем используемыми при написании " +
                    "исторического труда."
            }
        ],
        text: "История — область знаний, а также гуманитарная наука, занимающаяся изучением человека " +
            "(его деятельности, состояния, мировоззрения, социальных связей, организаций и так далее) в прошлом " +
            "В более узком смысле история — наука, изучающая всевозможные источники о прошлом для того, чтобы " +
            "установить последовательность событий, объективность описанных фактов и сделать выводы о причинах событий."
    },
    {

    },

]

app.get("/getAllFiles", (req, res, next) => {

    res.end();
})

app.post("/deleteFile", (req, res, next) => {

    console.log(req);

    files = files.filter(item => req.body.id !== item.id);

    res.send(req.body);

    res.end();
});

app.post("/addFile", (req, res, next) => {

    const form = new multiparty.Form({ autoFiles: true, uploadDir: "upload" });

    form.parse(req, function (err, fields, files) {
        setTimeout(function() {
            console.log(files);

            let file = {};

            if( files && files.file && files.file.length ) {
                file.name = files.file[0].originalFilename;
            }

            file.id = filesIds;

            file.content = textSections;

            file.theme = file.content[0].header;

            filesIds += 1;

            form.cle;

            res.send(file);
            res.end();
        }, 100);
    })

    files.push(req);
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

