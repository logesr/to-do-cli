#!/usr/bin/env node

const { Command, Option } = require('commander');
const { listStatus } = require('./handlers/todo');

const program = new Command();

program
  .name('todo')
  .description('Command line tool for todo list management')
  .version('1.0.0');

program
  .command('list-status')
  .description('List TODO task status')
  .addOption(new Option('-t, --task-type <type>', 'task type like even, odd, all').choices(['all', 'odd', 'even']).default('even'))
  .option('-l, --limit <type>', 'number of tasks to be listed', '20')
  .action((options) => listStatus(options.limit, options.taskType));

program.parse(process.argv);
