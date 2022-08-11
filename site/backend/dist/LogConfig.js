"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
/*--- LogConfig.ts ---*/
const typescript_logging_1 = require("typescript-logging");
const typescript_logging_log4ts_style_1 = require("typescript-logging-log4ts-style");
// Provides a logger for all other classes
const provider = typescript_logging_log4ts_style_1.Log4TSProvider.createProvider("ExampleProvider", {
    /* Specify the various group expressions to match against */
    groups: [{
            // Loggers starting with model. use this property
            expression: new RegExp("model.+"),
            level: typescript_logging_1.LogLevel.Debug, /* This group will log on debug instead */
        }, {
            // Loggers starting with service. use this property
            expression: new RegExp("service.+"),
            level: typescript_logging_1.LogLevel.Debug, /* This group will log on debug instead */
        }],
});
// Returns a logger instance
function getLogger(name) {
    return provider.getLogger(name);
}
exports.getLogger = getLogger;
//# sourceMappingURL=LogConfig.js.map