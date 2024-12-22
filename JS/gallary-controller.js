'use strict'

var gQueryOptions = {
  filterBy: { txt: '' },
  page: { idx: 0, size: 6 },
}

function onInit() {
  renderGallary()
}

function renderGallary() {
  const elImgsContainer = document.querySelector('.gallary-container')
  const imgs = getImgs(gQueryOptions)

  if (imgs.length === 0) {
    const strHtml = '<h1>No Images Found</h1>'
    elImgsContainer.innerHTML = strHtml
  } else {
    const strHtml = imgs.map(
      (img) =>
        `
        <img src="${img.url}" alt="" onclick="onSelectImg(this,'${img.id}')">
     `
    )
    elImgsContainer.innerHTML = strHtml.join('')
  }
}

function onSearchMeme(elKey) {
  gQueryOptions.filterBy.txt = elKey
  renderGallary()
}

function onPageChange(diff) {
  const elPage = document.querySelector('.page-num')
  const elPageBottom = document.querySelector('.page-num-bottom')
  const length = imgsLength()

  var maxPageNum = Math.ceil(length / gQueryOptions.page.size)

  gQueryOptions.page.idx = gQueryOptions.page.idx + diff

  if (gQueryOptions.page.idx >= maxPageNum) {
    gQueryOptions.page.idx = 0
  }
  if (gQueryOptions.page.idx < 0) {
    gQueryOptions.page.idx = maxPageNum - 1
  }
  elPage.innerText = gQueryOptions.page.idx + 1
  elPageBottom.innerText = gQueryOptions.page.idx + 1
  renderGallary()
}
