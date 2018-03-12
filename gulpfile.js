let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglifyjs'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    svgmin = require('gulp-svgmin'),
    cache = require('gulp-cache');

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
        .pipe (sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', () => {
  return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("public/js"));
})

gulp.task('img-png', () => {
  return gulp.src('src/img/png/*.png')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
  .pipe(gulp.dest('public/img/png'));
})
gulp.task('img-svg', () => {
  return gulp.src('src/img/svg/*.svg')
        .pipe(cache(svgmin({
          plugins: [{
                    removeDoctype: false
                    }, {
                    removeComments: false
                    }, {
                    cleanupNumericValues: {
                      floatPrecision: 2
                      }
                    }, {
                    convertColors: {
                      names2hex: false,
                      rgb2hex: false
                    }
                    }]
          })))
        .pipe(gulp.dest('public/img/svg'));
})

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: "public"
    },
    notify: false
  })
});

gulp.task('watch',['serve', 'img-png', 'img-svg', 'sass', 'scripts'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch('src/js/**/*.js', browserSync.reload)
  gulp.watch('public/*.html', browserSync.reload)
  gulp.watch('public/index.html', browserSync.reload)
});

gulp.task('default', ['watch']);
