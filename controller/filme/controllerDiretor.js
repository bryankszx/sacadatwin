const message = require('../../modulo/config.js')
const diretorDAO = require('../../model/DAO/diretor.js')

// Inserir novo diretor
const inserirDiretor = async function(diretor, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        diretor.nome == '' || diretor.nome == undefined || diretor.nome == null || diretor.nome.length > 45 ||
        diretor.nacionalidade == '' || diretor.nacionalidade == undefined || diretor.nacionalidade == null || diretor.nacionalidade.length > 45
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let result = await diretorDAO.insertDiretor(diretor)

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

// Atualizar diretor
const atualizarDiretor = async function(id, diretor, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
        diretor.nome == '' || diretor.nome == undefined || diretor.nome == null || diretor.nome.length > 45 ||
        diretor.nacionalidade == '' || diretor.nacionalidade == undefined || diretor.nacionalidade == null || diretor.nacionalidade.length > 45
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let resultDiretor = await diretorDAO.selectByIdDiretor(parseInt(id))

        if (resultDiretor != false && typeof resultDiretor == 'object') {
          if (resultDiretor.length > 0) {
            diretor.id_diretor = parseInt(id)

            let result = await diretorDAO.updateDiretor(diretor)

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

// Excluir diretor
const excluirDiretor = async function(id) {
  try {
    if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
      return message.ERROR_REQUIRED_FIELDS // 400
    } else {
      let resultDiretor = await diretorDAO.selectByIdDiretor(parseInt(id))

      if (resultDiretor != false && typeof resultDiretor == 'object') {
        if (resultDiretor.length > 0) {
          let result = await diretorDAO.deleteDiretor(parseInt(id))

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

// Listar todos os diretores
const listarDiretor = async function() {
  try {
    let resultDiretor = await diretorDAO.selectAllDiretor()

    if (resultDiretor != false && resultDiretor.length > 0) {
      let dadosDiretor = {}
      dadosDiretor.status = true
      dadosDiretor.status_code = 200
      dadosDiretor.itens = resultDiretor.length
      dadosDiretor.diretores = resultDiretor

      return dadosDiretor
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Buscar diretor por ID
const buscarDiretor = async function(id_diretor) {
  try {
    if (id_diretor == '' || id_diretor == undefined || id_diretor == null || isNaN(id_diretor) || id_diretor <= 0) {
      return message.ERROR_REQUIRED_FIELDS
    } else {
      let resultDiretor = await diretorDAO.selectByIdDiretor(parseInt(id_diretor))

      if (resultDiretor != false && resultDiretor.length > 0) {
        let dadosDiretor = {}
        dadosDiretor.status = true
        dadosDiretor.status_code = 200
        dadosDiretor.diretor = resultDiretor

        return dadosDiretor
      } else {
        return message.ERROR_NOT_FOUND
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = {
  inserirDiretor,
  atualizarDiretor,
  excluirDiretor,
  listarDiretor,
  buscarDiretor
}
