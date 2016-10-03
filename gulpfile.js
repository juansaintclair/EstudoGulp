var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean'); //exclui os arquivos, neste caso vai ser executado pra excluir os antigos e add os novos
var concat = require('gulp-concat'); //concatena os arquivos em um só
var uglify = require('gulp-uglify'); //minifica
var es = require('event-stream'); //Possilita o merge de dois gulp.src
var uglifycss = require('gulp-uglifycss'); //minifica css
var copy = require("copy");


//o return torna a função asincrona no gulp.

gulp.task('clean', function () {
	return gulp.src('dist/')
		.pipe(clean());
});

gulp.task('jshint', function () {
	return gulp.src('js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('uglify', ['clean'], function () {
	return es.merge([
		gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js']),
		gulp.src('js/**/*.js').pipe(concat('scripts.js')).pipe(uglify())
	])
		.pipe(concat('scripts-min.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('uglifycss', ['clean'], function () {
	return es.merge([
		gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/bootstrap/dist/css/bootstrap-theme.min.css']),
		gulp.src('css/**/*.css').pipe(concat('estilos.css')).pipe(uglifycss())
	])
		.pipe(concat('estilos-min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('copy', function (cb) {
		return copy('index-producao.html', 'dist/', cb)
});

gulp.task('default', ['jshint', 'uglify', 'uglifycss', 'copy']);