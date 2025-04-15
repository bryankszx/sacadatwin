
const message = require('../../modulo/config.js')
const atorDAO = require('../../model/DAO/ator.js')

// Inserir novo ator
const inserirAtor = async function(ator, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        ator.nome == '' || ator.nome == undefined || ator.nome == null || ator.nome.length > 45
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let result = await atorDAO.insertAtor(ator)

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

// Atualizar ator
const atualizarAtor = async function(id, ator, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
        ator.nome == '' || ator.nome == undefined || ator.nome == null || ator.nome.length > 45
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let resultAtor = await atorDAO.selectByIdAtor(parseInt(id))

        if (resultAtor != false || typeof resultAtor == 'object') {
          if (resultAtor.length > 0) {
            ator.id_ator = parseInt(id)

            let result = await atorDAO.updateAtor(ator)

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

// Excluir ator
const excluirAtor = async function(id) {
  try {
    if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
      return message.ERROR_REQUIRED_FIELDS // 400
    } else {
      let resultAtor = await atorDAO.selectByIdAtor(parseInt(id))

      if (resultAtor != false || typeof resultAtor == 'object') {
        if (resultAtor.length > 0) {
          let result = await atorDAO.deleteAtor(parseInt(id))

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

// Listar todos os atores
const listarAtor = async function() {
  try {
    let resultAtor = await atorDAO.selectAllAtor()

    if (resultAtor != false && resultAtor.length > 0) {
      let dadosAtor = {}
      dadosAtor.status = true
      dadosAtor.status_code = 200
      dadosAtor.itens = resultAtor.length
      dadosAtor.atores = resultAtor

      return dadosAtor
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Buscar ator por ID
const buscarAtor = async function(id_ator) {
  try {
    if (id_ator == '' || id_ator == undefined || id_ator == null || isNaN(id_ator) || id_ator <= 0) {
      return message.ERROR_REQUIRED_FIELDS
    } else {
      let resultAtor = await atorDAO.selectByIdAtor(parseInt(id_ator))

      if (resultAtor != false && resultAtor.length > 0) {
        let dadosAtor = {}
        dadosAtor.status = true
        dadosAtor.status_code = 200
        dadosAtor.ator = resultAtor

        return dadosAtor
      } else {
        return message.ERROR_NOT_FOUND
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = {
  inserirAtor,
  atualizarAtor,
  excluirAtor,
  listarAtor,
  buscarAtor
}
