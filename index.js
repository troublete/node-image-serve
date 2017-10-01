const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const pathExists = require('path-exists');
const mime = require('mime-types');

/**
 * Middle ware to request images in different sizes from source directory
 * @param  {Object} opts
 */
module.exports.serveImage = opts => {
	opts = opts || {};
	const srcDir = opts.src || process.cwd();
	const errorLog = opts.onError || console.error;
	/* eslint no-unused-vars: "warn" */
	const endLog = opts.onEnd || function (message) {};
	/* eslint no-unused-vars: "warn" */
	const progressLog = opts.onProgress || function (progress) {};

	return (request, response, next) => {
		const requestedImage = path.join(srcDir, request.path);
		const size = request.query.size || '100%';
		response.set('content-type', mime.lookup(requestedImage));

		pathExists(requestedImage).then(exists => {
			if (exists === true) {
				ffmpeg(requestedImage)
					.size(size)
					.format('image2')
					.outputOptions('-q:v 1')
					.output(response)
					.on('error', errorLog)
					.on('progress', progressLog)
					.on('end', endLog)
					.run();
			} else {
				next();
			}
		}).catch(err => {
			next(err);
		});
	};
};
