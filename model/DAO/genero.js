const{ PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient




const insertGenero = async function(genero) {
    try {
        let sql = `insert into tbl_genero (nome)
                   values ('${ator.genero}')`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result;

    } catch (error) {
        console.log('Erro ao inserir genero:', error);
        return false;
    }
}

const updateGenero = async function(genero) {
    try {
        let sql = `update tbl_genero set nome = '${genero.nome}'
                   where id_genero = ${genero.id_genero}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        console.log('Erro ao atualizar o genero:', error);
        return false;
    }
}
const deleteGenero = async function(id){
    try {
        let sql = `delete from tbl_genero where id = ${id}`
    
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true
        else
        return false 
    } catch (error) {
        return false 
    }   
}
    
const selectAllGenero = async function() {
    try {
        let sql = `select * from tbl_genero`;

        let result = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0)
            return result;
        else
            return false;

    } catch (error) {
        console.log('Erro ao buscar genero:', error);
        return false;
    }
}

const selectByIdGenero = async function (id){

    try{
        let sql  = `select * from tbl_genero where id = ${id}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero


}