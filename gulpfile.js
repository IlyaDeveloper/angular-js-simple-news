var gulp = require('gulp'),
    autoPrefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    path = require('path'),
    webserver = require('gulp-webserver'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    bower = require('gulp-bower'),
    jshint = require('gulp-jshint'),
    serve = require('gulp-serve'),
    notify = require('gulp-notify'),
    mainBowerFiles = require('main-bower-files'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    history = require('connect-history-api-fallback'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    gutil = require('gulp-util'),
    rimraf = require('rimraf'),
    revOutdated = require('gulp-rev-outdated'),
    path = require('path'),
    through = require('through2'),
    templateCache = require('gulp-angular-templatecache'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    merge = require('gulp-merge-json'),
    gulpMinifyCssNames = require('gulp-minify-cssnames');

var pathBower = './bower_components/';
var pathClient = './src/client/';
var pathBuildProd = './build/';
var pathBuildDev = './build-dev/';
var tmp = '.tmp';

var scripts = [
    pathClient + 'app/**/*.module.js',
    pathClient + 'app/**/*.js',
    '.tmp/templates/**/*.js'
];

var json = [
    pathClient + '**/*.json'
];

var config = [
    pathClient + 'config/*.js'
];

var pathBowerCss = [
    pathBower + 'bootstrap/dist/css/bootstrap.min.css',
    pathBower + 'summernote/dist/summernote.css',
    pathBower + 'ng-img-crop/compile/minified/ng-img-crop.css',
    pathBower + 'select2/select2.css',
    pathBower + 'angular-ui-select/dist/select.css',
    pathBower + 'angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
    pathBower + 'ng-tags-input/ng-tags-input.min.css',
    pathBower + 'ng-tags-input/ng-tags-input.bootstrap.min.css',
    pathBower + 'photoswipe/dist/photoswipe.css',
    pathBower + 'photoswipe/dist/default-skin/default-skin.css'
];

var pathFonts = [
    pathClient + 'fonts/**/*'
];

var pathFontsSummernote = [
    pathBower + 'summernote/dist/font/**/*'
];

gulp.task('minify-css-names', function() {
    return gulp.src([pathBuildProd + '**/*.css', pathBuildProd + '**/*.html', pathBuildProd + '**/*.js'])
        .pipe(gulpMinifyCssNames({postfix: '___blabla'}))
        .pipe(gulp.dest('test'))
});

gulp.task('bowerDev', function () {
    return gulp.src(mainBowerFiles(), {base: pathBower})
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(pathBuildDev + 'js'));
});

gulp.task('angularDev', ['templateCacheDev'], function () {
    gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(pathBuildDev + 'js'));
});

gulp.task('bowerCssDev', function () {
    gulp.src(pathBowerCss)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(pathBuildDev + 'css'));
});

gulp.task('compassDev', function () {
    return gulp.src(pathClient + 'scss/style.scss')
        .pipe(compass({
            css: pathClient + 'css',
            sass: pathClient + 'scss'
        }))
        .pipe(autoPrefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(pathBuildDev + 'css'));
});

gulp.task('stylesCopyDev', function () {
    return gulp.src(pathClient + 'styles/**/*')
        .pipe(gulp.dest(pathBuildDev + 'styles'));
});

gulp.task('jsCopyDev', function () {
    return gulp.src(pathClient + 'js/**/*')
        .pipe(gulp.dest(pathBuildDev + 'js'));
});

gulp.task('indexDev', function () {
    return gulp.src(pathClient + 'index.html')
        .pipe(gulp.dest(pathBuildDev));
});

gulp.task('templatesDev', function () {
    return gulp.src(pathClient + 'app/**/*.html')
        .pipe(gulp.dest(pathBuildDev + 'app'));
});

gulp.task('templateCacheDev', function () {
    return gulp.src(pathClient + 'app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(templateCache({
            module: 'app.core',
            root: 'app/',
            standAlone: false
        }))
        .pipe(gulp.dest('.tmp/templates'));
});

gulp.task('fontsDev', function () {
    return gulp.src(pathFonts)
        .pipe(gulp.dest(pathBuildDev + 'fonts'));
});

gulp.task('fontsDevSummernote', function () {
    return gulp.src(pathFontsSummernote)
        .pipe(gulp.dest(pathBuildDev + 'css/font'));
});

gulp.task('configDev', function () {
    return gulp.src(config)
        .pipe(gulp.dest(pathBuildDev + 'config'));
});

gulp.task('imagesDev', function () {
    return gulp.src(pathClient + 'images/**/*')
        .pipe(gulp.dest(pathBuildDev + 'images'));
});

gulp.task('jsonDev', function () {
    return gulp.src(pathClient + 'json/**/*')
        .pipe(gulp.dest(pathBuildDev + 'json'));
});

gulp.task('translationDev', function buildTranslationCache() {
    var jsonMinify = require('gulp-jsonminify');
    return gulp.src([pathClient + 'i18n/*.json'])
        .pipe(jsonMinify())
        .pipe(gulp.dest(pathBuildDev + 'i18n'));
});

gulp.task('faviconDev', function () {
    return gulp.src(pathClient + 'favicon.ico')
        .pipe(gulp.dest(pathBuildDev));
});

gulp.task('photoswipeSvg', function () {
    return gulp.src(pathBower + 'photoswipe/dist/default-skin/default-skin.svg')
        .pipe(gulp.dest(pathBuildDev + 'css'));
});

// gulp.task('build-translation-copy', function buildTranslationCache() {
//     return gulp.src([pathClient + '**/*/*.json'])
//         .pipe(merge({
//             fileName: '*.json'
//         }))
//         .pipe(gulp.dest(pathBuildDev + 'i18n'));
// });

gulp.task('configDev', function () {
    return gulp.src(config)
        .pipe(gulp.dest(pathBuildProd + 'config'));
});

gulp.task('serverDev', function () {
    var middleware = history({});
    connect.server({
        root: ['build-dev'],
        livereload: false,
        port: 9007,
        middleware: function (connect, opt) {
            return [middleware];
        }
    });
});

function cleaner() {
    return through.obj(function (file, enc, cb) {
        rimraf(path.resolve((file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}

////// Prod

gulp.task('bowerProd', function () {
    return gulp.src(mainBowerFiles(), {base: pathBower})
        .pipe(concat('vendor.js'))
        // .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(pathBuildProd + 'js'))
        .pipe(rev.manifest('rev-vendor-manifest.json'))
        .pipe(gulp.dest(pathBuildProd + 'js'));
});

gulp.task('angularProd', ['templateCacheProd'], function () {
    gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(pathBuildProd + 'js'))
        .pipe(rev.manifest('rev-script-manifest.json'))
        .pipe(gulp.dest(pathBuildProd + 'js'));
});

gulp.task('bowerCssProd', function () {
    gulp.src(pathBowerCss)
        .pipe(concat('vendor.css'))
        .pipe(rev())
        .pipe(gulp.dest(pathBuildProd + 'css'))
        .pipe(rev.manifest('rev-vendor-manifest.json'))
        .pipe(gulp.dest(pathBuildProd + 'css'))
});

gulp.task('compassProd', function () {
    return gulp.src(pathClient + 'scss/style.scss')
        .pipe(compass({
            css: pathClient + 'css',
            sass: pathClient + 'scss'
        }))
        .pipe(autoPrefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rename('style.css'))
        .pipe(rev())
        .pipe(gulp.dest(pathBuildProd + 'css'))
        .pipe(rev.manifest('rev-style-manifest.json'))
        .pipe(gulp.dest(pathBuildProd + 'css'));
});

gulp.task('indexProd', function () {
    return gulp.src(pathClient + 'index.html')
        .pipe(gulp.dest(pathBuildProd));
});

gulp.task('templatesProd', function () {
    return gulp.src(pathClient + 'app/**/*.html')
        .pipe(gulp.dest(pathBuildProd + 'app'));
});

gulp.task('templateCacheProd', function () {
    return gulp.src(pathClient + 'app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(templateCache({
            module: 'app.core',
            root: 'app/',
            standAlone: false
        }))
        .pipe(gulp.dest('.tmp/templates'));
});

gulp.task('fontsProd', function () {
    return gulp.src(pathFonts)
        .pipe(gulp.dest(pathBuildProd + 'fonts'));
});

gulp.task('imagesProd', function () {
    return gulp.src(pathClient + 'images/**/*')
        .pipe(gulp.dest(pathBuildProd + 'images'));
});

gulp.task('jsonProd', function () {
    return gulp.src(pathClient + 'json/**/*')
        .pipe(gulp.dest(pathBuildProd + 'json'));
});

gulp.task('stylesCopyProd', function () {
    return gulp.src(pathClient + 'styles/**/*')
        .pipe(gulp.dest(pathBuildProd + 'styles'));
});

gulp.task('jsCopyProd', function () {
    return gulp.src(pathClient + 'js/**/*')
        .pipe(gulp.dest(pathBuildProd + 'js'));
});

gulp.task('configProd', function () {
    return gulp.src(config)
        .pipe(gulp.dest(pathBuildProd + 'config'));
});

gulp.task('fontsSummernoteProd', function () {
    return gulp.src(pathFontsSummernote)
        .pipe(gulp.dest(pathBuildProd + 'css/font'));
});

gulp.task('translationProd', function buildTranslationCache() {
    var jsonMinify = require('gulp-jsonminify');
    return gulp.src([pathClient + 'i18n/*.json'])
        .pipe(jsonMinify())
        .pipe(gulp.dest(pathBuildProd + 'i18n'));
});

gulp.task('faviconProd', function () {
    return gulp.src(pathClient + 'favicon.ico')
        .pipe(gulp.dest(pathBuildProd));
});

gulp.task('photoswipeSvgProd', function () {
    return gulp.src(pathBower + 'photoswipe/dist/default-skin/default-skin.svg')
        .pipe(gulp.dest(pathBuildProd + 'css'));
});

gulp.task('rev_collector', ['build'], function () {
    return gulp.src([
        pathBuildProd + 'css/rev-vendor-manifest.json',
        pathBuildProd + 'css/rev-style-manifest.json',
        pathBuildProd + 'js/rev-vendor-manifest.json',
        pathBuildProd + 'js/rev-script-manifest.json',
        pathBuildProd + 'index.html'
    ])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(pathBuildProd));
});

gulp.task('prod', ['rev_collector'], function () {
    gulp.src([pathBuildProd + 'js/vendor*.js'], {read: false})
        .pipe(revOutdated(1))
        .pipe(cleaner());

    gulp.src([pathBuildProd + 'js/app*.js'], {read: false})
        .pipe(revOutdated(1))
        .pipe(cleaner());

    gulp.src([pathBuildProd + 'css/style*.css'], {read: false})
        .pipe(revOutdated(1))
        .pipe(cleaner());

    gulp.src([pathBuildProd + 'css/vendor*.css'], {read: false})
        .pipe(revOutdated(1))
        .pipe(cleaner());
});

gulp.task('build', [
    'photoswipeSvgProd',
    'faviconProd',
    'translationProd',
    'bowerProd',
    'angularProd',
    'bowerCssProd',
    'compassProd',
    'indexProd',
    'fontsProd',
    'configProd',
    'imagesProd',
    'jsonProd',
    'stylesCopyProd',
    'jsCopyProd',
    'fontsSummernoteProd'
], function () {
    var middleware = history({});

    connect.server({
        root: ['build'],
        livereload: false,
        port: 9010,
        middleware: function (connect, opt) {
            return [middleware];
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(pathClient + 'scss/**/*.scss', ['compassDev']);
    gulp.watch(pathClient + 'app/**/*.js', ['angularDev']);
    gulp.watch(pathClient + 'app/**/*.html', ['angularDev']);
    gulp.watch(pathClient + 'index.html', ['indexDev']);
    // gulp.watch(pathClient + 'app/**/*.json', ['build-translation-cache']);
});

gulp.task('default', [
    'faviconDev',
    'translationDev',
    'bowerDev',
    'angularDev',
    'bowerCssDev',
    'compassDev',
    'indexDev',
    'templateCacheDev',
    'fontsDev',
    'serverDev',
    'fontsDevSummernote',
    'configDev',
    'imagesDev',
    'jsonDev',
    'stylesCopyDev',
    'jsCopyDev',
    'jsonDev',
    'watch'
]);