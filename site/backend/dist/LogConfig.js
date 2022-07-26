"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
/*--- LogConfig.ts ---*/
const typescript_logging_1 = require("typescript-logging");
const typescript_logging_log4ts_style_1 = require("typescript-logging-log4ts-style");
const provider = typescript_logging_log4ts_style_1.Log4TSProvider.createProvider("ExampleProvider", {
    /* Specify the various group expressions to match against */
    groups: [{
            expression: new RegExp("model.+"),
            level: typescript_logging_1.LogLevel.Debug, /* This group will log on debug instead */
        }, {
            expression: new RegExp("service.+"),
        }],
});
function getLogger(name) {
    return provider.getLogger(name);
}
exports.getLogger = getLogger;
//# sourceMappingURL=LogConfig.js.map