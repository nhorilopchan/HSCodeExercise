var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var del = require('del');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var ejs = require('gulp-ejs');
var minify = require('gulp-minify');
var reload  = browserSync.reload;
var data = require('gulp-data');
var sassmixins = require('gulp-sass-to-postcss-mixins');
var sugarss    = require('sugarss');
var precss     = require('precss');

gulp.task('ejs', function() {
    return gulp.src('src/views/**/*.ejs')
        .pipe(data(function() {
            return { 'data': require('./src/js/data/data.json') }
        }))
        .pipe(ejs({}, {ext:'.html'}))
        .pipe(gulp.dest('./build/html'))
        .pipe(browserSync.stream());
});

//JS Files
var jsSourceFiles = 'src/js/*.js',
    jsDest = './build/scripts';

gulp.task('js', function() {
    gulp.src(jsSourceFiles)
        .pipe(concat('scripts.js'))
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['-min.js']
        }))
        .pipe(gulp.dest(jsDest));
});

//CSS Files
var cssSourceFiles = ['src/sass/_partials/*.scss','src/sass/*.scss','src/sass/_mixins/*.scss'
    ,'src/sass/_variables/*.scss'
]
cssDest ='./build/css';

gulp.task('sass', function() {
    gulp.src(cssSourceFiles)
        .pipe(sassmixins())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(minify())
        // .pipe(postcss([precss],{ parser: sugarss }))
        .pipe(gulp.dest(cssDest)
        );
});
gulp.task('watch', function() {
    gulp.watch('src/views/**/*.ejs',['ejs']).on('change',reload);
    gulp.watch('src/js/*.js',['js']).on('change',reload);
    gulp.watch('src/sass/**/*.scss',['sass']).on('change',reload);
});
gulp.task('serve',['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080
    });
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['ejs','js','sass','watch', 'serve'], function() {
});