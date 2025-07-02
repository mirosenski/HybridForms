const path = require('path');
const os = require('os');
const gulp = require('gulp');
const util = require('util');
const connect = require('gulp-connect');
const argv = require('yargs').array('include').argv;
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const proxy = require('http-proxy-middleware');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const log = require('fancy-log');

let customPath = null;
if (argv.path) {
    customPath = argv.path.endsWith('/') ? argv.path.slice(0, argv.path.length - 1) : argv.path;
}

let assetPath = null;
if (argv.assetPath) {
    assetPath = argv.assetPath.endsWith('/') ? argv.assetPath.slice(0, argv.assetPath.length - 1) : argv.assetPath;
}

const fileToInclude = argv.include ? argv.include : null;
const tsProject = ts.createProject('tsconfig.json');
let node;

util.inspect.styles.date = 'grey';

const startService = () => {
    const setup = `sources/service.js ${customPath ? `--path=${customPath}` : ''} ${fileToInclude ? `--include=${fileToInclude}` : ''} ${assetPath ? `--assets=${assetPath}` : '--assets=./form-templates/Assets'}`;

    let p = Promise.resolve();
    if (node) {
        p = new Promise((resolve) => {
            node.on('close', () => {
                resolve();
            });
        });

        if (os.platform() === 'win32') {
            exec('taskkill /pid ' + node.pid + ' /T /F');
        } else {
            node.kill();
        }
    }
    p.then(() => {
        node = spawn('node', ['--no-deprecation', `${setup}`], { shell: true });
        node.stderr.on('data', (data) => {
            log.error(data.toString());
        });
    });
};

const reload = () => {
    gulp.src(`${customPath ? `${customPath}` : './'}`).pipe(connect.reload());
};

/** livereload port is needed to able to watch for the file  */
gulp.task('formdev', function (done) {
    connect.server({
        livereload: {
            port: 8183,
        },
        port: 8181,
        root: './',
    });
    done();
});

gulp.task('scss', (done) => {
    const fdPath = customPath ? customPath : './form-templates';
    gulp.src(`${fdPath}/**/*.scss`)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(`${fdPath}/`));
    done();
});

gulp.task('scss-watcher', function (done) {
    const fdPath = customPath ? customPath : './form-templates';
    gulp.watch(`${fdPath}/**/*.scss`, gulp.series('scss'));
    done();
});

gulp.task('ts-watcher', function (done) {
    const reporter = ts.reporter.nullReporter();
    const fdPath = customPath ? customPath : './form-templates';
    gulp.watch(`${fdPath}/**/*.ts`).on('change', function (file) {
        const currentDir = path.dirname(file);
        const filename = path.basename(file);

        const tsResult = gulp
            .src(filename, { cwd: currentDir })
            .pipe(sourcemaps.init())
            .pipe(tsProject(reporter))
            .on('error', () => {
                /* Ignore compiler errors */
            });

        tsResult.js
            .pipe(sourcemaps.write('.', { sourceRoot: currentDir, includeContent: false }))
            .pipe(gulp.dest(currentDir));
    });
    done();
});

gulp.task('reload', function (done) {
    reload();
    done();
});

gulp.task('service', function (done) {
    startService();
    done();
});

gulp.task('watcher', function (done) {
    const fdPath = customPath ? customPath : './form-templates';
    const watcher = gulp.watch(`${fdPath}/**/*.*`, {
        ignored: [
            './temp/*.tmppdfexport/**',
            `${fdPath}/**/!(index).json`,
            `${fdPath}/**/*.xlsx`,
            `${fdPath}/**/*.xlsx`,
            `${fdPath}/**/excelMappingFields.json`,
            `${fdPath}/**/*_mapped.html`,
            `${fdPath}/**/*.mapped.html.txt`,
            `${fdPath}/**/*.ts`,
            `${fdPath}/**/*.scss`,
        ],
    });

    let editTimeout = null;
    const fileChanged = (filePath) => {
        log.info(`File changed: ${filePath}`);
        clearTimeout(editTimeout);
        editTimeout = setTimeout(() => {
            gulp.series('reload')();
        }, 200);
    };

    watcher.on('add', fileChanged);
    watcher.on('unlink', fileChanged);
    watcher.on('change', fileChanged);
    watcher.on('unlinkDir', fileChanged);

    done();
});

gulp.task('default', gulp.parallel(['service', 'formdev', 'watcher', 'scss-watcher', 'ts-watcher']), function (done) {
    done();
});

process.on('exit', function () {
    if (node) {
        if (os.platform() === 'win32') {
            exec('taskkill /pid ' + node.pid + ' /T /F');
        } else {
            node.kill();
        }
    }
});
