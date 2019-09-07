const http = require('http');
const express = require('express');
const app = express();
const readline = require('readline');

const port = 5000;
const clientDomain = 'http://localhost:3000';
const twitterStream = 'http://146.148.69.106';

const dict = {
    words: {},
    users: {},
    hashtags: {}
}
let twittsCounter = 0;
let startTime;

http.get(twitterStream, function (res) {
    const myInterface = readline.createInterface({
        input: res
    });
    myInterface.on('line', function (line) {
        try {
            const twitt = JSON.parse(line);
            setWordsDictionary(twitt);
            setUsersDictionary(twitt);
            setHastagsDictionary(twitt);
            twittsCounter++;
        } catch(e) {}
    });
});
const setWordsDictionary = (twitt) => {
    const textArray = twitt.text.split(' ');
    for(const word of textArray) {
        if(dict.words[word]) {
            dict.words[word] += 1;
        } else {
            dict.words[word] = 1;
        }
    }
}
const setUsersDictionary = (twitt) => {
    if(dict.users[twitt.user.screen_name]) {
        dict.users[twitt.user.screen_name] += 1;
    } else {
        dict.users[twitt.user.screen_name] = 1;
    }
}
const setHastagsDictionary = (twitt) => {
    if(twitt.entities.hashtags.length) {
        for(const hashtag of twitt.entities.hashtags) {
            if(dict.hashtags[hashtag.text]) {
                dict.hashtags[hashtag.text] += 1;
            } else {
                dict.hashtags[hashtag.text] = 1;
            }
        }
    }
}
const getTopItems = (items, numOfItems) => {
    var itemsArray = Object.keys(items).map(function(key) {
        return {key, value: items[key]};
    });
    itemsArray = itemsArray.sort(function(a,b){return b.value - a.value})
    return itemsArray.slice(0, numOfItems);
}
const getAllData = (numOfItems) => {
    return {
        users: getTopItems(dict.users, numOfItems),
        words: getTopItems(dict.words, numOfItems),
        hashtags: getTopItems(dict.hashtags, numOfItems),
        avg: computeAvgTwitts().toString(),
        serverStartTime: startTime, 
    }
}
const computeAvgTwitts = () => {
    const ms = Date.now() - startTime;
    return (twittsCounter/(Math.floor((ms)/1000)));
}
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', clientDomain);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


app.use(allowCrossDomain);
app.get('/top-words', (req, res) => res.send(getTopItems(dict.words, 10)));
app.get('/top-users', (req, res) => res.send(getTopItems(dict.users, 10)));
app.get('/top-hashtags', (req, res) => res.send(getTopItems(dict.hashtags, 10)));
app.get('/avg-twitts', (req, res) => res.send(computeAvgTwitts().toString()));
app.get('/top-data', (req, res) => res.send(getAllData(10)));

app.listen(port, () => startTime = new Date());

