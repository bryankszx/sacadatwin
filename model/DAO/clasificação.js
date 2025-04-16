const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertClassificacao = async function(classificacao) {
    try {
        let sql = `insert into tbl_classificacao (idade, descriccao)
                   values ('${classificacao.idade}', '${classificacao.descricao}')`

        let result = await prisma.$executeRawUnsafe(sql)
        return result

    } catch (error) {
        console.log('Erro ao inserir a classificação:', error)
        return false
    }
}

const updateClassificacao = async function(classificacao) {
    try {
        let sql = `update tbl_classificacao set 
                      idade = '${classificacao.idade}',
                      descricao '${classificacao.descricao}'
                   where id_clasificacao = ${classificacao.id_classificacao}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log('Erro ao atualizar a classificação:', error)
        return false
    }
}

const deleteClassificacao = async function(id) {
    try {
        let sql = `delete from tbl_classificacao where id_classificacao = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllClassificacao = async function() {
    try {
        let sql = `select * from tbl_classificacao`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result
        else
            return false

    } catch (error) {
        console.log('Erro ao buscar a classificação:', error)
        return false
    }
}

const selectByIdClassificacao = async function(id) {
    try {
        let sql = `select * from tbl_classificacao where id_classificacao = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao
}
