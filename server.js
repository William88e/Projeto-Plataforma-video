const bodyParse = require("body-parser");
const express = require("express");
const app = express();

app.use(express.static("."));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

const multer = require("multer");
const storage = multer.diskStorage({
  //Função destino
  destination: function(req, file, callback) {
    callback(null, "./upload");
    //Crie uma pasta upload no projeto
  },
  //Nome do arquivo
  //Date é se um arquive tiver um mesmo nome a data será outra
  //Não sub escrevendo o arquivo anterior
  filename: function(req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  }
});

//Chamo o objeto storage - virá uma arquivo de nome arquivo
const upload = multer({ storage }).single("arquivo");
app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.end("Erro no Post");
    }
    res.end("Concluído com sucesso");
  });
});
app.post("/formulario", (req, res) => {
  res.send({
    ...req.body,
    id: 1
  });
});
app.listen(8080, () => console.log("Executando..."));
app.get("/parOuImpar", (req, res) => {
  const par = parseInt(req.query.numero) % 2 === 0;
  //req recebe query seleção quem vem da url numero (valor int) resto de zero e par
  res.send({
    resultado: par ? "par" : "impar"
  });
});
