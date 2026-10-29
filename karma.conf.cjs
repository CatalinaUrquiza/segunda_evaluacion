// Configuración de Karma + Jasmine para probar los componentes React.
// (Es .cjs porque el package.json del proyecto usa "type": "module".)

module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-esbuild'),
            require('karma-spec-reporter')
        ],

        files: [
            // Define "process" para las librerías que lo consultan en el navegador
            'test/setup-process.js',
            // Todas las pruebas: test/algo.spec.ts o test/algo.spec.tsx
            { pattern: 'test/**/*.spec.{ts,tsx}', watched: false }
        ],

        // esbuild compila TypeScript/JSX y junta las dependencias en un solo bundle
        preprocessors: {
            'test/**/*.spec.{ts,tsx}': ['esbuild']
        },

        esbuild: {
            jsx: 'automatic',
            target: 'es2022',
            define: {
                'process.env.NODE_ENV': '"test"'
            }
        },

        // Muestra cada prueba con su nombre (sirve para el pantallazo de la entrega)
        reporters: ['spec'],
        specReporter: {
            suppressSkipped: true,
            showSpecTiming: false
        },

        // Chrome sin ventana. Si quieres verlo, cambia por 'Chrome'.
        browsers: ['ChromeHeadless'],

        singleRun: true,
        autoWatch: false
    })
}
