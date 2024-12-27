'use strict'
var gElCanvas
var gCtx

var gStartPos

var rectParams = {}

const TEXT_GAP = 50

var gCurrImgObj
var gCurrImg

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

renderCanvas()
function renderCanvas() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  addListeners()
  renderMeme()

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
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  if (!meme.lines.length) return

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
      'No Img - No Meme 4 You!',
      gElCanvas.width / 2,
      gElCanvas.height / 2
    )
  } else {
    resizeCanvas()
    setInitialTextPositions()
    const img = getImgById(meme.selectedImgId)

    coverCanvasWithImg(img.url, meme)
  }

  renderTools()
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
  gElCanvas.addEventListener('mousemove', onMouseMove)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onMouseMove(ev) {
  const pos = getEvPos(ev)
  if (isMouseOnText(pos)) {
    document.body.style.cursor = 'grab'
  } else {
    document.body.style.cursor = 'default'
  }
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (isTextClicked(pos)) {
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    onMouseMove(ev)
  } else {
    return
  }
}

function onMove(ev) {
  if (!checkDragged()) return
  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveText(dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp() {
  setTextDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
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
  if (!params.txt) return
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

  const padding = 10

  gCtx.fillText(params.txt, params.x, params.y)
  gCtx.strokeText(params.txt, params.x, params.y)

  if (idx === selectedLineIdx) {
    const x = params.x - textWidth / 2 - padding
    const y = params.y - textMetrics.actualBoundingBoxAscent - padding
    const rectWidth = textWidth + 2 * padding
    const rectHeight = textHeight + 2 * padding

    gCtx.lineWidth = 5
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x, y, rectWidth, rectHeight)

    getRectParams({ x, y, textWidth, textHeight })
  }
}

function coverCanvasWithImg(imgSrc, meme) {
  if (!imgSrc) return
  const elImg = new Image()
  elImg.src = imgSrc

  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

  const { selectedLineIdx } = meme

  meme.lines.forEach((line, idx) => {
    let { txt, x, y, size, fill, color, font, align, isDrag } = line
    drawText(
      { txt, x, y, size, fill, color, font, align },
      idx,
      selectedLineIdx
    )
  })
}

function setInitialTextPositions() {
  const meme = getMeme()

  meme.lines.forEach((line, idx) => {
    if (!line.initialized) {
      line.x = gElCanvas.width / 2
      line.y = 40 * idx + TEXT_GAP
      line.initialized = true
    }
  })
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.clientWidth - 2
  gElCanvas.height = elContainer.clientHeight - 2
}

function onDownloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onMoveLeft() {
  const elEmojiContainer = document.querySelector(
    '.emoji-container .emoji-carousel'
  )
  elEmojiContainer.scrollBy({ top: 0, left: -50, behavior: 'smooth' })
}

function onMoveRight() {
  const elEmojiContainer = document.querySelector(
    '.emoji-container .emoji-carousel'
  )
  elEmojiContainer.scrollBy({ top: 0, left: 50, behavior: 'smooth' })
}

function onPlaceEmoji(elEmoji) {
  drawEmoji(elEmoji)
  renderMeme()
}
