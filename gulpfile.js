'use strict';

// Build Configuration
const buildConfig = require('./build.config');

// Build Dependencies
const gulp        = require('gulp');
const uglify      = require('gulp-uglify');
const rename      = require('gulp-rename');
const watch       = require('gulp-watch');
const batch       = require('gulp-batch');
const metaScript  = require('gulp-metascript');
const del         = require('del');
const browserify  = require('browserify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');
const babel       = require('gulp-babel');


// LICENCE COMMENT
const header      = require('gulp-header');
const fs          = require('fs');
const licence     = fs.readFileSync(buildConfig.licenceFile);

// LIBRARY INFO COMMENT
const pkgInfo     = {
    pkg: require('./package.json')
};

// Web Server
const webserver   = require('gulp-webserver');

// Command Line Args
const argv        = require('yargs').argv;

// Code Quality Dependencies
const jshint      = require('gulp-jshint');
const jscs        = require('gulp-jscs');
const reporter    = require('jshint-stylish').reporter;

// Test Dependencies
const Jasmine     = require('jasmine');

// Build Helpers
function build(options) {
    return browserify(options.browserify)
        .bundle()
        .pipe(source(buildConfig.buildName + '.js'))
        .pipe(buffer())
        .pipe(header(licence + buildConfig.banner, pkgInfo))
        .pipe(gulp.dest(buildConfig.buildDir))
        .pipe(uglify(buildConfig.uglifyOptions))
        .pipe(rename(buildConfig.buildName + '.min.js'))
        .pipe(header(licence + buildConfig.banner, pkgInfo))
        .pipe(gulp.dest(buildConfig.buildDir));
}

function meta(metaScriptOptions) {
    return gulp.src(buildConfig.srcDir)
        .pipe(metaScript(metaScriptOptions))
        .pipe(gulp.dest(buildConfig.metaBuildDir));
}

// Build Tasks
gulp.task('clean', function () {
    return del([buildConfig.buildDir, buildConfig.tmp]);
});


gulp.task('babel', ['meta-dev'], function () {

    return gulp.src(buildConfig.babelEntryPoint)
        .pipe(babel(buildConfig.babel))
        .pipe(gulp.dest(buildConfig.babelBuildDir));
});

gulp.task('meta-dev', /*['clean'],*/ function () {
    return meta(buildConfig.devBuild.metaScript);
});

gulp.task('meta-prod', ['clean'], function () {
    return meta(buildConfig.prodBuild.metaScript);
});

gulp.task('build', ['babel'], function () {
    return build(buildConfig.devBuild);
});

gulp.task('prod-build', ['meta-prod'], function () {
    return build(buildConfig.prodBuild);
});

gulp.task('watch', function () {
    watch(buildConfig.srcDir, batch(function (events, done) {
        gulp.start('build', done);
    }));
});

// Code Quality Tasks
gulp.task('lint', function () {
    return gulp.src([buildConfig.srcDir])
        .pipe(jshint(buildConfig.jshint))
        .pipe(jshint.reporter(reporter))
        .pipe(jscs())
        .pipe(jscs.reporter());
});

// Test Tasks
gulp.task('test', function () {
    const jasmine = new Jasmine();
    jasmine.loadConfig({
        spec_dir: buildConfig.testDir,
        spec_files: [buildConfig.testFiles]
    });
    jasmine.execute();
});

// Runs the Web Server
gulp.task('serve', function () {
    const port = argv.port || 8080
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            port: port
        }));
});

gulp.task('default', ['build']);
