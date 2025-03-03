import gulp from "gulp";
import browserSyncPkg from "browser-sync";
import * as sass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";
import terser from "gulp-terser";
import clean from "gulp-clean";
import concat from "gulp-concat";

const browserSync = browserSyncPkg.create();
const sassCompiler = gulpSass(sass);

/* DEV MODE */

// Компиляция SCSS → CSS
gulp.task("styles", function () {
    return gulp
        .src("source/sass/**/*.+(scss|sass)")
        .pipe(sassCompiler().on("error", sassCompiler.logError))
        .pipe(gulp.dest("source/css")) // Dev: без сжатия, остается в `source/`
        .pipe(browserSync.stream());
});

// JS (dev): отслеживание изменений без минификации
gulp.task("scripts:dev", function () {
    return gulp.src("source/js/**/*.js")
        .pipe(browserSync.stream());
});

// Запуск локального сервера и отслеживание изменений
gulp.task("server", function (done) {
    browserSync.init({
        server: {
            baseDir: "source",
        },
    });

    gulp.watch("source/sass/**/*.+(scss|sass|css)", gulp.series("styles"));
    gulp.watch("source/js/**/*.js", gulp.series("scripts:dev")).on("change", browserSync.reload);
    gulp.watch("source/*.html").on("change", browserSync.reload);

    done();
});

// Запуск Dev-режима
gulp.task("dev", gulp.series(
    gulp.parallel("styles", "scripts:dev"),
    "server"
));

/* BUILD */

// Очистка `build/` перед сборкой
gulp.task("clean", function () {
    return gulp.src("build", { allowEmpty: true }).pipe(clean());
});

// Компиляция SCSS → CSS с минификацией
gulp.task("styles:build", function () {
    return gulp
        .src("source/sass/**/*.+(scss|sass)")
        .pipe(sassCompiler({ outputStyle: "compressed" }).on("error", sassCompiler.logError))
        .pipe(rename({ suffix: ".min" }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("build/css"));
});

// Минификация и объединение JS
gulp.task("scripts:build", function () {
    return gulp
        .src("source/js/**/*.js")
        .pipe(concat("main.js")) // Объединение в один файл
        .pipe(terser()) // Минификация
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("build/js"));
});

// Минификация HTML
gulp.task("html:build", function () {
    return gulp.src("source/*.html").pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest("build/"));
});

// Копирование шрифтов
gulp.task("fonts", function () {
    return gulp
        .src("source/fonts/**/*", { encoding: false })
        .pipe(gulp.dest("build/fonts"));
});

// Копирование иконок
gulp.task("icons", function () {
    return gulp
        .src("source/icons/**/*.{png,jpg,svg,gif,webp}")
        .pipe(gulp.dest("build/icons"));
});

// Копирование изображений
gulp.task("images", function () {
    return gulp
        .src("source/images/**/*.{png,jpg,svg,gif,webp}")
        .pipe(gulp.dest("build/images"));
});

// Копирование favicon файлов
gulp.task("favicons", function () {
    return gulp
        .src("source/*.{ico,svg,webmanifest}")
        .pipe(gulp.dest("build/"));
});

// Запуск Build-режима
gulp.task("build", gulp.series(
    "clean",
    gulp.parallel(
        "styles:build",
        "scripts:build",
        "html:build",
        "fonts",
        "icons",
        "images",
		"favicons"
    )
));
