'use strict'

var gImgs = []
_createImgs()
var gKeywordSearchCountMap = {
  funny: 12,
  sad: 16,
  happy: 2,
  crazy: 3,
  sarcastic: 3,
}

var gMeme = {
    selectedImgId: 5,
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

function getMeme(){
    return gMeme
}


function getImgs(options) {
  var imgs = gImgs
  const { filterBy, page } = options

if(filterBy.txt)
   imgs=imgs.filter((img) =>
    img.keywords.some((keyword) =>
      keyword.toLowerCase().includes(filterBy.txt.toLowerCase())
    )
  )

  console.log('imgs.length:',imgs.length)

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

function getImgById(id) {
  const img = gImgs.find((img) => img.id === id)
  return img
}

function imgsLength() {
  return gImgs.length
}
