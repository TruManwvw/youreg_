const showMore = document.querySelector('.grid-resources__see-more');
const productLength = document.querySelectorAll('.grid-resources__block').length;
let items = 8;

showMore.addEventListener('click', () => {
   items += 7;
   const array = Array.from(document.querySelector('.grid-resources__list').children);
   const visItems = array.slice(0, items);

   visItems.forEach(el => el.classList.add('is-visible'));

   if (visItems.length === productLength) {
      showMore.style.display = 'none';
   }
});