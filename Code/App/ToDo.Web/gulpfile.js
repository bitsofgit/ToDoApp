/// <binding BeforeBuild='copyHtml' />
var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');
var del = require('del');

var destPath = './wwwroot/libs/';

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(destPath)
        .pipe(clean());
});

gulp.task('cleanApp', function () {
    return gulp.src('./wwwroot/app/**/*')
        .pipe(clean());

});

gulp.task('deleteApp', function () {
    return del([
        './wwwroot/app/'
    ]);

});

gulp.task("scriptsNStyles", () => {
    gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/zone.js',
            '@angular/**',
            'bootstrap/dist/js/bootstrap.min.js',
            'bootstrap/dist/css/bootstrap.min.css',
            'font-awesome/css/font-awesome.min.css',
            'font-awesome/fonts/*.*'
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest("./wwwroot/libs"));
});

gulp.task('copyHtml', function () {
    return gulp.src(['scripts/app/**/*.html', 'scripts/app/**/*.json'], { base: 'scripts/app' })
                .pipe(gulp.dest('./wwwroot/app'));
});

//var tsProject = ts.createProject('scripts/tsconfig.json');
//gulp.task('ts', function (done) {
//    //var tsResult = tsProject.src()
//    var tsResult = gulp.src([
//            "scripts/*.ts"
            
//    ])
//        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
//    return tsResult.js.pipe(gulp.dest('./wwwroot/app'));
//});

//gulp.task('watch', ['watch.ts']);

//gulp.task('watch.ts', ['ts'], function () {
//    return gulp.watch('scripts/*.ts', ['ts']);
//});

gulp.task('default', ['deleteApp', 'scriptsNStyles', 'copyHtml']);

