import * as Webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';

export class WebServer {
    private bundler: any;

    readonly url: string;
    readonly host: string;
    readonly port: number;

    constructor(host: string, port: number) {
        let url = this.url = `http://${host}:${port}`;
        let webpackConfig = require('../../webpack/webpack.config.development.js');
        webpackConfig.entry.app.unshift(
            `webpack-dev-server/client?${url}`,
            'webpack/hot/only-dev-server',
        );

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
            publicPath: '/dist',
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


