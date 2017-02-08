const express = require('express');
const http = require('http-request');
const fs = require("fs");

const router = express.Router();

const _401 = 'Please provide valid key & secret!';
const _baseURL = 'http://api.assembla.com/v1'

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file', function(req, response, next) {
  const path = req.query['path'];
  if (path && path.length > 0) {
    fs.readFile(path, 'utf8', function(error, data) {
      if (error) {
        response.send(null);
      };
      console.log(data);
      response.send(data);
    });
  } else {
    response.send(null);
  }
});

router.get('/activity', function(req, response, next) {
  const key = req.query['key'];
  const secret = req.query['secret'];
  const page = req.query['page'];
  if (
    key && secret && page &&
    key.length > 0 && secret.length > 0 && page.length > 0
  ) {
    http.get(
      {
      	url: _baseURL + '/activity?per_page=100' + '&page=' + page,
        headers: {
          'X-Api-Key': key,
          'X-Api-Secret': secret,
        },
      },
      function (err, result) {
      	if (result && result.code == 200) {
          response.send(result.buffer.toString());
      	} else {
          response.send(err);
      		return;
        }
    });
  } else {
    response.send(_401);
    return;
  }
});

router.get('/mentions', function(req, response, next) {
  const key = req.query['key'];
  const secret = req.query['secret'];
  if (key && secret && key.length > 0 && secret.length > 0) {
    http.get(
      {
      	url: _baseURL + '/user/mentions.json',
        headers: {
          'X-Api-Key': key,
          'X-Api-Secret': secret,
        },
      },
      function (err, result) {
      	if (result && result.code == 200) {
          response.send(result.buffer.toString());
      	} else {
          response.send(err);
      		return;
        }
    });
  }
});

router.get('/spaces/:spaceId/users', function(req, response, next) {
  const key = req.query['key'];
  const secret = req.query['secret'];
  const spaceId = req.params['spaceId'];
  if (
    key && secret && spaceId &&
    key.length > 0 && secret.length > 0 && spaceId.length > 0
  ) {
    http.get(
      {
      	url: _baseURL + '/spaces/' + spaceId + '/users.json',
        headers: {
          'X-Api-Key': key,
          'X-Api-Secret': secret,
        },
      },
      function (err, result) {
      	if (result && result.code == 200) {
          response.send(result.buffer.toString());
      	} else {
          response.send(err);
      		return;
        }
    });
  }
});


module.exports = router;
