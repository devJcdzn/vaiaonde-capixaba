const buttonfilter = document.getElementById('filter-button');
const buttonCloseFilter = document.getElementById('filter-modal');
const modal = document.querySelector('dialog');
let activeModal = false

buttonfilter.onclick = () => {
  modal.showModal()
  document.body.style.overflow = "hidden"
  document.body.style.opacity = "0.5"
  activeModal = true
}

buttonCloseFilter.onclick = () => {
  modal.close()
  document.body.style.overflow = "auto"
  document.body.style.opacity = "1"
  alert('dddd')
}

document.addEventListener('click', (event) => {
  if(event.target === modal && modal.contains(event.target)) {
    modal.close()
    document.body.style.overflow = "auto"
    document.body.style.opacity = "1"
  }
})