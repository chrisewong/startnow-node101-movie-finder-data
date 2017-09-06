const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
let cache = {};

let url = ('http://www.omdbapi.com/?apikey=8730e0e&')
// const mockAdapter = require('axios-mock-adapter');
const app = express();

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.use(morgan('dev'));

// Research Lazy loading
app.get('/', function(req, res) {
            let param = '';
            let key = '';

            if (req.query.hasOwnProperty('i')) {
                    key = req.query.i;
                    param = 'i=' + req.query.i;


            } else if (req.query.hasOwnProperty('t')) {
                            key = req.query.t;
                            param = 't=' + encodeURIComponent(req.query.t);
                        }
                    

                    if (cache.hasOwnProperty(key)) {
                        res.json(cache[key]);

                    } else{
                            console.log(url + param);
                            axios.get(url + param)
                            .then(function(response) {
                                cache[key] = response.data;


                                res.json(cache[key]);

                            })
                            .catch(function(error) {
                                    // console.log(error);
                                    res.status(500).send('This sucked')
                                });
                            }
                        })

                            module.exports = app;