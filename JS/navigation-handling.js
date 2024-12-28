'use strict'

const gNavigation = {
  elEditor: document.querySelector('.editor-section'),
  elGallary: document.querySelector('.gallary-section'),
  elSearch: document.querySelector('.search-section'),
  elSaved: document.querySelector('.saved-section'),
}



function onGallarySec(ev) {
  ev.preventDefault()
  const { elEditor, elSearch, elGallary, elSaved } = gNavigation
  elGallary.style.display = 'block'
  elSearch.style.display = 'flex'
  elEditor.style.display = 'none'
  elSaved.style.display = 'none'
}
function onEditorSec(ev) {
  ev.preventDefault()
  const { elEditor, elSearch, elGallary, elSaved } = gNavigation
  elGallary.style.display = 'none'
  elSearch.style.display = 'none'
  elEditor.style.display = 'block'
  elSaved.style.display = 'none'
  renderMeme()
}
function onSavedSec(ev) {
  ev.preventDefault()
  const { elEditor, elSearch, elGallary, elSaved } = gNavigation
  elGallary.style.display = 'none'
  elSearch.style.display = 'none'
  elEditor.style.display = 'none'
  elSaved.style.display = 'block'
}
function onRandomizeSec(ev) {
  ev.preventDefault()
  const { elEditor, elSearch, elGallary, elSaved } = gNavigation
  elGallary.hidden = false
  elEditor.hidden = true
  elSearch.style.display = 'none'
  elSaved.hidden = true

}


function onToggleMenu(){
  document.body.classList.toggle('menu-open')
}