
export default function Card (data, templateElement, i) {
  const template = document.querySelector(templateElement).content.cloneNode(true)
  let title = template.querySelector('.reviews__card-title')
  let paragraph = template.querySelector('.reviews__paragraph')
  let link = template.querySelector('.reviews__full-screen')
  let element = template.querySelector('.reviews__card')
  i !== 0 ? element.classList.add('reviews_inactive') : ''
  element.setAttribute("number", i);
  title.src = data.img
  paragraph.textContent = data.paragraph
  link.src = data.link
  return element
}
