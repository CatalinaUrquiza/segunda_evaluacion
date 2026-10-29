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
            'test/setup-process.js',
            'test/renderizado.spec.tsx',
            'test/propiedades.spec.tsx',
            'test/estado.spec.tsx',
            'test/eventos.spec.tsx',
            'test/carrito.spec.ts'
        ],

        // esbuild compila TypeScript/JSX y junta las dependencias en un solo bundle
        preprocessors: {
            'test/**/*.spec.tsx': ['esbuild'],
            'test/**/*.spec.ts': ['esbuild']
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
