const {
	src,
	dest,
	watch,
	parallel,
	series
} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const nunjucksRender = require('gulp-nunjucks-render');
const del = require('del');
const fileinclude = require("gulp-file-include");
const browserSync = require('browser-sync').create();

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		},
		notify: false
	})
}

/* function html() {
	return src(['app/html/index.html',
			'app/html/page.html',
			'app/html/login.html',
			'app/html/about.html',
			'app/html/terms.html',
			'app/html/productgrid.html',
			'app/html/productline.html',
			'app/html/product-page.html',
			'app/html/blog-page.html',
			'app/html/blog-details-page.html',
			'app/html/contact-page.html',
		])
		.pipe(fileinclude())
		.pipe(dest('app/'))
		.pipe(browserSync.stream())
} */

function nunjucks() {
	return src('app/pages/*.njk')
		.pipe(nunjucksRender())
		.pipe(dest('app'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('app/scss/*.scss')
		.pipe(scss({
			outputStyle: 'compressed'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 versions'],
			grid: true
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/slick-carousel/slick/slick.js',
			'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
			'node_modules/mixitup/dist/mixitup.js',
			'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
			'node_modules/rateyo/src/jquery.rateyo.js',
			'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
			'app/js/main.js'
		])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function images() {
	return src('app/images/**/*.*')
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.mozjpeg({
				quality: 75,
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			}),
			imagemin.svgo({
				plugins: [{
						removeViewBox: true
					},
					{
						cleanupIDs: false
					}
				]
			})
		]))
		.pipe(dest('dist/images'))
}

function build() {
	return src([
			'app/**/*.html',
			'app/css/style.min.css',
			'app/js/main.min.js'
		], {
			base: 'app'
		})
		.pipe(dest('dist'))
}

function cleanDist() {
	return del('dist')
}

function watching() {
	/* 	watch(['app/html/*.html'], html); */
	watch(['app/pages/*.njk'], nunjucks);
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/**/*.html']).on('change', browserSync.reload);
}

/* exports.html = html; */
exports.styles = styles;
exports.scripts = scripts;
browsersync.scripts = browsersync;
exports.images = images;
exports.nunjucks = nunjucks;
exports.watching = watching;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel( /* html, */ nunjucks, styles, scripts, browsersync, watching)