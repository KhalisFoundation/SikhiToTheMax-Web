/* eslint-disable no-console */
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import { hostname as _hostname } from 'os';
import createTemplate from './template';
import seo from '../seo';
import { DARK_MODE_COOKIE, DARK_MODE_CLASS_NAME } from '../common/constants';

const hostname = _hostname().substr(0, 3);
const port = process.env.NODE_ENV === 'development' ? '8081' : '8080';
const app = express();

app
  // Compress files
  .use(compression())

  // Add cookie parser
  .use(cookieParser())

  // Infrastructure display
  .use((req, res, next) => {
    res.setHeader('origin-server', hostname);
    return next();
  })

  // Use client for static files
  .use(express.static(`${__dirname}/../`))

  // Direct all calls to index template
  .get('*', (req, res) => {
    const { path } = req;

    const { title: _title, createDescription } = seo[
      seo[path] === undefined ? '/' : path
    ];

    const title = typeof _title === 'function' ? _title(req) : _title;

    const description = createDescription(req);

    const bodyClass =
      DARK_MODE_COOKIE in req.cookies &&
      parseInt(req.cookies[DARK_MODE_COOKIE], 10) === 1
        ? DARK_MODE_CLASS_NAME
        : '';

    const template = createTemplate({ bodyClass, title, description });

    template(res, { debug: 'off', stringToBufferThreshold: 1000 });
  })

  // Listen on port
  .listen(port, () => console.log(`Server started on port:${port}`));
