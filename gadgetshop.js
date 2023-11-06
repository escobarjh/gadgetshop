//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
 
 
//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;
 
 
//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/gadgetshop',
{   useNewUrlParser: true,
    useUnifiedTopology: true
});
 
 
//criando a model do seu projeto
const usuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});
 
 
const Usuario = mongoose.model("Usuario", usuarioSchema);
 
 
//criando a segunda model
const produtotendenciaSchema = new mongoose.Schema({
    id_produtotendencia : {type : String, required : true},
    descricao : {type : String},
    marca : {type : String},
    dataEntrega : {type : Date},
    mesesgarantia : {type : Number}
});
 
 
const produtotendencia = mongoose.model("produtotendencia", produtotendenciaSchema);
 
 
//configurando os roteamentos
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;
 
 
//mandando para banco
    const usuario = new Usuario({
        email : email,
        senha : senha,
    })
 
    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }
});
 
app.post("/cadastroprodutotendencia", async(req, res)=>{
    const id_produtotendencia = req.body.id_produtotendencia;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const dataEntrega = req.body.dataEntrega;
    const mesesgarantia = req.body.mesesgarantia
 
    //mandando para banco
    const produtotendencia = new produtotendencia({
        id_produtotendencia : id_produtotendencia,
        descricao : descricao,
        marca : marca,
        dataEntrega : dataEntrega,
        mesesgarantia : mesesgarantia
    })
 
    try{
        const newprodutotendencia = await produtotendencia.save();
        res.json({error : null, msg : "Cadastro ok", produtotendenciaId : newprodutotendencia._id});
    } catch(error){
        res.status(400).json({error});
    }
});
 
//rota para o get de cadastro
app.get("/cadastrousuario", async(req, res)=>{
    res.sendFile(__dirname +"/cadastrousuario.html");
})
 
//rota para o get de cadastro
app.get("/cadastroprodutotendencia", async(req, res)=>{
    res.sendFile(__dirname +"/cadastroprodutotendencia.html");
})
 
//rota raiz - inw
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});
 
//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});