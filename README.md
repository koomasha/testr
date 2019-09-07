
USAGE:
1. npm install
2. npm start

ASSUMPTIONS:
1. Required to build server which agregates twitts from server start time to current time.
2. Each client request get data agregated from server start time until current time.
3. Filtering is out of the top ten and not out of all data.

URL:
1. client: http://localhost:3000
2. server: http://localhost:5000
    2.1 top users: http://localhost:5000/top-users
    2.2 top words: http://localhost:5000/top-words
    2.3 top hashtags: http://localhost:5000/top-hashtags
    2.4 average twitts: http://localhost:5000/avg-twitts
    2.5 all data: http://localhost:5000/