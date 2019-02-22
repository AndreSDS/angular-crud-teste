const cors = require ("cors");
const bodyParser = require ("body-parser");
const express = require ('express');
const mongoose = require ("mongoose");

import Issues from './models/Issue.js';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

//mongoose.connect('mongodb://rammpk:caver45..@ds145895.mlab.com:45895/crud-angular');
mongoose.connect('mongodb://localhost:27017/issues',{ useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Conectado ao MongoDB!');
});

router.route('/issues').get((req, res) => {
    Issues.find((err, issue)=>{
        if(err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/issues/:id').get((req, res)=>{
    Issues.findById(req.params.id, (err, issue)=>{
        if(err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/issues/add').post((req, res) => {
    let issue = new Issues(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue':'Adicionado com sucesso!'});
        })
        .catch(err =>{
            res.status(400).send('Falha ao gravar');
        });
});

router.route('/issues/update/:id').put((req, res)=>{
    Issues.findById(req.params.id, (err, issue)=>{
        if(!issue)
            return next(new Error('Não foi possível carregar documento'));
        else
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severety = req.body.severety;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Atualizado');
            }).catch(err => {
                res.status(400).send('Atualização falhou');
            });
    });
});

router.route('/issues/delete/:id').delete((req, res)=>{
    Issues.findByIdAndRemove({_id: req.params.id}, (err)=>{
        if(err)
            res.json(err);
        else
            res.json('Removido com sucesso');
    });
});

app.use('/', router);
    
app.get('/', (req, res)=>res.send("Hello World!"));
app.listen(4000, ()=> console.log('Server rodando'));