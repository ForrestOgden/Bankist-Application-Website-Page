'use strict';

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




document.querySelector('.nav__links').addEventListener('click', function(e){

  if(e.target.classList.contains('nav__link')) {    // ignore clicks that did not happen on the links

   e.preventDefault();
                                                     
   const id = e.target.getAttribute('href');

   const section = document.querySelector(id);

   section.scrollIntoView({behavior: 'smooth'});

}

});




// BUILDING A TABBED COMPONENT ///////////////////////////////////////////////////////////////////////////////////


// select the tabs, container, and content

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');




// add event handlers to buttons in tab using event delegation

tabsContainer.addEventListener('click', function(e){

  const clicked = e.target.closest('.operations__tab');


  if(!clicked) return;

  // Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');


  // Activate content area
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');  



});




// creating an effect where links that aren't hovered over fade vs hovered link

// menu fade animation

// refactor function after writing code for each event handle

const nav = document.querySelector('.nav');

const handleHover = function(e) {
 

 if(e.target.classList.contains('nav__link')){
   const link = e.target;

   const siblings = link.closest('.nav').querySelectorAll('.nav__link');

   const logo = link.closest('.nav').querySelector('img');


   siblings.forEach(el => {
     if (el !== link) el.style.opacity = this;
   })

   logo.style.opacity = this;
 }

}




nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));




//   Doing the actual sticky with intersection observer: ----------------------------------------------------



const stickyNav = function(entries) {

  const [entry] = entries;

  if(entry.isIntersecting === false){

  const nav = document.querySelector('nav');

  nav.classList.add('sticky'); 

} else {
    nav.classList.remove('sticky');
  }

}




const navHeight = nav.getBoundingClientRect().height;

console.log(navHeight);

const header = document.querySelector('.header');

const headerObserver = new IntersectionObserver(stickyNav, {

root: null,
threshold: 0,
rootMargin: `-${navHeight}px`,

});


headerObserver.observe(header);






const allSections = document.querySelectorAll('.section');



const revealSection = function(entries, observer){
  
 const [entry] = entries;

  if(!entry.isIntersecting) return;


  entry.target.classList.remove('section--hidden');

  sectionObserver.unobserve(entry.target);             


}




const sectionObserver = new IntersectionObserver(revealSection, {

root: null,
threshold: 0.15,

});


allSections.forEach(section => {

  sectionObserver.observe(section);

  section.classList.add('section--hidden');

})







const featuresImages = document.querySelectorAll('.features__img');


const revealImage = function(entries, observer) {
  
  const [entry] = entries;

  console.log(entry);

  if(!entry.isIntersecting) return;

  // REPLACE src with data-src

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){

    entry.target.classList.remove('lazy-img');

  })

  featuresObserver.unobserve(entry.target);

};



const featuresObserver = new IntersectionObserver(revealImage, {
 
root: null,
threshold: 0,
rootMargin: '200px',
 
});



featuresImages.forEach(img => {

featuresObserver.observe(img);

})




const slider = document.querySelector('.slider');

const slides = document.querySelectorAll('.slide');

let currentSlide = 0;
const maxSlide = slides.length;

// BUTTONS
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');



  // REFACTORED FUNCTION

 const goToSlide = function(slide) {
   slides.forEach((s, i) => {

   s.style.transform = `translateX(${100 * (i - slide)}%)`;
   })

  }

goToSlide(0);





// NEXT SLIDE


// REFACTORED FUNCTION

const nextSlide = function(){
 if (currentSlide === maxSlide - 1){
   currentSlide = 0;
 } else{
  currentSlide++;
  }
  
  goToSlide(currentSlide);

}

btnRight.addEventListener('click', nextSlide);


const previousSlide = function(){
 if (currentSlide === 0){
   currentSlide = maxSlide -1;
 } else{
  currentSlide--;
  }


goToSlide(currentSlide);


}

btnLeft.addEventListener('click', previousSlide);


// arrow key functionality

document.addEventListener('keydown', function(e){

  console.log(e.keyCode);     //   <- 37     -> 39

  if(e.keyCode === 37) {
    previousSlide();
  } else if(e.keyCode === 39) {
      nextSlide();
    }
 

})




// DOMContentLoaded and Load      --  there is also the BEFOREUNLOAD


window.addEventListener('beforeunload', function(e){

  console.log(e);

  e.returnValue = '';   // necessary for historical reasons (e.returnValue)

});
