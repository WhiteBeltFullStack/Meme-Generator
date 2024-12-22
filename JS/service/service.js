'use strict'

var gImgs = []
var gImagesLength

_createImgs()
var gKeywordSearchCountMap = {
  funny: 12,
  sad: 16,
  happy: 2,
  crazy: 3,
  sarcastic: 3,
}

var gMeme = {
  selectedImgId: null,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      x: 0,
      y: 0,
      size: 20,
      fill: 'red',
      color: 'black',
      font: 'Arial',
      align: 'center',
      isDrag: false,
    },
  ],
}

function getMeme() {
  return gMeme
}

function getImgs(options) {
  var imgs = gImgs
  const { filterBy, page } = options

  if (filterBy.txt)
    imgs = imgs.filter((img) =>
      img.keywords.some((keyword) =>
        keyword.toLowerCase().includes(filterBy.txt.toLowerCase())
      )
    )

  gImagesLength = imgs.length

  const startIdx = page.idx * page.size
  const endIdx = startIdx + page.size
  imgs = imgs.slice(startIdx, endIdx)
  return imgs
}

function _createImgs() {
  for (var i = 0; i < 25; i++) {
    gImgs.push(_createImg(i))
  }
}

function _createImg(idx) {
  return {
    id: makeId(5),
    url: `imgs/${idx + 1}.jpg`,
    keywords: randomiseKeyWords(),
  }
}

function changeMemeText(elTxt) {
  if (elTxt.length === 0) {
    gMeme.lines[gMeme.selectedLineIdx].txt = 'Enter Text Here'
  } else {
    gMeme.lines[gMeme.selectedLineIdx].txt = elTxt
  }
}

function getImgById(id) {
  const img = gImgs.find((img) => img.id === id)
  return img
}

function updateMeme(id) {
  const img = gImgs.find((img) => img.id === id)
  gMeme.selectedImgId = img.id
}

function imgsLength() {
  return gImagesLength
}
