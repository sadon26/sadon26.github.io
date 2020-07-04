var gulp = require("gulp");
var sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
var imagemin = require("gulp-imagemin");

gulp.task("sass", (done) => {
    gulp.src("app/scss/styles.scss", gulp.series("sass"))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({
        stream: true
    }))
    done()
})

gulp.task("imageMin", (done) => {
    gulp.src("app/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    done()
})

gulp.task("copyHtml", (done) => {
    gulp.src("app/**/*.html")
    .pipe(gulp.dest('dist'))
    done()
})

gulp.task("default", gulp.series("copyHtml", "imageMin", "sass"))

gulp.task("browser-sync", (done) => {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
    done()
})

gulp.task("watch", gulp.series("browser-sync", "default"), (done) => {
    gulp.watch("app/scss/**/*.scss", gulp.series("sass"))
    gulp.watch("app/images/**/*", gulp.series("imageMin"))
    done()
})

