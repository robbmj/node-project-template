'use strict';

module.exports.uglifyOptions = {
    warnings:           true,
    mangle:             true,
    output: {
        inline_script:  true,
        comments:       false,
        semicolons:     true
    },
    compress: {
        sequences:      true,   // join consecutive statements with the "comma operator"
        properties:     true,   // optimize property access: a["foo"]  a.foo
        dead_code:      true,   // discard unreachable code
        drop_debugger:  true,   // discard "debugger" statements
        unsafe:         false,  // some unsafe optimizations (see below)
        conditionals:   true,   // optimize if-s and conditional expressions
        comparisons:    true,   // optimize comparisons
        evaluate:       true,   // evaluate constant expressions
        booleans:       true,   // optimize boolean expressions
        loops:          true,   // optimize loops
        unused:         true,   // drop unused variables/functions
        hoist_funs:     true,   // hoist function declarations
        hoist_vars:     false,  // hoist variable declarations
        if_return:      true,   // optimize if-s followed by return/continue
        join_vars:      true,   // join var declarations
        cascade:        true,   // try to cascade `right` into `left` in sequences
        side_effects:   true,   // drop side-effect-free statements
        warnings:       true    // warn about potentially dangerous optimizations/code
    }
};

module.exports.jshint = {
    node:               true,
    curly:              true,
    eqeqeq:             true,
    freeze:             true,
    futurehostile:      true,
    esversion:          6
};

module.exports.babel = {
    presets: ['es2015', 'stage-3'],
    plugins: [
        "syntax-async-functions",
        "transform-async-to-generator",
        "transform-regenerator",
        "transform-runtime"
    ]
};

module.exports.devBuild = {
    browserify: {
        insetGlobals:   true,
        debug:          false,
        entries:        ['./build/node/main.js'],
        extensions:     ['.js', '.json', '.es6']
    },
    metaScript: {
        ENFORCE_TYPE:   true,
        DEBUG_INFO:     true,
        DEBUG_WARN:     true,
        DEBUG_ERROR:    true,
    }
};

module.exports.prodBuild = {
    browserify: {
        insetGlobals:   true,
        debug:          false,
        entries:        ['./build/node/main.js'],
        extensions:     ['.js', '.json', '.es6']
    },
    metaScript: {
        ENFORCE_TYPE:   false,
        DEBUG_INFO:     false,
        DEBUG_WARN:     false,
        DEBUG_ERROR:    true,
    }
};

module.exports.srcDir           = './src/**/*.js';
module.exports.metaBuildDir     = './tmp/';

module.exports.babelEntryPoint  = './tmp/main.js';
module.exports.babelBuildDir    = './build/node';

module.exports.buildDir         = './build/';
module.exports.buildName        = 'build';

module.exports.testDir          = 'tests';
module.exports.testFiles        = '/**/*\.test\.js';

module.exports.licenceFile      = './LICENCE';
module.exports.banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' */',
        ''].join('\n');


