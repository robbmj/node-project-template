# Node Project Template

Get an ES 6 project setup and ready for development in seconds.

## Out of the Box

- Babel (support includes async, await, decorators)
- ESDoc
- Jasmine
- Development Web Server
- Browserify
- Minification
- Automatically Rebuild on File Save
- JSHint
- JSCS

### Building

 - First git clone this repo and cd into this repo
 - Next run `npm install` you may need to run `npm install -g gulp`
 - Next run `gulp` optionally you can run `gulp watch` this results in a new build being created
 anytime you save a file in `./src`

The build file will be in `./final/build.js`. The build process uses Common JS module definitions
and uses gulp-browserfy to produce the build.

#### Running the linter

`JSHint` is used to statically analyze the code for potential errors and `jscs` is used to look for style errors.
`jscs` is configured to use Douglas Crockford's recommended style. This combination of JSHint and jscs
should yield the same results as using `JSLint`

To run the liner issue the command: `$ gulp lint`

**Please always run the linter and fix any errors before committing code**

#### Running the unit tests

To run the tests issue the command: `$ gulp test`.

#### Building the Documentation

`$ npm run doc`

Documentation will be created in the `./docs` directory

---