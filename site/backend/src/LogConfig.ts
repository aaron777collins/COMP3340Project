/*--- LogConfig.ts ---*/
import {LogLevel} from "typescript-logging";
import {Log4TSProvider, Logger} from "typescript-logging-log4ts-style";

// Provides a logger for all other classes
const provider = Log4TSProvider.createProvider("ExampleProvider", {
  /* Specify the various group expressions to match against */
  groups: [{
    // Loggers starting with model. use this property
    expression: new RegExp("model.+"),
    level: LogLevel.Debug, /* This group will log on debug instead */
  }, {
    // Loggers starting with service. use this property
    expression: new RegExp("service.+"),
    level: LogLevel.Debug, /* This group will log on debug instead */
  }],
});

// Returns a logger instance
export function getLogger(name: string): Logger {
  return provider.getLogger(name);
}