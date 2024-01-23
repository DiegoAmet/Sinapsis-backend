const { listaMensajesActivos } = require('../src/handlers/mensajesHandler');
const mysql = require('../src/utils/mysql');

jest.mock('../src/utils/mysql');

describe('listaMensajesActivos', () => {
  test('debería retornar un mensaje de error si el mes no está presente', async () => {
    const event = { body: 'idCliente=1' };
    const result = await listaMensajesActivos(event);
    expect(result.statusCode).toBe(400);
    expect(result.body).toContain('El mes es obligatorio');
  });
});
