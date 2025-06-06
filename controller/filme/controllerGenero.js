const message = require('../../modulo/config.js')
const generoDAO = require('../../model/DAO/genero.js')

// Inserir novo gênero
const inserirGenero = async function(genero, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 45
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let result = await generoDAO.insertGenero(genero)

        if (result)
          return message.SUCCESS_CREATED_ITEM // 201
        else
          return message.ERROR_INTERNAL_SERVER
      }
    } else {
      return message.ERROR_CONTENT_TYPE // 415
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Atualizar gênero
const atualizarGenero = async function(id, genero, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
        genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 45
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

        if (resultGenero != false && typeof resultGenero == 'object') {
          if (resultGenero.length > 0) {
            genero.id_genero = parseInt(id)

            let result = await generoDAO.updateGenero(genero)

            if (result)
              return message.SUCCESS_UPDATED_ITEM // 200
            else
              return message.ERROR_INTERNAL_SERVER_MODEL // 500
          } else {
            return message.ERROR_NOT_FOUND // 404
          }
        } else {
          return message.ERROR_INTERNAL_SERVER_MODEL
        }
      }
    } else {
      return message.ERROR_CONTENT_TYPE // 415
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }
}

// Excluir gênero
const excluirGenero = async function(id) {
  try {
    if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
      return message.ERROR_REQUIRED_FIELDS // 400
    } else {
      let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

      if (resultGenero != false && typeof resultGenero == 'object') {
        if (resultGenero.length > 0) {
          let result = await generoDAO.deleteGenero(parseInt(id))

          if (result)
            return message.SUCCESS_DELETED_ITEM // 200
          else
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        } else {
          return message.ERROR_NOT_FOUND // 404
        }
      } else {
        return message.ERROR_INTERNAL_SERVER_MODEL // 500
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }
}

// Listar todos os gêneros
const listarGenero = async function() {
  try {
    let resultGenero = await generoDAO.selectAllGenero()

    if (resultGenero != false && resultGenero.length > 0) {
      let dadosGenero = {}
      dadosGenero.status = true
      dadosGenero.status_code = 200
      dadosGenero.itens = resultGenero.length
      dadosGenero.generos = resultGenero

      return dadosGenero
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Buscar gênero por ID
const buscarGenero = async function(id_genero) {
  try {
    if (id_genero == '' || id_genero == undefined || id_genero == null || isNaN(id_genero) || id_genero <= 0) {
      return message.ERROR_REQUIRED_FIELDS
    } else {
      let resultGenero = await generoDAO.selectByIdGenero(parseInt(id_genero))

      if (resultGenero != false && resultGenero.length > 0) {
        let dadosGenero = {}
        dadosGenero.status = true
        dadosGenero.status_code = 200
        dadosGenero.genero = resultGenero

        return dadosGenero
      } else {
        return message.ERROR_NOT_FOUND
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = {
  inserirGenero,
  atualizarGenero,
  excluirGenero,
  listarGenero,
  buscarGenero
}
