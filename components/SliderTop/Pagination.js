export default function Pagination(templateElement, i, handleChangePagination) {
  const template = document.querySelector(templateElement).content.cloneNode(true)
  let element = template.querySelector('.reviews__item')
  element.setAttribute("paginate", i);
  i === 0 ? element.classList.add('reviews__item_active') : ''
  element.addEventListener('click', handleChangePagination)
  return element
}
