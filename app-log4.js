const log4js = require('log4js')


log4js.configure({
    appenders: {
        // defino dos soportes de salida de datos
        consola: { type: 'console' },
        archivo: { type: 'file', filename: 'errores.log' },
        // defino sus niveles de logueo
        loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
        loggerArchivo: { type: 'logLevelFilter', appender: 'archivo', level: 'error' }
    },
    categories: {
        default: {
            appenders: ['loggerConsola'], level: 'all'
        },
        prod: {
            appenders: ['loggerConsola', 'loggerArchivo'], level: 'all'
        }
    }
})

let logger = null

if (process.env.NODE_ENV === 'production') {
    logger = log4js.getLogger('prod')
} else {
    logger = log4js.getLogger()    
}
module.exports = logger
