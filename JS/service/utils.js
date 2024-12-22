'use strict'

function makeId(length = 5) {
  var id = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    id += possible.charAt(getRandomInt(0, possible.length))
  }

  return id
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

function randomiseKeyWords() {
  const keyWords = ['Happy', 'Sad', 'funny', 'Crazy', 'Sarcastic']
  const usedKeyWords = []

  for (var i = 0; i < 3; i++) {
    var idx = getRandomInt(0, keyWords.length - i)
    usedKeyWords.push(keyWords[idx])
    keyWords.splice(idx, 1)
  }
  return usedKeyWords
}
