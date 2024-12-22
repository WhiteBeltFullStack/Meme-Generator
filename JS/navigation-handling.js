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
  elGallary.hidden = false
  elSearch.style.display = 'flex'
  elEditor.hidden = true
  elSaved.hidden = true
}
function onEditorSec(ev) {
  ev.preventDefault()
  const { elEditor, elSearch, elGallary, elSaved } = gNavigation
  elEditor.hidden = false
  elGallary.hidden = true
  elSearch.style.display = 'none'
  elSaved.hidden = true
}
function onSavedSec(ev) {
  ev.preventDefault()
  const { elEditor, elSearch, elGallary, elSaved } = gNavigation
  elSaved.hidden = false
  elGallary.hidden = true
  elEditor.hidden = true
  elSearch.style.display = 'none'
}
function onRandomizeSec(ev) {
  ev.preventDefault()
  const { elEditor, elSearch, elGallary, elSaved } = gNavigation
  elGallary.hidden = false
  elEditor.hidden = true
  elSearch.style.display = 'none'
  elSaved.hidden = true

  // const elEditor = document.querySelector('.editor-section')
  // const elSearch = document.querySelector('.search-section')
  // const elGallary = document.querySelector('.gallary-section')
  // const elSaved = document.querySelector('.saved-section')
}
