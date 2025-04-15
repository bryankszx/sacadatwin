
const message = require('../../modulo/config.js')
const atorDAO = require('../../model/DAO/produtora.js')

// Inserir novo ator
const inserirProdutora = async function(ator, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        produtora.nome == '' || produtora.nome == undefined || produtora.nome == null || produtora.nome.length > 45
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let result = await produtoraDAO.inserirProdutora(produtora)

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
const atualizarProdutora = async function(id, produtora, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
        produtora.nome == '' || produtora.nome == undefined || produtora.nome == null || produtora.nome.length > 45
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let resultProdutora = await atorDAO.selectByIdProdutora(parseInt(id))
        if (resultProdutora != false || typeof resultProdutora == 'object') {
          if (resultProdutora.length > 0) {
            produtora.id_produtora = parseInt(id)

            let result = await produtoraDAO.updateProdutora(produtora)

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
const excluirProdutora = async function(id) {
  try {
    if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
      return message.ERROR_REQUIRED_FIELDS // 400
    } else {
      let resultProdutora = await atorDAO.selectByIdProdutora(parseInt(id))

      if (resultProdutora != false || typeof resultProdutora == 'object') {
        if (resultProdutora.length > 0) {
          let result = await produtoraDAO.deleteProdutora(parseInt(id))

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
const listarProdutora = async function() {
  try {
    let resultProdutora = await produtoraDAO.selectAllProdutora()

    if (resultProdutora != false && resultProdutora.length > 0) {
      let dadosProdutora = {}
      dadosProdutora.status = true
      dadosProdutora.status_code = 200
      dadosProdutora.itens = resultProdutora.length
      dadosProdutora.atores = resultProdutora

      return dadosProdutora
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Buscar ator por ID
const buscarProdutora = async function(id_ator) {
  try {
    if (id_produtora == '' || id_produtora == undefined || id_produtora == null || isNaN(id_produtora) || id_produtora <= 0) {
      return message.ERROR_REQUIRED_FIELDS
    } else {
      let resultProdutora = await produtoraDAO.selectByIdProdutora(parseInt(id_produtora))

      if (resultProdutora != false && resultProdutora.length > 0) {
        let dadosProdutora = {}
        dadosProdutora.status = true
        dadosProdutora.status_code = 200
        dadosProdutora.produtora = resultProdutora

        return dadosProdutora
      } else {
        return message.ERROR_NOT_FOUND
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = {
  inserirProdutora,
  atualizarProdutora,
  excluirProdutora,
  listarProdutora,
  buscarProdutora
}
