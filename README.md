# serve-image

> Express.js middleware to serve images in the dimension needed.

## Prerequisites

* `ffmpeg` needs to be installed on the host system.

## Install

```bash
npm i -S serve-image
```

## Usage

```js
const express = require('express');
const {serveImage} = require('serve-image');

const app = express();
app.use(serveImage());
app.listen(80);
```

Requesting `localhost/path/to/image.png` will return the full image. Requesting `localhost/path/to/image.png?size=50%` will return the image half the size of the original.

## Parameters

Query parameters that the middleware uses if set.

## size={ffmpegSize}

To resize the image on request. Accepts any kind of ffmpeg size that is provided (e.g. `50%`, `640x?`, `640x480`).

## API

### serveImage(opts)

Middleware to request images in different sizes from a source directory. Accepts an object of options.

## Options

All options are optional.

### `src` (**string**) –– *Default*: `process.cwd()`

The source directory to be used to search for the given image.

### `onError(error)` –– *Default:*: `console.error`

Optional error callback used by `fluent-ffmpeg`.

### `onProgress(progress)`

Optional progress callback used by `fluent-ffmpeg`.

### `onEnd(message)`

Optional end callback used by `fluent-ffmpeg`.

## License

GPL-2.0 © Willi Eßer