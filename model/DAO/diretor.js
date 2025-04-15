const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertDiretor = async function(diretor) {
    try {
        let sql = `insert into tbl_diretor (nome, nacionalidade)
                   values ('${diretor.nome}', '${diretor.nacionalidade}')`

        let result = await prisma.$executeRawUnsafe(sql)
        return result

    } catch (error) {
        console.log('Erro ao inserir diretor:', error)
        return false
    }
}

const updateDiretor = async function(diretor) {
    try {
        let sql = `update tbl_diretor set 
                      nome = '${diretor.nome}',
                      nacionalidade = '${diretor.nacionalidade}'
                   where id_diretor = ${diretor.id_diretor}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log('Erro ao atualizar diretor:', error)
        return false
    }
}

const deleteDiretor = async function(id) {
    try {
        let sql = `delete from tbl_diretor where id_diretor = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllDiretor = async function() {
    try {
        let sql = `select * from tbl_diretor`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result
        else
            return false

    } catch (error) {
        console.log('Erro ao buscar diretores:', error)
        return false
    }
}

const selectByIdDiretor = async function(id) {
    try {
        let sql = `select * from tbl_diretor where id_diretor = ${id}`

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
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretor,
    selectByIdDiretor
}
