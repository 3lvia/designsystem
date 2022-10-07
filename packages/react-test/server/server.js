import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import App from '../src/App';

const PORT = 8000;

const app = express();

app.get('/', (_req, res) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Some error happened');
    }

    const sheet = new ServerStyleSheet();
    try {
      const html = renderToString(sheet.collectStyles(<App />));
      const style = sheet.getStyleTags();
      console.log('style', style);

      return res.send(
        data
          .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
          .replace('<style id="scroot"></style>', style),
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send('Some error happened');
    } finally {
      sheet.seal();
    }
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
