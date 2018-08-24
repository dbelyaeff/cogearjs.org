const burger = () => {
  let el = document.querySelector('.navbar-burger')
  el.addEventListener('click', (e) => {
    // Get the target from the "data-target" attribute
    const target = el.dataset.target;
    const $target = document.getElementById(target);
    console.log($target.classList)
    $target.classList.toggle('is-active')
    $target.classList.toggle('fadeInDown');
    const $nav = document.getElementById('nav');
    if($nav){
      el.classList.toggle('is-active');
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      if(!$nav.classList.contains('scroll-active')) $nav.classList.toggle('active');
    }
  });
}
document.addEventListener(window.Turbolinks ? 'turbolinks:load' : 'DOMContentLoaded',burger);