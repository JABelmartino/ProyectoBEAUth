const log4js = require('log4js')

// log4js.configure({
//     appenders: {
//       miLoggerConsole: { type: "console" },
//       miLoggerFile: { type: 'file', filename: 'info.log' },
//       miLoggerFile2: { type: 'file', filename: 'info2.log' }
//     },
//     categories: {
//       default: { appenders: ["miLoggerConsole"], level: "trace" }, // 1
//       consola: { appenders: ["miLoggerConsole"], level: "debug" }, // 2
//       archivo: { appenders: ["miLoggerFile"], level: "warn" }, // 3
//       archivo2: { appenders: ["miLoggerFile2"], level: "info" }, // 4
//       todos: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "error" } //5
//     }
// })

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


// const logger = log4js.getLogger('todos');
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");

let logger = null

if (process.env.NODE_ENV === 'production') {
    logger = log4js.getLogger('prod')
} else {
    logger = log4js.getLogger()    
}
module.exports = logger
