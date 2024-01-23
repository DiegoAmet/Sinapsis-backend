const { programarCampania } = require('../src/handlers/campaniasHandler');
const mysql = require('../src/utils/mysql');

jest.mock('../src/utils/mysql');

describe('programarCampania', () => {
  test('debería programar una campaña correctamente', async () => {
    const event = {
      body: 'nombre=MiCampaña&idUsuario=1&fechaHoraProgramacion=2023-01-01T12:00:00',
    };

    const mockResult = {
    };

    mysql.query.mockResolvedValueOnce(mockResult);

    const result = await programarCampania(event);

    expect(result.statusCode).toBe(200);
    expect(result.body).toContain('La campaña fue creada correctamente');
    expect(result.body).toContain('input');
    expect(result.body).toContain('message');
  });
});
