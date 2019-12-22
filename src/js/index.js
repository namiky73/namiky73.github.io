import anime from 'animejs/lib/anime.es.js';
import Swiper from 'swiper';
import "./saas/style.scss";
import "./saas/arrow.scss";

// why?
// swiper.js does not work at first loading.
// when resizing window -> work well
// ?????

class Onigiri{
  constructor(){
    this.onigiri = document.getElementById("onigiri");
    this.onigiriW = this.onigiri.clientWidth;
    this.onigiriH = this.onigiri.clientHeight;
    this.rotDirection = 1;
  }

  move(x, y, rot=360, duration=1000, center=true, callback=()=>{}){

    let targetX = x;
    let targetY = y;
    if(center){
      targetX -= this.onigiriW/2;
      targetY -= this.onigiriH/2;
    }
    anime({
      targets: this.onigiri,
      translateX: {
        value: targetX, duration: duration, easing : 'linear'
      },
      translateY: {
        value: targetY, duration: duration, easing : 'linear'
      },
      rotate: {
        value: rot*this.rotDirection, duration: duration, easing: 'linear'
      },
      complete: () => {
        callback(x, y);
      }
    });  
    this.rotDirection *= -1;
  }

  appeal(){
    anime({
      targets: this.onigiri,
      translateX: {
        value: 0, duration: 1, easing : 'linear'
      },
      translateY: {
        value: 0, duration: 1, easing : 'linear'
      },
      rotate: {
        value: 20, duration: 100, easing: 'linear'
      },
      loop: 6,
      direction: 'alternate',
    });  
  }
}

class Nasuo{
  constructor(){
    this.nasuo = document.getElementById("who-my-img");
    this.fukidashi = document.getElementById("fukidashi");
    this.fukidashiDiv = document.getElementById("fukidashi-div");
    this.nasuoW = this.nasuo.clientWidth;
    this.nasuoH = this.nasuo.clientHeight;
    this.nasuoX;
    this.nasuoY;
    this.setPosition();
    window.addEventListener('resize', this.setPosition.bind(this), false);
  }

  setPosition(){
    const bcr = this.nasuo.getBoundingClientRect();
    this.nasuoX = bcr.left + window.pageXOffset;
    this.nasuoY = bcr.top + window.pageYOffset;
    console.log("aaa");
  }

  checkEatOnigiri(onigiriPosX, onigiriPosY){
    console.log(this.nasuoX, this.nasuoY, onigiriPosX, onigiriPosY);
    const flagX = (this.nasuoX < onigiriPosX && onigiriPosX < this.nasuoX + this.nasuoW);
    const flagY = (this.nasuoY < onigiriPosY && onigiriPosY < this.nasuoY + this.nasuoH);
    if( flagX && flagY ){
      this.eatOnigiri();
      return true;
    }
    else{
      // this.noOnigiri();
      return false;
    }
  }

  eatOnigiri(){
    this.fukidashi.innerText = "わーい \n わーい";
    anime({
      targets: this.nasuo,
      rotate: {
        value: 10, duration: 200, easing: 'linear'
      },
      loop: 2,
      direction: 'reverse',
    });  
  }

  noOnigiri(){
    this.fukidashi.innerText = "おなかが \n すいた...";
  }

}

class SkillOnigiri{
  constructor(onigiri){
    this.onigiri = onigiri;
    this.skillOnigiriDiv = document.getElementById("skill-onigiri-div");
    this.skillOnigiriImg = document.getElementById("skill-onigiri");
    this.skillOnigiriDivW;
    this.skillOnigiriDivH;
    this.skillOnigiriDivX;
    this.skillOnigiriDivY;
    this.setPosition();
    window.addEventListener('resize', this.setPosition.bind(this), false);
  }

  setPosition(){
    const bcr = this.skillOnigiriDiv.getBoundingClientRect();
    this.skillOnigiriDivX = bcr.left + window.pageXOffset;
    this.skillOnigiriDivY = bcr.top + window.pageYOffset;
    this.skillOnigiriDivW = this.skillOnigiriDiv.clientWidth;
    this.skillOnigiriDivH = this.skillOnigiriDiv.clientHeight;
  }

  checkInsertOnigiri(onigiriPosX, onigiriPosY){
    const flagX = (this.skillOnigiriDivX < onigiriPosX && onigiriPosX < this.skillOnigiriDivX + this.skillOnigiriDivW);
    const flagY = (this.skillOnigiriDivY < onigiriPosY && onigiriPosY < this.skillOnigiriDivY + this.skillOnigiriDivH);
    if( flagX && flagY ){
      this.setOnigiri();
      return true;
    }
    else{
      return false;
    }
  }

  setOnigiri(){
    console.log('insert');
    const bcr = this.skillOnigiriImg.getBoundingClientRect();
    const x = bcr.left + window.pageXOffset;
    const y = bcr.top + window.pageYOffset;
    this.onigiri.move(x, y, 0, 750, false, this.insertOnigiri.bind(this));
  }

  insertOnigiri(){
    // this.skillOnigiriImg.src = "./public/image/onigiri.png";
    // this.skillOnigiriImg.style.opacity = 1.0;
    const targetElem = document.getElementById("portfolio-title");
    const bcr = targetElem.getBoundingClientRect();
    const elemX = bcr.left + window.pageXOffset;
    const elemY = bcr.top + window.pageYOffset;
    const x = elemX + targetElem.clientWidth/2;
    const y = elemY + 200;
    console.log(x,y);
    this.onigiri.move(x, y, 3600, 1200, true, ()=>{} );
    this.appeal();
  }

  appeal(){
    anime({
      targets: this.skillOnigiriDiv,
      rotate: {
        value: 20, duration: 800, easing: 'easeInOutQuad'
      },
      loop: true,
      direction: 'alternate',
    });  
  }

}



class PageController{
  constructor(){
    this.setSliderFlag = false;

    this.nasuo = new Nasuo();
    console.log(this.nasuo);

    this.onigiri = new Onigiri();
    document.onclick = (e) => this.onigiri.move(e.pageX, e.pageY, 360, 1000, true, this.onigiriMoveCallback.bind(this));
    this.onigiri.appeal();

    this.skillOnigiri = new SkillOnigiri(this.onigiri);
  }

  onigiriMoveCallback(onigiriPosX, onigiriPosY){
    const eatOnigiriFlag = this.nasuo.checkEatOnigiri(onigiriPosX, onigiriPosY);
    if( eatOnigiriFlag ){
      this.showHiddenSections();
    }

    const insertOnigiriFlag = this.skillOnigiri.checkInsertOnigiri(onigiriPosX, onigiriPosY);
    if( insertOnigiriFlag ){
      this.showHiddenSections2();
    }
  }

  showHiddenSections(){
    const hiddenElems = document.getElementsByClassName("onigiri-hidden-area");
    for( const elem of hiddenElems ){
      elem.style.display = "block";
    }
    this.skillOnigiri.setPosition();
  }

  showHiddenSections2(){
    const hiddenElems = document.getElementsByClassName("onigiri-hidden-area-2");
    for( const elem of hiddenElems ){
      elem.style.display = "block";
    }
    this.setSlider();
  }

  setSlider(){
    if(this.setSliderFlag){
      return;
    }
    this.setSliderFlag = true;
    const mySwiper = new Swiper ('.swiper-container', {
      slidesPerView: 1,
      loop: true,
      breakpoints: {
        767: {
          slidesPerView: 3,
          spaceBetween: 0
        }
      },

      pagination: {
        el: '.swiper-pagination',
      },  
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },

      grabCursor: true,
      centeredSlides: true,

      // effect: 'coverflow',
      // coverflowEffect: {
      //   rotate: 50,
      //   stretch: 10,
      //   depth: 50,
      //   modifier: 1,
      //   slideShadows : true,
      // },
    })
  }

}

window.onload = () => {
  const pageController = new PageController();
}