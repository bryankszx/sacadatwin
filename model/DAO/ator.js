



const{ PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient

const insertAtor = async function(ator) {
    try {
        let sql = `insert into tbl_ator (nome)
                   values ('${ator.nome}')`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result;

    } catch (error) {
        console.log('Erro ao inserir ator:', error);
        return false;
    }
}

const updateAtor = async function(ator) {
    try {
        let sql = `update tbl_ator set nome = '${ator.nome}'
                   where id_ator = ${ator.id_ator}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        console.log('Erro ao atualizar ator:', error);
        return false;
    }
}
const deleteAtor = async function(id){
    try {
        let sql = `delete from tbl_ator where id = ${id}`
    
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true
        else
        return false 
    } catch (error) {
        return false 
    }   
}
    
const selectAllAtor = async function() {
    try {
        let sql = `select * from tbl_ator`;

        let result = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0)
            return result;
        else
            return false;

    } catch (error) {
        console.log('Erro ao buscar atores:', error);
        return false;
    }
}

const selectByIdAtor = async function (id){

    try{
        let sql  = `select * from tbl_ator where id = ${id}`

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
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtor,
    selectByIdAtor


}