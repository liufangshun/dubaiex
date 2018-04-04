var gulp = require('gulp'),                        // 基础库
   clean = require('gulp-clean'),                  // 清空文件夹
   less = require("gulp-less"),                    // less转css编译器
   cssmin = require("gulp-minify-css"),            // css压缩
   concat = require('gulp-concat'),                // 合并文件
   copy = require('gulp-copy'),                    // 复制文件
   uglify = require('gulp-uglify'),                // js压缩
   htmlmin = require('gulp-htmlmin');              // html压缩
   rev = require('gulp-rev'),                      // 更改版本号
   revCollector = require('gulp-rev-collector'),   // 更改html模板引用静态资源路径
   //imagemin = require('gulp-imagemin'),
   fileinclude = require('gulp-file-include');     // 引用公共html模板
   assetRev = require('gulp-asset-rev');     // 自动增加版本号

gulp.task('watch', function() {
   var watcher = gulp.watch(['css/*.less','*.html','js/*.js','imgs/*.{png,jpg,gif,ico}'], ['less','js','fileinclude','copy']);
   /*watcher.on('change',function(){
      revs();
   });*/
});
gulp.task('clean', function() {
   gulp.src('./dest',{read: false})
      .pipe(clean());
});
gulp.task('less', function() {
   gulp.src('./css/*.less')
      .pipe(assetRev())
      .pipe(less().on('error',function(e){
        console.log(e);
      }))
      .pipe(rev())
      .pipe(cssmin())
      .pipe(gulp.dest('./dest/css'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./dest/rev/css'));
});
gulp.task('fileinclude', function() {
   gulp.src(['./*.html','!./include/*.html'])
      .pipe(assetRev())
      .pipe(fileinclude({
         prefix: '@@',
         basepath: '@file'
      }))
      .pipe(gulp.dest('dest'));
});
gulp.task('js', function() {
   gulp.src(['./js/*.js','./js/**/*.js'])
      .pipe(assetRev())
      .pipe(uglify().on('error',function(e){
        console.log(e);
      }))
      .pipe(rev())
      .pipe(gulp.dest('./dest/js'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./dest/rev/js'));
});
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    gulp.src('./*.html')
        .pipe(assetRev())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dest/html'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dest/rev/html'));
});
gulp.task('image', function () {
   gulp.src('./imgs/*.{png,jpg,gif,ico,svg}')
      //.pipe(imagemin())
      .pipe(rev())
      .pipe(gulp.dest('./dest/imgs'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./dest/rev/imgs'))
});
gulp.task('copy', function () {
   gulp.src('./imgs/*.{png,jpg,gif,ico,svg}')
      //.pipe(imagemin())
      .pipe(rev())
      .pipe(gulp.dest('./dest/imgs'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./dest/rev/imgs'));
   gulp.src('./*.ico')
      .pipe(gulp.dest('./dest'));
   gulp.src('./js/ZeroClipboard.swf')
      .pipe(gulp.dest('./dest/js'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./dest/rev/js'));
   gulp.src('./js/proto_market.json')
      .pipe(gulp.dest('./dest/js'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./dest/rev/js'));
   gulp.src(['./css/jquery.jscrollpane.css','./css/animate.min.css'])
      .pipe(rev())
      .pipe(cssmin())
      .pipe(gulp.dest('./dest/css'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./dest/rev/css'));
   gulp.src('./locales/**/*.json')
      .pipe(gulp.dest('./dest/locales'));
});

gulp.task('rev', function () {
   revs();
});
function revs(){
   gulp.src(['./dest/rev/**/*.json', './dest/*.html'])
      .pipe(assetRev())
      .pipe( revCollector({
         replaceReved: true/*,
         dirReplacements: {
            './css': './css',
            './js': './js',
            './imgs': './imgs',
         }*/
      }))
      .pipe(gulp.dest('./dest'));
}

gulp.task('default',['less','js','testHtmlmin','fileinclude','copy'], function() {
  // 将你的默认的任务代码放在这
//   revs();
//    gulp.run('less', 'fileinclude','js','testHtmlmin','image');
//    // 监听html文件变化
//     gulp.watch('*.html', function(){
//         gulp.run('testHtmlmin');
//     });
//    //监听CSS文件变化
//     gulp.watch('css/*.less', function(){
//         gulp.run('minifyCss','testHtmlmin');
//     });
//     //监听JS文件变化
//     gulp.watch('js/*.js', function(){
//         gulp.run('js','testHtmlmin');
//     });
});