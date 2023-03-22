const PORT = 8080;

const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');
const sequelize = require('./db');
const {Job_nameModel, InstructionsModel} = require('./models.js')

const app = express();

const start = async () => {
    app.use(express.json());
    app.use(multer({dest:"uploadsText"}).single("filedata"));

    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('DB connection completed');
    } catch (e) {
        console.log('DB connection failed\n', e);
    }

    // Запрос основная страница
    app.get('/menu', async (req, res) => {
        const job_names = await Job_nameModel.findAll()

        res.json(job_names)
        console.log(job_names)
    });

    //Запрос к серверу Python для обработки текста
    app.get('/menu/python', async (req, res) => {
        let file = req.file, name = req.name;
        console.log(file);
        console.log(name);

        // создать новую запись name в БД
        const newJob_name = await Job_nameModel.create({
            name: name.name,
        })
        console.log(newJob_name)

        //обработка ошибки получения файла
        if(!file)
            res.send("Ошибка при загрузке файла");
        else
            res.send("Файл загружен");

        // считывание файла
        fs.readFile(req.file, 'utf8', (error, data) => {
            if(error) console.log(error);

            //отправка запроса (текста в файле) на сервер питон
            fetch( 'http://localhost:9999/server', {
                method: 'POST',
                body: JSON.stringify({
                    text: data,
                }),
                headers: { 'Content-Type': 'application/json'}
            });
        });

        res.send('Запрос на обработку отправлен');
    });

    //Запрос на добавление обработанного текста в БД
    app.post('/menu/uploadFile', async (req, res) => {
        let text = req.body; // получение от сервера питон?
        console.log(text);

        // Добавление в БД обработааного текста
        // цикл для добавление каждой строки отдельно?
        const newInstructions = await InstructionsModel.create({
            content: text.content,
            id_job: text.id_job,
        });
        console.log(newInstructions);
    });

    // post/put для отображения текста и его замены
    app.post('/menu/description', () => {

    })

    app.put('/menu/description', () => {

    })

    app.listen(PORT, () => console.log('server started on PORT ' + PORT));
};

start();