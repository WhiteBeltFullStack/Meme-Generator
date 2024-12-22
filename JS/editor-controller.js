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
  const meme = getMeme();

  // Check if there is no meme or no selected image
  if (!meme.selectedImgId) {
    console.log('No image selected');
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height); // Clear the canvas
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'red';
    gCtx.font = `40px Arial`;
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';

    // Display the "No Img - No Meme" message
    gCtx.fillText('No Img - No Meme', gElCanvas.width / 2, gElCanvas.height / 2);
    gCtx.strokeText('No Img - No Meme', gElCanvas.width / 2, gElCanvas.height / 2);
  } else {
    // Resize the canvas and draw the selected image
    resizeCanvas();
    const img = getImgById(meme.selectedImgId);
    coverCanvasWithImg(img.url);

    // Render text lines
    meme.lines.forEach((line, idx) => {
      const { txt, x, y, size, fill, color, font, align, isDrag } = line;
      drawText({ txt, x, y, size, fill, color, font, align }, idx);
    });
  }
}


function onWriteText(elTxt) {
  changeMemeText(elTxt)

  renderMeme()
}

function drawRect(){
  
}

function drawText(params, idx) {
  gCtx.lineWidth = 1
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = 'red'
  gCtx.font = `40px Ariel`
  gCtx.textAlign = 'center'
  gCtx.textBaseLine = 'middle'

  gCtx.fillText(params.txt, gElCanvas.width / 2, 40 * idx + TEXT_GAP) //x
  gCtx.strokeText(params.txt, gElCanvas.width / 2, 40 * idx + TEXT_GAP) //y
}

function coverCanvasWithImg(imgSrc) {
  if(!imgSrc) return
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
