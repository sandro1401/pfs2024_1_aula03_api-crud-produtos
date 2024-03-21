const express = require('express')
const app = express()
const port = 3000

let produtos = [
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



app.get('/', (req, res) => {
  res.send('<h1>Hello World!')
})

app.get('/produtos', (req, res) => {
    res.json(produtos)
  })

  app.get('/produtos/:id', (req, res) => {
    const id = +req.params.id;
    let produto = produtos.find((produto) =>
    {return produto.id === id;}
    )
    if(produto){
        res.json(produto)
    }
    else{
        res.status(404).json({erro: "Produto não encontardo"})
    }


    res.json({id:+req.params.id});
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})