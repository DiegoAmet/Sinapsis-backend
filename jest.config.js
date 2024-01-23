module.exports = {
    testEnvironment: 'node', // Configura el entorno de prueba para Node.js
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$', // Patrón de búsqueda de archivos de prueba
    moduleFileExtensions: ['js', 'json', 'node'], // Extensiones de archivos que Jest debe considerar
    collectCoverage: true, // Habilita la recopilación de cobertura
    collectCoverageFrom: ['src/**/*.js'], // Rutas de archivos para recopilar cobertura
    coverageDirectory: 'coverage', // Directorio para almacenar informes de cobertura
};
  