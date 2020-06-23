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

let mockFile = {
    regulations: [],
    id: 0,
    theme: "Описание S.M.A.R.T",
    name: "Лабораторная работа №1",
    content: [
        [
            {
                font_size: "14",
                text_align: 'center',
                isBold: false,
                isCursive: false,
                text: "НИЖЕГОРОДСКИЙ ГОСУДАРСТВЕННЫЙ ТЕХНИЧЕСКИЙ УНИВЕРСИТЕТ \n" +
                    "\tим. Р. Е. Алексеева»\t\n\n" +
                    "\n"
            },
            {
                font_size: "14",
                text_align: 'center',
                isBold: false,
                isCursive: false,
                text: "Институт Радиоэлектроники и Информационных Технологий\n" +
                    "Кафедра \"Вычислительные системы и технологии\"\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n"
            },
            {
                font_size: "14",
                text_align: 'center',
                font_weight: 'bold',
                isCursive: false,
                text: "Отчёт по лабораторной работе №1\n" +
                    " по дисциплине «Системы хранения данных»\n" +
                    "\n"
            },
            {
                font_size: "14",
                text_align: 'center',
                font_weight: 'normal',
                isCursive: false,
                text: "Знакомство с технологией S.M.A.R.T.\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n"
            },
            {
                font_size: "14",
                text_align: "right",
                font_weight: 'normal',
                isCursive: false,
                text: "Выполнил:\n" +
                    "Юдин П.А.\n" +
                    "\t\t\t\t\t\t\t\t\t Группа 16-В-1\n" +
                    "\n"
            },
            {
                font_size: "14",
                text_align: "right",
                font_weight: 'normal',
                isCursive: false,
                text: "Проверил:\n" +
                    "Зеленский В. П.\n" +
                    "\n" +
                    "\t\t\t\t                   \t\t\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n"
            },
            {
                font_size: "14",
                text_align: 'center',
                font_weight: 'normal',
                isCursive: false,
                text: "Нижний Новгород\n" +
                    " 2020 г.\n"
            }
        ],
        [
            {
                font_size: "11",
                text_align: "left",
                font_weight: 'bold',
                isCursive: false,
                text: "Цель работы:",
                childs: [
                    {
                        font_size: "11",
                        text_align: "left",
                        font_weight: 'normal',
                        isCursive: false,
                        text: "Изучить возможности и область применения технологии S.M.A.R.T. С помощью любого доступного ПО, " +
                            "способного обрабатывать отчёты S.M.A.R.T, проверить состояние HDD (SSD) на домашнем компьютере."
                    }
                ]
            },
            {
                font_size: "11",
                text_align: "left",
                font_weight: 'bold',
                isCursive: false,
                text: "Описание S.M.A.R.T:",
                childs: [
                    {
                        text_align: "left",
                        font_weight: 'normal',
                        isCursive: false,
                        font_size: "11",
                        text: "S.M.A.R.T. (от англ. self-monitoring, analysis and reporting technology —" +
                            " технология самоконтроля, анализа и отчётности) — технология оценки состояния жёсткого диска " +
                            "встроенной аппаратурой самодиагностики, а также механизм" +
                            " предсказания времени выхода его из строя.     \n" +
                            "S.M.A.R.T. производит наблюдение за основными характеристиками накопителя, " +
                            "каждая из которых получает оценку.\n"
                    }
                ]
            },
        ]
    ]
};

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

            res.send(mockFile);
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

