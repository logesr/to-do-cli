# to-do-cli
This is a command line tool to manage to-dos.

### Libraries used

- commander -  for command line interface implementation
- joi - for schema validation
- axios - for making external api calls
- jest - for testing

### Commands implemented

Right now only one command is implemented as below.

`to-do list-status`

By default, it prints the status of first 20 even numbered to-do items. It also supports 2 flags -

- -l,--limit - the number of to do items to be printed. By default, it is 20.
- -t, --task-type - the task type which supports 3 values all, even and odd. By default, it is even.

Example commands are

`to-do list-status -t all -l 10`
`to-do list-status -t odd -l 5`

### How to run the test

After cloning the repository, run the below command.

`npm run test`

### How to setup the tool locally

After cloning the repository, run the below commands.

`npm install`

`npm link`

`to-do list-status`

### How to setup the tool using docker

After cloning the repository, run the below commands.

`docker build -t to-do-cli .`

`docker run --rm to-do-cli to-do list-status`

