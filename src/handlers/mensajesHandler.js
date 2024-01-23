const querystring = require('querystring');
const mysql = require('../utils/mysql');

async function listaMensajesActivos(event) {
  try {
    const body = querystring.parse(event.body);
    const { mes, idCliente } = body;
    
    if (!mes) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            error: 'El mes es obligatorio.',
          },
          null,
          2
        ),
      };
    }

    const results = await mysql.query(
        'SELECT estadoEnvio, COUNT(*) as cantidad_mensajes ' +
        'FROM mensaje m ' +
        'JOIN campania c ON m.idCampania = c.idCampania ' +
        'JOIN usuario u ON u.idUsuario = c.idUsuario ' +
        'JOIN cliente cl ON cl.idCliente = u.idCliente ' +
        'WHERE MONTH(c.fechaHoraProgramacion) = ? ' +
        'AND (cl.idCliente = ? OR ? IS NULL) ' +
        'AND m.estado = TRUE ' +
        'GROUP BY estadoEnvio',
        [mes, idCliente, idCliente]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Mostrar lista de mensajes activos',
          input: results,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: 'Error interno del servidor.',
        },
        null,
        2
      ),
    };
  }
  finally {
    await mysql.end();
  }
}

module.exports = { listaMensajesActivos };
