



const animateddiv1 = document.getElementById('animation1');
const animateddiv2 = document.getElementById('animation2');
const image = document.getElementById('log');

animateddiv1.addEventListener('animationiteration', 
()=>{
    animateddiv1.style.opacity = 0;
    animateddiv1.classList.toggle('slide-out-fwd-center');
    
    animateddiv2.classList.toggle('slide-in-fwd-center');
   // image.src = '/assets/images/girl.jpg';
    animateddiv2.style.opacity = 1;

    setTimeout(()=>  {
    
        animateddiv1.classList.toggle('slide-out-fwd-center');
        animateddiv1.style.opacity = 0;
        
        animateddiv2.classList.toggle('slide-in-fwd-center');
       image.src = '/assets/images/bussnesman.png';
animateddiv2.style.opacity = 0;
    },10000)
}
)

setTimeout(
    function(){
        
    }
)


var s = $("#sticker");
var pos = s.position();
$(window).on('scroll', function() {
  var windowpos = $(window).scrollTop() > 300;
  if (windowpos > pos.top) {
    s.addClass("stick");
  } else {
    s.removeClass("stick");
  }
});
