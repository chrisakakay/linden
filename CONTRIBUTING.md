## So you want to contribute?

You can find the easy bugs [here](https://github.com/chrisakakay/linden/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+bug%22).

If you need help just ask, probably you can find us on gitter (link on the front page).

## Quick start guide

- Clone the repository
- You can deploy your local version with ```npm run local``` however this will run the tests and errors will halt the deploy
- If you want untested deploy: ```npm -g install .``` from your local directory
- ```npm run test``` will only run ESLint and the jasmine tests
- ```npm run coverage``` will run the ESLint, the jasmine tests and it will generate the coverage aswell
- Thats all, you are good to go now. :)

### Some info

- We use ESLint (PR should be lint error free, otherwise travis will fail)
- We use Jasmine and Instanbul (PR should be tested properly, otherwise the coverage tools will scream)
- Coverage decrease is not accepted (if you need help just ask!)
- If you have some ideas feel free to make an issue about it so we can talk about the topic (and ask for an idea tag)
