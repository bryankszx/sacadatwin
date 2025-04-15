const{ PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient

const insertProdutora = async function(ator) {
    try {
        let sql = `insert into tbl_produtora (nome)
                   values ('${produtora.nome}')`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result;

    } catch (error) {
        console.log('Erro ao inserir ator:', error);
        return false;
    }
}

const updateProdutora = async function(produtora) {
    try {
        let sql = `update tbl_produtora set nome = '${ator.produtora}'
                   where id_produtora = ${produtora.id_produtora}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        console.log('Erro ao atualizar a produtora:', error);
        return false;
    }
}
const deleteProdutora = async function(id){
    try {
        let sql = `delete from tbl_produtora where id = ${id}`
    
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true
        else
        return false 
    } catch (error) {
        return false 
    }   
}
    
const selectAllProdutora = async function() {
    try {
        let sql = `select * from tbl_produtora`;

        let result = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0)
            return result;
        else
            return false;

    } catch (error) {
        console.log('Erro ao buscar a produtora:', error);
        return false;
    }
}

const selectByIdProdutora = async function (id){

    try{
        let sql  = `select * from tbl_produtora where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
        return result
        else
        return false
    }catch(error){
        return false
    }

}

module.exports = {
    insertProdutora,
    updateProdutora,
    deleteProdutora,
    selectAllProdutora,
    selectByIdProdutora


}