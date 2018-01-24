require('babel/register');
const http = require('http');
var request = require('request');
var Slack = require('slack-client');
try {
  const fs = require('fs');
  const token = process.env.SLACK_TOKEN;
  var slack = new Slack(token, true, true);

  var makeMention = function(userId) {
    return '<@' + userId + '>';
  };

  var isDirect = function(userId, messageText) {
    var userTag = makeMention(userId);
    return messageText &&
    messageText.length >= userTag.length &&
    messageText.substr(0, userTag.length) === userTag;
  };

  function getfact(first, second, channel, user) {
    request({
        url: "http://numbersapi.com/"+first+second,
        method: 'GET',
      }, function(error, response, body) {
      if (error) {
        console.log('Error sending message to user: ' + error);
      } else {
        channel.send(' Here is the fact: \n*' + body+ '*\n');
      }
      });
  }
  slack.on('message', function(message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user = slack.getUserByID(message.user);

    if (message.type === 'message' && isDirect(slack.self.id, message.text)) {
      //Trimmed message
      var trMessage = message.text.substr(makeMention(slack.self.id).length+1).trim();
      var query = trMessage.split(" ");
      if(query[0] == "Random"){
        if(query[1] == "Number-fact"){
          getfact("random/trivia", "", channel, user);
        }
        else if(query[1] == "Year-fact"){
          getfact("random/year", "", channel, user);
        }
        else if(query[1] == "Date-fact"){
          getfact("random/date", "", channel, user);
        }
      }
      else if(query[0]=="Number-fact"){
        getfact("", query[1], channel, user);
      }
      else if(query[0]=="Year-fact"){
        getfact(query[1], "/year", channel, user);
      }
      else if(query[0]=="Date-fact"){
        getfact(query[1], "/date", channel, user);
      }
      else{
        channel.send("Sorry invalid command, Here is the list of commands I can execute \n 1.Year-fact <Year>\n2.Number-fact <number>\n3.Year-fact <year>\n 4.Date-fact <mm/dd> \n 5. Random: Add this keyword to above commands and get facts about random numbers i.e. no need to specify numbers.");
      }
      

    }
  });

  slack.login();
  http.createServer(function(req, res) {
  res.end('Hi there, Lets get started');
  }).listen(8080);

} catch(error) {
    console.log('Retry');
    return;
}
