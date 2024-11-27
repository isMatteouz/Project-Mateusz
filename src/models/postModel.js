import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";    
    // Conecta ao banco de dados usando a string de conexão armazenada em uma variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
    // Função assíncrona para buscar todos os posts no banco de dados
export async function getTodosPosts() {
    // Acessa o banco de dados "imersao-instamon"
    const db = conexao.db("imersao-instamon");
    // Acessa a coleção "posts"
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instamon");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instamon");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
