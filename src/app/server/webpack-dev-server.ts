import { Server } from 'http';
import * as Webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';

export class WebServer {
  private server: Server;
  private bundler: any;

  readonly url: string;
  readonly host: string;
  readonly port: number;

  constructor(host: string, port: number) {
    const url = this.url = `http://${host}:${port}`;
    const webpackConfig = require('../../../webpack/webpack.client.config.development.js');
    webpackConfig.entry.app.unshift(
      `webpack-dev-server/client?${url}`,
      'webpack/hot/only-dev-server',
    );

    this.host = host;
    this.port = port;

    let bundleStart: number;
    const compiler: any = Webpack(webpackConfig);

    compiler.plugin('compile', () => {
      console.log('Bundling client...');
      bundleStart = Date.now();
    });

    compiler.plugin('done', () => {
      console.log(`Bundled client in ${Date.now() - bundleStart} ms!`);
    });

    this.bundler = new WebpackDevServer(compiler, {
      publicPath: `/static/`,
      contentBase: './dist/client/',

      hot: true,

      quiet: false,
      noInfo: true,
      stats: {
        colors: true,
      },
    });
  }

  /**
   * Start the Server.
   */
  start() {
    this.server = this.bundler.listen(this.port, this.host, () => {
      console.log(`Webpack Dev Server is running on ${this.host}:${this.port}/`);
      console.log('Bundling project, please wait...');
    });
  }

  /**
   * Stop the Server
   */
  stop() {
    if (this.server) {
      console.log('Stop Webpack Dev Server');
      this.server.close();
    }
  }
}
