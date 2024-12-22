'use strict'
var gElCanvas
var gCtx

var gCurrImgObj
var gCurrImg

const getMemeData = getMeme()

renderCanvas()
function renderCanvas() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  window.addEventListener('resize', () => {
    resizeCanvas()
    redrawCanvas()
  })
}

function onSelectImg(elImg, id) {
  gCurrImgObj = getImgById(id)
  gCurrImg = elImg

  const elSearch = (document.querySelector('.search-section').style.display =
    'none')
  const elEditor = (document.querySelector('.editor-section').hidden = false)
  const elGallary = (document.querySelector('.gallary-section').hidden = true)
  const elSaved = (document.querySelector('.saved-section').hidden = false)
  resizeCanvas()
  redrawCanvas()
}

function onAddText(elTxt, memeData) {
  console.log('elTxt:', elTxt)
}

// var gMeme = {
//   selectedImgId: 5,
//   selectedLineIdx: 0,
//   lines: [
//     {
//       txt: 'I sometimes eat Falafel',
//       x: 0,
//       y: 0,
//       size: 20,
//       fill: 'black',
//       color: 'red',
//       font: 'Arial',
//       align: 'center',
//       isDrag: false,
//     },
//   ],
// }

function redrawCanvas() {
  coverCanvasWithImg(gCurrImg)
  drawText(getMemeData)
}

function drawText(memeData) {
  const { txt, x, y, color, size, fill, font, align, isDrag } =
    memeData.lines[0]

  gCtx.lineWidth = 1
  gCtx.strokeStyle = color
  gCtx.fillStyle = fill
  gCtx.font = `${50}px ${font}`
  gCtx.textAlign = align
  gCtx.textBaseLine = 'middle'

  gCtx.fillText(txt, gElCanvas.width / 2, 100)
  gCtx.strokeText(txt, gElCanvas.width / 2, 100)
}

function coverCanvasWithImg(elImg) {
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.clientWidth - 2
  gElCanvas.height = elContainer.clientHeight - 2
}
