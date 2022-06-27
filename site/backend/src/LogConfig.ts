/*--- LogConfig.ts ---*/
import {LogLevel} from "typescript-logging";
import {Log4TSProvider, Logger} from "typescript-logging-log4ts-style";

const provider = Log4TSProvider.createProvider("ExampleProvider", {
  /* Specify the various group expressions to match against */
  groups: [{
    expression: new RegExp("model.+"),
    level: LogLevel.Debug, /* This group will log on debug instead */
  }, {
    expression: new RegExp("service.+"),
  }],
});

export function getLogger(name: string): Logger {
  return provider.getLogger(name);
}