import gulp from 'gulp';
import process from 'process';
import  argv from 'process';
// Импорт путей

import { path } from './gulp/config/path.js';

// Импорт общих плагинов

import { plugins } from './gulp/config/plugins.js';

// Передаём значения в глобальную переменную 

global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    path: path,
    gulp: gulp,
    plugins: plugins
};  

// Импорт задач

import { copy } from "./gulp/tasks/copy.js";
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js'
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, fontStyle, ttfToWoff } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { json } from './gulp/tasks/json.js';

// Наблюдатель за изменениями в файлах

function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images),
    gulp.watch(path.watch.json, json)
}

export { svgSprive }

// Последовательная обработка шрифтов 

const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, json, html, scss, js, images));

// Выполнение сценария по умолчанию

const dev = gulp.series(reset, mainTasks, copy, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// По дефолту

export default gulp.parallel (dev)

// В режиме разработчика npm run dev
// В режиме продакшина npm run build
