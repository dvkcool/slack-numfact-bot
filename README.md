# Building a Slack Horoscope Bot on Hasura

This tutorial consists of a quickstart slack bot which can be easily deployed and modified.

This bot gives a random fact on numbers, year or date in plain text, just need to specify the keywords.

## Demo
 ![demo1](https://github.com/dvkcool/slack-numfact-bot/blob/master/demo/demo1.gif?raw=true)
 ![demo2](https://github.com/dvkcool/slack-numfact-bot/blob/master/demo/demo2.gif?raw=true)



## API used

Numbers API Of [David and Mack](http://numbersapi.com)


## Pre-requisites

* [NodeJS](https://nodejs.org)

* [hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)

## Getting the bot running

### Create a new slack bot integration

* Navigate to https://my.slack.com/services/new/bot
* Choose a bot user name and click on **'+ Add bot integration’**.

![Bot creation](https://github.com/dvkcool/slack-tic-tac-toe-bot/blob/master/demo/bot-name.png?raw=true)

* Copy the API Token from the page, it will be used later.

![Bot API screen](https://github.com/dvkcool/slack-tic-tac-toe-bot/blob/master/demo/bot-api-key.png?raw=true)



### Getting the Hasura project

```sh
$ hasura quickstart dvk/slack-numfact-bot
$ cd slack-numfact-bot
# Add Slack API key to hasura secrets. 
hasura secrets update SLACK_BOT_TOKEN.key  <Your Bot API KEY>
# Deploy
$ git add . && git commit -m "Deployment commit"
$ git push hasura master
```

After the `git push` completes:

```sh
$ hasura microservice list
```

You will get an output like so:

```sh
USER MS NAME     STATUS      INTERNAL-URL       EXTERNAL-URL            
bot              Running     bot.default:80     http://bot.mispronounce16.hasura-app.io

HASURA MS NAME     STATUS      INTERNAL-URL                  EXTERNAL-URL 
sshd               Running                                   
auth               Running     auth.hasura:80                http://auth.mispronounce16.hasura-app.io
postgres           Running     postgres.hasura:5432          
platform-sync      Running                                   
filestore          Running     filestore.hasura:80           http://filestore.mispronounce16.hasura-app.io
gateway            Running                                   
notify             Running     notify.hasura:80              http://notify.mispronounce16.hasura-app.io
le-agent           Running                                   
session-redis      Running     session-redis.hasura:6379     
data               Running     data.hasura:80                http://data.mispronounce16.hasura-app.io



```


### Adding bot to your groups/DM
Just type @botname to invite the bot to the channel or DM,

Just a demo of how to invite and get first fact
![invitation](https://github.com/dvkcool/slack-horoscope-bot/blob/master/demo/inviting-num.gif?raw=true)

```sh
#to get Number-fact
@botname Number-fact <number>

#to get Year-fact
@botname Year-fact <year>

#to get Date-fact
@botname Date-fact <mm/dd>

#to get Random facts about number year or date
@botname Random Number-fact / Year-fact/ Date-fact 

```


Congratulations you have succesfully deployed the slack horoscope bot.


## Modifying the bot

Head over to microservices/bot/src/
And start editing server.js
Soon enough you will have your node js slack bot ready

Happy Developing :)
Divyanshu Kumar
## Support

If you happen to get stuck anywhere, feel free to mail me at divyanshukumarg@gmail.com. Also, if you find a bug or an issue, you can raise an issue [here](https://github.com/dvkcool/slack-numfact-bot)
