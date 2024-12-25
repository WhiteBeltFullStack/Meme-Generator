'use strict'

var gInside = false
var gImgs = []
var gImagesLength
var gCoreRectParams

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
      size: 40,
      fill: '#ff0000',
      color: '#000000',
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
function addLine() {
  const newLine = {
    txt: 'I sometimes eat Falafel',
    x: 0,
    y: 0,
    size: 40,
    fill: '#FF0000',
    color: '#000000',
    font: 'Arial',
    align: 'center',
    isDrag: false,
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
  // gCoreRectParams = rectParams
  gMeme.lines[gMeme.selectedLineIdx].rectParams = rectParams
}

function isMouseOnText(mouseOverPos){
  return gMeme.lines.some((line, idx) => {
    const { x, y, textWidth, textHeight } = line.rectParams

    if (
      mouseOverPos.x >= x &&
      mouseOverPos.x <= x + textWidth &&
      mouseOverPos.y >= y &&
      mouseOverPos.y <= y + textHeight
    ) {
      gMeme.selectedLineIdx = idx
      return true
    }
    return false
  })
}

function isTextClicked(clickedPos) {
  return gMeme.lines.some((line, idx) => {
    const { x, y, textWidth, textHeight } = line.rectParams

    if (
      clickedPos.x >= x &&
      clickedPos.x <= x + textWidth &&
      clickedPos.y >= y &&
      clickedPos.y <= y + textHeight
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
