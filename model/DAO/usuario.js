const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertUsuario = async function(usuario) {
    try {
        let sql = `insert into tbl_usuario (nome, email)
                   values ('${usuario.nome}', 
                           '${usuario.email}',)`

        let result = await prisma.$executeRawUnsafe(sql)
        return result

    } catch (error) {
        console.log('Erro ao inserir o usuario:', error)
        return false
    }
}

const updateUsuario = async function(usuario) {
    try {
        let sql = `update tbl_usuario set 
                      nome = '${usuario.nome}',
                      email = '${usuario.email}'
                   where id_diretor = ${usuario.id_usuario}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log('Erro ao atualizar o usuario:', error)
        return false
    }
}

const deleteUsuario = async function(id) {
    try {
        let sql = `delete from tbl_usuario where id_usuario = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllUsuario = async function() {
    try {
        let sql = `select * from tbl_usuario`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result
        else
            return false

    } catch (error) {
        console.log('Erro ao buscar os usuarios:', error)
        return false
    }
}

const selectByIdUsuario = async function(id) {
    try {
        let sql = `select * from tbl_usuario where id_usuario = ${id}`

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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}
