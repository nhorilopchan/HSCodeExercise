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

    gulp.task('ejs', function() {
        return gulp.src('src/views/**/*.ejs')
            .pipe(ejs({}, {ext:'.html'}))
            .pipe(gulp.dest('./dist/html'))
            .pipe(browserSync.stream());
    });
    //JS Files
    var jsSourceFiles = 'src/js/*.js',
        jsDest = './dist/scripts';

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
        cssDest ='./dist/css';

    gulp.task('sass', function() {
        gulp.src(cssSourceFiles)
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('styles.css'))
            .pipe(minify())
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
    gulp.task('default', ['ejs','js','sass','watch','serve'], function() {
    });
