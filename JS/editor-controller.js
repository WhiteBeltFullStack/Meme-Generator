'use strict'
var gElCanvas
var gCtx

const TEXT_GAP = 50

var gCurrImgObj
var gCurrImg

renderCanvas()
function renderCanvas() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  window.addEventListener('resize', () => {
    renderMeme()
  })
}

function onSelectImg(elImg, id) {
  const elSearch = (document.querySelector('.search-section').style.display =
    'none')
  const elEditor = (document.querySelector('.editor-section').hidden = false)
  const elGallary = (document.querySelector('.gallary-section').hidden = true)
  const elSaved = (document.querySelector('.saved-section').hidden = false)

  updateMeme(id)
  renderMeme()
}

function renderMeme() {
  const meme = getMeme()

  if (!meme.selectedImgId) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'red'
    gCtx.font = `40px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(
      'No Img - No Meme 4 You!',
      gElCanvas.width / 2,
      gElCanvas.height / 2
    )
    gCtx.strokeText(
      'No Img - No Meme',
      gElCanvas.width / 2,
      gElCanvas.height / 2
    )
  } else {
    resizeCanvas()
    const img = getImgById(meme.selectedImgId)
    const { selectedLineIdx } = meme
    coverCanvasWithImg(img.url)

    meme.lines.forEach((line, idx) => {
      const { txt, x, y, size, fill, color, font, align, isDrag } = line
      drawText(
        { txt, x, y, size, fill, color, font, align },
        idx,
        selectedLineIdx
      )
    })
  }

  renderTools()
}

function drawRect(x, y) {
  gCtx.strokeStyle = 'black'
  gCtx.strokeRect(x, y, 40, 120)
}

function onWriteText(elTxt) {
  changeMemeText(elTxt)
  renderMeme()
}

function onChangeColor(elColor) {
  setFontColor(elColor)
  renderMeme()
}
function onChangefillColor(elFillColor) {
  setFillColor(elFillColor)
  renderMeme()
}

function onChangeFont(elFont) {
  setFont(elFont)
  renderMeme()
}

function onChangeSize(elSize) {
  setSize(elSize)
  renderMeme()
}

function onAddLine() {
  addLine()
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  renderMeme()
}
function onSwitchLine(elSwitchLine) {
  switchLine(elSwitchLine)

  renderMeme()
}

function renderTools() {
  const elActionsContainer = document.querySelector('.actions-container')
  const values = currLineValues()

  const elMemeInput = elActionsContainer.querySelector('.meme-input')
  const elColorFill = elActionsContainer.querySelector('.color-fill')
  const elColorPick = elActionsContainer.querySelector('.color-pick')
  const elFontSize = elActionsContainer.querySelector('.font-size')
  const elSelectFont = elActionsContainer.querySelector('.select-font')

  elMemeInput.value = values.txt
  elColorFill.value = values.fill
  elColorPick.value = values.color
  elFontSize.value = values.size
  elSelectFont.value = values.font
}

function drawText(params, idx, selectedLineIdx) {
  gCtx.lineWidth = 0.5
  gCtx.strokeStyle = params.color
  gCtx.fillStyle = params.fill
  gCtx.font = `${params.size}px ${params.font}`
  gCtx.textAlign = 'center'
  gCtx.textBaseLine = 'middle'

  const textMetrics = gCtx.measureText(params.txt)
  const textWidth = textMetrics.width
  const textHeight =
    textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
  console.log('textHeight:', textHeight)

  const padding = 15

  gCtx.fillText(params.txt, gElCanvas.width / 2, 40 * idx + TEXT_GAP) //x
  gCtx.strokeText(params.txt, gElCanvas.width / 2, 40 * idx + TEXT_GAP) //y
  if (idx === selectedLineIdx) {
    drawRect(
      gElCanvas.width / 2 - textWidth / 2 - padding,
      40 * idx + TEXT_GAP - textMetrics.actualBoundingBoxAscent - padding,
      textWidth + 2 * padding,
      textHeight + 2 * padding
    )
  }
}

function drawRect(x, y, textWidth, textHeight) {
  console.log('x:', x)
  console.log('y:', y)
  console.log('textWidth:', textWidth)
  console.log('textHeight:', textHeight)
  gCtx.lineWidth = 5
  gCtx.strokeStyle = 'black'
  gCtx.strokeRect(x, y, textWidth, textHeight)
}

function coverCanvasWithImg(imgSrc) {
  if (!imgSrc) return
  const elImg = new Image()
  elImg.src = imgSrc
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.clientWidth - 2
  gElCanvas.height = elContainer.clientHeight - 2
}
