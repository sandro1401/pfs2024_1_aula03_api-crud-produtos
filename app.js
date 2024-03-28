const express = require('express')
const app = express()
const port = 3000

let Listaprodutos = [
    {
        id:1,
        nome: "Produto1",
        preco: 10.50
    },
    {
        id:2,
        nome: "Produto2",
        preco: 20.75

    }
];

app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h1>Hello World!')
})

app.get('/produtos', (req, res) => {
    res.json(Listaprodutos)
  })

  app.get('/produtos/:id', (req, res) => {
    const id = +req.params.id;
    let produto = Listaprodutos.find((produto) =>
    {return produto.id === id;}
    )
    if(produto){
        res.json(produto)
    }
    else{
        res.status(404).json({erro: "Produto não encontardo"})
    }


  })

app.post("/produtos", (req, res)=> {
    const produto = req.body;
    Listaprodutos.push(produto);
    res.status(201).json(produto);

})

app.put("/produtos/:id", (req, res)=> {
  const produtoPayload = req.body;
  const id = +req.params.id;
  let produtoAlterado;

  for(let produto of Listaprodutos){
    if(produto.id === id){
      produto.nome = produtoPayload.nome;
      produto.preco = produtoPayload.preco;
      res.json(produto);
      return;
    }
  }
  res.status(404).json({erro: "Produto não encontardo"})

})

app.delete("/produtos/:id", (req, res)=> {
  const id = +req.params.id;
  let indice = Listaprodutos.findIndex((produto) =>
  {return produto.id === id;})
  if(indice >=0){
    res.json(Listaprodutos.splice(indice,1));
  }
  else{res.status(404).json({erro: "Produto não encontrado"})}

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})