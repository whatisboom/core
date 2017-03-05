import {
  identity,
  padStart
} from 'lodash';
import * as chalk from 'chalk';
import DenaliObject from '../metal/object';

type LogLevel = 'info' | 'warn' | 'error';

interface ColorsMap {
  [level: string]: chalk.ChalkChain;
}

/**
 * A simple Logger class that adds timestamps and supports multiple levels of logging, colorized
 * output, and control over verbosity.
 *
 * @package runtime
 * @since 0.1.0
 */
export default class Logger extends DenaliObject {

  /**
   * Default log level if none specified.
   *
   * @since 0.1.0
   */
  public loglevel: LogLevel = 'info';

  /**
   * Specify if logs should be colorized.
   *
   * @since 0.1.0
   */
  public colorize = true;

  /**
   * Available log levels that can be used.
   */
  public levels: LogLevel[] = [
    'info',
    'warn',
    'error'
  ];

  /**
   * Color map for the available levels.
   */
  public colors: ColorsMap = {
    info: chalk.white,
    warn: chalk.yellow,
    error: chalk.red
  };

  /**
   * Log at the 'info' level.
   *
   * @since 0.1.0
   */
  public info(msg: any): void {
    this.log('info', msg);
  }

  /**
   * Log at the 'warn' level.
   *
   * @since 0.1.0
   */
  public warn(msg: any): void {
    this.log('warn', msg);
  }

  /**
   * Log at the 'error' level.
   *
   * @since 0.1.0
   */
  public error(msg: any): void {
    this.log('error', msg);
  }

  /**
   * Log a message to the logger at a specific log level.
   */
  public log(level: LogLevel, msg: any): void {
    if (this.levels.indexOf(level) === -1) {
      level = this.loglevel;
    }
    let timestamp = (new Date()).toISOString();
    let padLength = this.levels.reduce((n: number, label) => Math.max(n, label.length), null);
    let levelLabel = padStart(level.toUpperCase(), padLength);
    if (this.colorize) {
      let colorizer = this.colors[level] || identity;
      msg = colorizer(msg);
      levelLabel = colorizer(levelLabel);
    }
    /* tslint:disable:no-console */
    console.log(`[${ timestamp }] ${ levelLabel } - ${ msg }`);
    /* tslint:enable:no-console */
  }

}
