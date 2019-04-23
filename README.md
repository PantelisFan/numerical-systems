### Prerequisites

You have to make sure that mongod is running, and a db named `numerical-conversions` has been generated to accomodate this solution.


### How to run

`npm install` to install all dependencies,
`npm run start` to start the server, listening to port 3000,
`npm run test` to compare expected values against the controller's returned values.

A postman collection has been added which includes several request cases under `./postman` folder.

### Acknowledgements

- The methodology followed to convert roman numerals to arabic is the one described here:
`http://sierra.nmsu.edu/morandi/coursematerials/RomanNumerals.html`.

- Negative roman numerals are not valid, hence negative arabic numbers return status 400 (bad request).
- Zero (0) does not exist in roman numerals, hence conversion of 0 to roman return status 400 (bad request).