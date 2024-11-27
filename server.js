// Importa o módulo express, que é um framework para construir aplicações web em Node.js
import express from "express";
import routes from "./src/routes/postRoutes.js";
// Importa a função para conectar ao banco de dados

// Array de posts com informações como id, descrição e imagem
const posts = [
    {
        id: 1,
        descricao: "Pokemon lindo dormindo",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 2,
        descricao: "Pokemon com fome",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 3,
        descricao: "Pokemon tomando banho",
        imagem: "https://placecats.com/millie/300/150",
    },
];

// Cria uma instância do aplicativo express
const app = express();
app.use(express.static("uploads"));
routes(app)

// Faz o servidor escutar na porta 3000 e exibe uma mensagem no console quando está pronto
app.listen(3000, () => {
    console.log("Estou te ouvindo mané...");
});


// Função para buscar um post pelo seu ID
function buscarPostPorId(id) {
    // Retorna o índice do post cujo ID corresponde ao ID fornecido
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
};

// Define uma rota GET para acessar um post específico pelo ID
app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorId(req.params.id); // Busca o índice do post pelo ID
    res.status(200).json(posts[index]); // Envia o post encontrado como resposta em formato JSON
});