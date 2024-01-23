const querystring = require('querystring');
const mysql = require('../utils/mysql');

async function programarCampania(event) {
    try {

        const body = querystring.parse(event["body"])

        const { nombre, idUsuario, fechaHoraProgramacion } = body;

        const result = await mysql.query(
            'INSERT INTO campania (nombre, idUsuario, fechaHoraProgramacion, estado) VALUES (?, ?, ?, TRUE)',
            [nombre, idUsuario, fechaHoraProgramacion]
        );

        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: `La campaña fue creada correctamente`,
                    input: result,
                },
                null,
                2
            ),
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify(
            {
                error: 'Error interno del servidor.'
            },
            null,
            2
            ),
        };
    } finally {
        await mysql.end();
    }
}

module.exports = { programarCampania };
