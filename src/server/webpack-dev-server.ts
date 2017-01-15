import * as Webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';

let webpackConfig = require('../../webpack.config.js');

export class WebServer {
    private bundler: any;

    host: string;
    port: number;

    constructor(host = 'localhost', port = 8080) {
        this.host = host;
        this.port = port;

        let bundleStart: number;
        let compiler: any = Webpack(webpackConfig);

        compiler.plugin('compile', () => {
            console.log('Bundling...');
            bundleStart = Date.now();
        });

        compiler.plugin('done', () => {
            console.log(`Bundled in ${Date.now() - bundleStart} ms!`);
        });

        this.bundler = new WebpackDevServer(compiler, {
            publicPath: '/dist/client/',
            contentBase: './dist/client/',

            hot: true,

            quiet: false,
            noInfo: true,
            stats: {
                colors: true
            }
        });
    }

    /**
     * Start the Server.
     */
    start() {
        this.bundler.listen(this.port, this.host, () => {
            console.log('Bundling project, please wait...');
        })
    }
}


