# COMP3340project

This project has 2 npm projects:
- site/backend
- site/frontend/funstuff

## Install
*NOTE: Requires Node v16 to install and run!*

You can setup the repo very easily.

Use git bash to run `./setup.sh` within the `/site` directory

## Development
### Backend Development:
Go to the `site/backend` directory and then run

`npm start`

### Frontend Development:
Go to the `site/frontend/funstuff` directory and then run

`npm start`

### Viewing Front-end:
Go to [http://localhost:3000](http://localhost:3000)

### **Run Entire System:**
Go to the `/site` directory and run `./run.sh` with git bash

This runs both repos in 1 terminal. You can use `Ctrl + C` to exit.

### Dev Notes:
You should include logging for classes as follows:
1. Include `const log = getLogger("view.home");` at the top of the file and replace `home` with the view name. 
1. Change `view` to `controller`, `service` or `model` depending on the class type.
1. Import the getLogger class. 
1. Once finished, logging is as easy as `log.debug("Your log stuffs");`!