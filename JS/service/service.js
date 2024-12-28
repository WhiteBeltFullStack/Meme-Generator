'use strict'

var gInside = false
var gImgs = []
var gImagesLength
var gCoreRectParams
var gSavedMemes = []

_createImgs()
var gKeywordSearchCountMap = {
  funny: 0,
  sad: 0,
  happy: 0,
  crazy: 0,
  sarcastic: 0,
}

var gMeme = {
  selectedImgId: null,
  selectedLineIdx: 0,

  lines: [
    {
      txt: 'Enter Text Here',
      x: 0,
      y: 0,
      size: 40,
      fill: '#ff0000',
      color: '#000000',
      font: 'Arial',
      align: 'center',
      isDrag: false,
      isMouseOn: false,
    },
  ],
}

function resetNewImgData(){
  gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
  
    lines: [
      {
        txt: 'Enter Text Here',
        x: 0,
        y: 0,
        size: 40,
        fill: '#ff0000',
        color: '#000000',
        font: 'Arial',
        align: 'center',
        isDrag: false,
        isMouseOn: false,
      },
    ],
  }
}

function getSavedMemes() {
  return gSavedMemes
}

function getWords() {
  return gKeywordSearchCountMap
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
  gMeme.lines[gMeme.selectedLineIdx].txt = elTxt

  // if (elTxt.length === 0) {
  //   gMeme.lines[gMeme.selectedLineIdx].txt = 'Enter Text Here'
  // } else {
  //   gMeme.lines[gMeme.selectedLineIdx].txt = elTxt
  // }
}

function setFontColor(elColor) {
  gMeme.lines[gMeme.selectedLineIdx].color = elColor
}
function setFillColor(elFillColor) {
  gMeme.lines[gMeme.selectedLineIdx].fill = elFillColor
}

function setFont(elFont) {
  gMeme.lines[gMeme.selectedLineIdx].font = elFont
}

function setSize(elSize) {
  gMeme.lines[gMeme.selectedLineIdx].size = elSize
}
function getImgById(id) {
  const img = gImgs.find((img) => img.id === id)
  return img
}

function getMemeByIdx(idx) {
  const newCopiedMeme = gSavedMemes.find(
    (savedMeme, savedIdx) => idx === savedIdx
  )

  gMeme = newCopiedMeme
  return newCopiedMeme
}

function addLine() {
  const newLine = {
    txt: 'Enter Text Here',
    x: 0,
    y: 0,
    size: 40,
    fill: '#FF0000',
    color: '#000000',
    font: 'Arial',
    align: 'center',
    isDrag: false,
    isMouseOn: false,
  }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}
function deleteLine() {
  if (!gMeme.lines.length) return
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}
function switchLine(elSwitchLine) {
  gMeme.selectedLineIdx += elSwitchLine
  if (gMeme.selectedLineIdx < 0) {
    gMeme.selectedLineIdx = gMeme.lines.length - 1
  }
  if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0
  }
}

function currLineValues() {
  const { txt, size, fill, color, font, align } =
    gMeme.lines[gMeme.selectedLineIdx]
  return { txt, size, fill, color, font, align }
}

function updateMeme(id) {
  const img = gImgs.find((img) => img.id === id)
  gMeme.selectedImgId = img.id
}

function imgsLength() {
  return gImagesLength
}

function getRectParams(rectParams) {
  gMeme.lines[gMeme.selectedLineIdx].rectParams = rectParams
}

function isMouseOnText(mouseOverPos) {
  if (!gMeme.selectedImgId) return
  return gMeme.lines.some((line, idx) => {
    const { x, y, textWidth, textHeight } = line.rectParams

    if (
      mouseOverPos.x >= x &&
      mouseOverPos.x <= x + textWidth + 20 &&
      mouseOverPos.y >= y &&
      mouseOverPos.y <= y + textHeight + 20
    ) {
      return true
    }
    return false
  })
}

function isTextClicked(clickedPos) {
  if (!gMeme.selectedImgId) return
  return gMeme.lines.some((line, idx) => {
    const { x, y, textWidth, textHeight } = line.rectParams

    if (
      clickedPos.x >= x &&
      clickedPos.x <= x + textWidth + 20 &&
      clickedPos.y >= y &&
      clickedPos.y <= y + textHeight + 20
    ) {
      gMeme.selectedLineIdx = idx

      return true
    }
    return false
  })
}


function setTextDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function checkDragged() {
  return gMeme.lines[gMeme.selectedLineIdx].isDrag
}

function moveText(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx
  gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function wordClicked(elWord) {
  !gKeywordSearchCountMap[elWord]
    ? (gKeywordSearchCountMap[elWord] = 1)
    : gKeywordSearchCountMap[elWord]++
  console.log('elWord:', gKeywordSearchCountMap[elWord])
}

function drawEmoji(elEmoji) {
  const emojiDraw = {
    txt: `${elEmoji}`,
    x: 0,
    y: 0,
    size: 40,
    fill: '#ff0000',
    color: '#000000',
    font: 'Arial',
    align: 'center',
    isDrag: false,
  }
  gMeme.lines.unshift(emojiDraw)
  gMeme.selectedLineIdx = 0
}

// function saveImgMeme(imgDataUrl) {
//   const savedMeme = {
//     ...gMeme,
//     imgDataUrl,
//   }
//   console.log('MISHA LOG:', savedMeme)
//   gSavedMemes.unshift(savedMeme)
// }

function saveImgMeme(imgDataUrl) {
  const savedMeme = structuredClone(gMeme) // Creates a deep copy of gMeme
  savedMeme.imgDataUrl = imgDataUrl // Add the new property
  console.log('MISHA LOG:', savedMeme)
  gSavedMemes.unshift(savedMeme) // Add to the beginning of gSavedMemes
}
