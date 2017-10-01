import test from 'ava';

const express = require('express');
const request = require('supertest');
const imageSize = require('image-size');
const {serveImage} = require('./../index');

const app = express();

test('load full size existing image', async t => {
	app.use(serveImage({
		src: './test'
	}));

	const response = await request(app).get('/test.png');
	const dimensions = imageSize(response.body);

	t.is(response.statusCode, 200);
	t.is(response.type, 'image/png');
	t.is(dimensions.width, 100);
	t.is(dimensions.height, 42);
});

test('load half size existing image', async t => {
	app.use(serveImage({
		src: './test'
	}));

	const response = await request(app).get('/test.png?size=50%');
	const dimensions = imageSize(response.body);

	t.is(response.statusCode, 200);
	t.is(response.type, 'image/png');
	t.is(dimensions.width, 50);
	t.is(dimensions.height, 20);
});

test('load exactly sized existing image', async t => {
	app.use(serveImage({
		src: './test'
	}));

	const response = await request(app).get('/test.png?size=120x120');
	const dimensions = imageSize(response.body);

	t.is(response.statusCode, 200);
	t.is(response.type, 'image/png');
	t.is(dimensions.width, 120);
	t.is(dimensions.height, 120);
});

test('try to load non existing image', async t => {
	app.use(serveImage({
		src: './test'
	}));

	const response = await request(app).get('/stuff.png');
	t.is(response.statusCode, 404);
});

