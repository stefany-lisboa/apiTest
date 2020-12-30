const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();



app.use(express.json());

app.use((req, res, next) => {
   // console.log("Acessou o middleware");
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors());
    next();
})


mongoose.connect('mongodb://localhost/stefany', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com o MongoDb realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: conexão com MongoDb não foi realizada com sucesso!")
});

app.get("/", (req,res) => {
    
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});

app.get("/stefany", (req,res) => {
    
  res.send("oi")
});


app.get("/artigo/:id", (req,res) => {
    Artigo.findOne({_id:req.params.id}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado"
        })
    })
})

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        console.log(err)
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!" + err
        })
    

        return res.status(200).json({
          error: false,
          message: "Artigo cadastrado com sucesso!"
        })
    });
});

app.put("/artigo/:id", (req, res) => {
    const artigo = Artigo.updateOne({ _id: req.params.id}, req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi editado com sucesso!"
        });

        return res.json({
            error: false, 
            message: "Artigo editado com sucesso"
        })
    })
})

app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi apagado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Artigo apagado com sucesso!"
        })
    })
})

app.listen(8080, () =>{
    console.log("Servidor iniciado")
})