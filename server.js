const http = require('http');
const express = require('express');
const app = express();
const readline = require('readline');

const port = 3000;
const url = 'http://146.148.69.106';
const timeOut = 1000000;

const dict = {
    words: {},
    users: {},
    hashtags: {}
}
let twittsCounter = 0;
let startTime;

http.get(url, function (res) {
    setTimeout(() => res.destroy(), timeOut);
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
    for(word of textArray) {
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
        for(hashtag of twitt.entities.hashtags) {
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
const computeAvgTwitts = () => {
    const ms = Date.now() - startTime;
    console.log(twittsCounter);   
    console.log(twittsCounter/(Math.floor((ms)/1000)));   
    return (twittsCounter/(Math.floor((ms)/1000)));
}
app.get('/top-words', (req, res) => res.send(getTopItems(dict.words, 10)));
app.get('/top-users', (req, res) => res.send(getTopItems(dict.users, 10)));
app.get('/top-hashtags', (req, res) => res.send(getTopItems(dict.hashtags, 10)));
app.get('/avg-twitts', (req, res) => res.send(computeAvgTwitts().toString()));

app.listen(port, () => startTime = new Date());

