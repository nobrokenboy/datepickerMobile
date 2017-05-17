/**
 * Created by jessic on 2016/12/29.
 */
/*SASS等工具：源代码 -> 生产环境 CSS*/
/*PostCSS：源代码 -> 标准 CSS -> 生产环境 CSS*/
var gulp=require("gulp"),
    sass=require("gulp-sass"),
    sourcemaps=require("gulp-sourcemaps"),//源文件映射
    notify=require("gulp-notify"),//提示信息
    plumber=require("gulp-plumber"),//watch异常事件处理
    autoprefixer=require("autoprefixer"),//浏览器前缀自动补全
    concat=require("gulp-concat"),//合并js
    uglify=require('gulp-uglify'),//js压缩
    imagemin=require('gulp-imagemin'),//压缩图片
    htmlmin=require('gulp-htmlmin'),//html压缩
    rev=require('gulp-rev-append'),//添加版本号
    localconnect=require('gulp-connect'),//建立本地服务器
    rename=require('gulp-rename'),//重命名
    jshint=require('gulp-jshint'),//js语法检测
    browerify=require('browserify'),//让浏览器端支持require()
    jade=require('gulp-jade'),
    ejs=require('gulp-ejs'),
    postcss=require('gulp-postcss'),//一个支持css多种处理方式的“平台”
    webpack=require('gulp-webpack'),
    _webpack=require('webpack'),
    browerSync=require('browser-sync').create(),
    changed=require('gulp-changed'),//只编译改动过的文件，加快gulp的编译速率
    pngquant=require('imagemin-pngquant'),//深度压缩png
    cache=require('gulp-cache'),//只压缩修改的图片，其余从缓存读取
    imageisux=require('gulp-imageisux'),//腾讯的图片压缩插件
    include=require('gulp-include');

//自动刷新，加载
var reload=browerSync.reload;
//静态服务器
gulp.task('brower-sync',function(){
    browerSync.init({
        server:{
            baseDir:"dist",
            index:"/views/index.html"
        },
        files:['dist/*/*.*']
    });
});
//编译、合并、压缩、重命名css
//sass输入风格(自带压缩功能，可以替代gulp-minify-css)
/*嵌套输出方式 nested,展开输出方式 expanded,紧凑输出方式 compact,压缩输出方式 compressed*/
gulp.task("css",function(){
    //"!src/sass/{reset,common.scss}"
    gulp.src(["./example/css/base.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:"compressed"}).on("error",sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(rename({suffix:".min"}))
        .pipe(sourcemaps.write())
        .pipe(rev())
        .pipe(gulp.dest("./dist/static/css"))
        .pipe(reload({stream:true}));
});
//合并，重命名、压缩js
gulp.task("webpack", function () {
    gulp.src('./develop/static/js/**/*.js')
        .pipe(webpack({
            entry : {
                bundle: './develop/static/js/main.js',
            },
            output : {
                path : '/dist/static/js',
                filename : '[name].js'//输出的名称与entry中的命名有关bundle
            },
            plugins:[
                new _webpack.ProvidePlugin({
                    $:"jquery",
                    jQuery:"jquery"
                })
                // new _webpack.optimize.UglifyJsPlugin({
                //     compress: {
                //         warnings: false
                //     }
                // })
            ],
            resolve:{
                alias:{
                    vue: 'vue/dist/vue.js',
                    jquery:'jquery/src/jquery.js'
                }
            }
        }))
        .pipe(rename({suffix:".min"}))
        .pipe(rev())
        .pipe(gulp.dest("./dist/static/js"))
        .pipe(reload({stream:true}));
});
//图片压缩
gulp.task("imagemin",function(){
    gulp.src(["./develop/static/img/**/*.{jpg,gif,svg,png,ico}"])
        .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true,//类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant()]
        })))
        .pipe(gulp.dest("./dist/static/img"));

});
//输出字体
gulp.task("font",function(){
    gulp.src('./develop/static/font/**/*.*')
        .pipe(gulp.dest('./dist/static/font'));
});
//输出.vue文件
gulp.task("vue",function(){
    gulp.src('./develop/views/**/*.vue')
        .pipe(gulp.dest('./dist/views'));
});
//压缩html
//gulp-changed：文件扩展名字发生变化需要重新配置
gulp.task("htmlmin",function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: false,//true压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: false,//压缩页面JS
        minifyCSS: false//压缩页面CSS
    };
    gulp.src(["./example/**/*.html","./example/**/*.ch"])
        .pipe(changed('./dist/views',{extension:'.html'}))
        .pipe(include({
            includePaths:__dirname+"/example"
        }))
        .pipe(htmlmin(options))
        .pipe(rename({
            extname:".html"
        }))
        .pipe(rev())
        .pipe(gulp.dest("./dist/views"))
        .pipe(reload({stream:true}));

});
//监听
gulp.task("watch",function(){
    gulp.run(["css"]);
    gulp.watch("./example/css/**/*.scss",["css"]);
    /*gulp.watch("./develop/static/js/!**!/!*.js",["webpack"]);*/
   /* gulp.watch("./develop/static/img/!**!/!*.{jpg,gif,svg,png,ico}",["imagemin"]);
    gulp.watch("./develop/static/font/!**!/!*.*",["font"]);
    gulp.watch(["./develop/views/!**!/!*.html","./develop/views/!**!/!*.ch"],["htmlmin"]);
    gulp.watch("./develop/static/views/vue/!**!/!*.*",["vue"]);*/
    //浏览器自动刷新
    gulp.run('brower-sync');
});
//默认的任务
gulp.task("default",function(){
    console.log("hello11");
});