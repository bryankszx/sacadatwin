const message = require('../../modulo/config.js')
const premiacaoDAO = require('../../model/DAO/premiacao.js')

// Inserir nova premiação
const inserirPremiacao = async function(premiacao, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        premiacao.premiacao == '' || premiacao.premiacao == undefined || premiacao.premiacao == null || premiacao.premiacao.length > 100
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let result = await premiacaoDAO.insertPremiacao(premiacao)

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

// Atualizar premiação
const atualizarPremiacao = async function(id, premiacao, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
        premiacao.premiacao == '' || premiacao.premiacao == undefined || premiacao.premiacao == null || premiacao.premiacao.length > 100
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

        if (resultPremiacao != false || typeof resultPremiacao == 'object') {
          if (resultPremiacao.length > 0) {
            premiacao.id_premiacao = parseInt(id)

            let result = await premiacaoDAO.updatePremiacao(premiacao)

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

// Excluir premiação
const excluirPremiacao = async function(id) {
  try {
    if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
      return message.ERROR_REQUIRED_FIELDS // 400
    } else {
      let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

      if (resultPremiacao != false || typeof resultPremiacao == 'object') {
        if (resultPremiacao.length > 0) {
          let result = await premiacaoDAO.deletePremiacao(parseInt(id))

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

// Listar todas as premiações
const listarPremiacao = async function() {
  try {
    let resultPremiacao = await premiacaoDAO.selectAllPremiacao()

    if (resultPremiacao != false && resultPremiacao.length > 0) {
      let dadosPremiacao = {}
      dadosPremiacao.status = true
      dadosPremiacao.status_code = 200
      dadosPremiacao.itens = resultPremiacao.length
      dadosPremiacao.premiacoes = resultPremiacao

      return dadosPremiacao
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Buscar premiação por ID
const buscarPremiacao = async function(id_premiacao) {
  try {
    if (id_premiacao == '' || id_premiacao == undefined || id_premiacao == null || isNaN(id_premiacao) || id_premiacao <= 0) {
      return message.ERROR_REQUIRED_FIELDS
    } else {
      let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id_premiacao))

      if (resultPremiacao != false && resultPremiacao.length > 0) {
        let dadosPremiacao = {}
        dadosPremiacao.status = true
        dadosPremiacao.status_code = 200
        dadosPremiacao.premiacao = resultPremiacao

        return dadosPremiacao
      } else {
        return message.ERROR_NOT_FOUND
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = {
  inserirPremiacao,
  atualizarPremiacao,
  excluirPremiacao,
  listarPremiacao,
  buscarPremiacao
}
