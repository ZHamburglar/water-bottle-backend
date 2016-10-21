var express = require('express');
var router = express.Router();
var _ = require('lodash')
var Water =require('../models/waterbottle')

router.use(function (req, res, next) {
  req.body = _.pick(req.body, ['brand', 'phLevel'])
  next()
})

router.get('/', function (req, res) {
  console.log('hello',req.user.sub);
  Water.find({userId: req.user.sub}, function (err, waters) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(waters)
    }
  });
});


router.post('/', function (req, res) {
  var water = new Water(req.body)
  water.userId = req.user.sub;
  water.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(water)
    }
  })
});

router.post('http://localhost:4000/', function (req, res) {
  var water = new Water(req.body)
  water.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(water)
    }
  })
});


router.use('/:id', function (req, res, next) {
  Water.findOne({ '_id': req.params.id, userId: req.user.sub }, function (err, water) {
    if (err) {
      res.status(500).send()
    } else if (!water) {
      res.status(404).send()
    } else {
      res.water = water;
      next()
    }
  })
})

router.get('/:id', function (req, res) {
  res.json(res.water)
})

router.put('/:id', function (req, res) {
  var updatedWater = Object.assign(res.water, req.body)
  updatedWater.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(updatedWater)
    }
  })
})

router.delete('/:id', function (req, res) {
  res.water.remove(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
})

module.exports = router;
