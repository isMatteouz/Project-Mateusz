    // Importa o módulo express para criar o servidor web
import express from "express";
    // Importa o módulo multer para lidar com uploads de arquivos
import multer from "multer";
    // Importa as funções do controlador de posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

    // Configura o armazenamento para o multer
const storage = multer.diskStorage({
    // Define o destino onde os arquivos enviados serão armazenados
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Chama o callback com o caminho 'uploads/'
    },
    // Define o nome do arquivo que será salvo
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Chama o callback com o nome original do arquivo
    }
})

    // Inicializa o multer com a configuração de armazenamento e um diretório de destino
const upload = multer({ dest: "./uploads", storage })

    // Define as rotas do aplicativo
const routes = (app) => {
    // Configura o express para usar JSON no corpo das requisições
    app.use(express.json());
    app.use(cors(corsOptions));
    // Rota que, ao ser acessada, envia uma resposta com status 200 e a lista de posts
    app.get("/posts", listarPosts);
    // Rota para criar um novo post, que chama a função correspondente no controlador
    app.post("/posts", postarNovoPost);
    // Rota para fazer upload de uma imagem, chamando a função de upload e, em seguida, a função de processamento da imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
};

    // Exporta as rotas para serem utilizadas em outros arquivos
export default routes;