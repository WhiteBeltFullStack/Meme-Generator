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

  elSavedMemesContainer.innerHTML = strHtml.join('')
}

function onLoadSavedMeme(idx) {
    const elEditorSection = document.querySelector('.editor-section')
    const elSavedMemesContainer = document.querySelector('.saved-section')
    
    elSavedMemesContainer.style.display = 'none'
    elEditorSection.style.display = 'block'
    renderMeme(idx)
}
