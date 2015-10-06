# kaliberBot robot-arm

## Dependencies
* [NPM](https://www.npmjs.com/)
* [NODE](https://www.nodejs.org/)

## Raspberry pi login
- hostname: kaliberBot
- username : pi
- password: lkleef

## Wifi password
kal!berbot

## data to arduino 
- 0 t/m 9 as a single numb
- a = atach the servo's (power On the servo's)
- d = detach the servo's (power Off the servo's)
- b = backspace key
- : = : key

## Installation instructions for the Raspberry Pi

### Install dependecies on pi
- curl -sLS https://apt.adafruit.com/add | sudo bash
- sudo apt-get install node

### clone repo
- cd Desktop
- git clone https://github.com/larsvankleef/uarmRobot.git

### run the app
- npm install
- cd Desktop
- node server.js
