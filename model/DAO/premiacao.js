const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertPremiacao = async function(premiacao) {
    try {
        let sql = `insert into tbl_premiacao (premiacao)
                   values ('${premiacao.premiacao}')`

        let result = await prisma.$executeRawUnsafe(sql)
        return result

    } catch (error) {
        console.log('Erro ao inserir a premiação:', error)
        return false
    }
}

const updatePremiacao = async function(premiacao) {
    try {
        let sql = `update tbl_premiacao set 
                      premiacao = '${premiacao.premiacao}'
                   where id_premiacao = ${premiacao.id_premiacao}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log('Erro ao atualizar a premiação:', error)
        return false
    }
}

const deletePremiacao = async function(id) {
    try {
        let sql = `delete from tbl_premiacao where id_premiacao = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log('Erro ao deletar a premiação:', error)
        return false
    }
}

const selectAllPremiacao = async function() {
    try {
        let sql = `select * from tbl_premiacao`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result
        else
            return false

    } catch (error) {
        console.log('Erro ao buscar premiações:', error)
        return false
    }
}

const selectByIdPremiacao = async function(id) {
    try {
        let sql = `select * from tbl_premiacao where id_premiacao = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        console.log('Erro ao buscar premiação por ID:', error)
        return false
    }
}

module.exports = {
    insertPremiacao,
    updatePremiacao,
    deletePremiacao,
    selectAllPremiacao,
    selectByIdPremiacao
}
