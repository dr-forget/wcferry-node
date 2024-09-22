import chalk from 'chalk';
import { Command } from 'commander';
import * as pkg from './package.json';
import { Wcferry } from '@zippybee/wechatcore';
const program = new Command();

program.version(pkg.version, '-V --version').usage('<command> [options]');

program
  .command('start')
  .description('start of wcf')
  .option('-p', '--port <port>', 'wcf is running on port')
  .option('-d', '--dir <dir>', 'wcf is running on dir')
  .action((options) => {
    const wcferry = new Wcferry({
      service: true,
      port: options.port,
      wcf_path: options.dir || '',
    });
    wcferry.start();
    console.log(chalk.green('WCF is Running on port: ' + options.port));
  });

program
  .command('stop')
  .description('stop of wcf')
  .action(() => {
    const wcferry = new Wcferry({
      port: 10086,
    });
    wcferry.stopWcf();
    console.log(chalk.green('WCF is stoped'));
  });
