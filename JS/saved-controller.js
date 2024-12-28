'use strict'

function renderSavedMemes() {
  const elSavedMemesContainer = document.querySelector(
    '.saved-section .saved-container '
  )

  const savedMemes = getSavedMemes()

  const strHtml = savedMemes.map((meme, idx) => {
    return `
    <img class="saved-img" src="${meme.imgDataUrl}" alt="" onclick="onLoadSavedMeme(${idx})"> 
    `
  })
  //   <img class="saved-img" src="${meme.imgDataUrl}" alt="" onclick="onLoadSavedMeme('${meme.selectedImgId}',${idx})">

  elSavedMemesContainer.innerHTML = strHtml.join('')
}

function onLoadSavedMeme(idx) {
  renderMeme(idx)
}
