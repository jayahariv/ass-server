const express = require('express');
const http = require('http-request');

const router = express.Router();

const _baseURL = 'http://api.assembla.com/v1'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/activity', function(req, response, next) {
  const key = req.query['key'];
  const secret = req.query['secret'];
  http.get(
    {
    	url: _baseURL + '/activity',
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
});

module.exports = router;
