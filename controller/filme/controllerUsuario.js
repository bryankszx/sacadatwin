const message = require('../../modulo/config.js')
const diretorDAO = require('../../model/DAO/usuario.js')

// Inserir novo Usuario
const inserirUsuario = async function(diretor, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        usuario.nome == '' || usuario.nome == undefined || usuario.nome == null || usuario.nome.length > 45 ||
        usuario.email == '' || usuario.email == undefined || usuario.email == null || usuario.email.length > 100
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let result = await usuarioDAO.insertUsuario(usuario)

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

// Atualizar usuario
const atualizarUsuario = async function(id, usuario, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
        usuario.nome == '' || usuario.nome == undefined || usuario.nome == null || usuario.nome.length > 45 ||
        usuario.email == '' || usuario.email == undefined || usuario.email == null || usuario.email.length > 100
      ) {
        return message.ERROR_REQUIRED_FIELDS // 400
      } else {
        let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

        if (resultUsuario != false && typeof resultUsuario == 'object') {
          if (resultUsuario.length > 0) {
            usuario.id_usuario = parseInt(id)

            let result = await usuarioDAO.updateUsuario(usuario)

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

// Excluir Usuario
const excluirUsuario = async function(id) {
  try {
    if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
      return message.ERROR_REQUIRED_FIELDS // 400
    } else {
      let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

      if (resultUsuario != false && typeof resultUsuario == 'object') {
        if (resultUsuario.length > 0) {
          let result = await usuarioDAO.deleteUsuario(parseInt(id))

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

// Listar todos os usuarios
const listarUsuario = async function() {
  try {
    let resultUsuario = await usuarioDAO.selectAllUsuario()

    if (resultUsuario != false && resultUsuario.length > 0) {
      let dadosUsuario = {}
      dadosUsuario.status = true
      dadosUsuario.status_code = 200
      dadosUsuario.itens = resultUsuario.length
      dadosUsuario.usuarios = resultUsuario

      return dadosUsuario
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Buscar usuario por ID
const buscarUsuario = async function(id_usuario) {
  try {
    if (id_usuario == '' || id_usuario == undefined || id_usuario == null || isNaN(id_usuario) || id_usuario <= 0) {
      return message.ERROR_REQUIRED_FIELDS
    } else {
      let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id_usuario))

      if (resultUsuario != false && resultUsuario.length > 0) {
        let dadosUsuario = {}
        dadosUsuario.status = true
        dadosUsuario.status_code = 200
        dadosUsuario.usuario = resultUsuario

        return dadosUsuario
      } else {
        return message.ERROR_NOT_FOUND
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = {
  inserirUsuario,
  atualizarUsuario,
  excluirUsuario,
  listarUsuario,
  buscarUsuario
}
