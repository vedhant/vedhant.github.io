var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth*0.92;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

colors = ['#FFA361','#FF7A52','#FF633B','#FF4F3D','#FC2D28'];
if(window.matchMedia("(max-width: 700px)").matches){
  var d = innerHeight/18;
}
else{
  var d = innerHeight/9;

}

function Circle(x,y,radius,dx,dy){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colors[Math.floor(Math.random()*colors.length)]
  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = function(){
    if(this.x + this.radius > innerWidth*0.92 || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

// var mouse = {
//   x: undefined,
//   y:undefined
// };

var circles = [];
for(var i = 0;i<200;++i){
  x = Math.random()*window.innerWidth*0.92;
  y = Math.random()*window.innerHeight;
  dx = (Math.random()-0.5)*3;
  dy = (Math.random()-0.5)*3;
  radius = 0.1;
  circles.push(new Circle(x,y,radius,dx,dy));
}

function drawLine(c1, c2){


  if(c1.x-c2.x > 0){
    var del_x = c1.x-c2.x;
  }
  else {
    var del_x = -(c1.x-c2.x);
  }
  if(c1.y-c2.y > 0){
    var del_y = c1.y-c2.y;
  }
  else {
    var del_y = -(c1.y-c2.y);
  }
  var intensity = (2*d-(del_x+del_y))/2*d;

  if(del_x<d && del_y<d){
    var intensity = (2*d-(del_x+del_y))/(2*d);
    c.beginPath();
    c.moveTo(c1.x, c1.y);
    c.lineTo(c2.x, c2.y);
    c.strokeStyle = c2.color;
    c.lineWidth = intensity*4;
    c.stroke();
  }
}

// window.addEventListener('mousemove',function(e){
//   mouse.x = e.x;
//   mouse.y = e.y;
// });

window.addEventListener('resize',function(){
  canvas.width = window.innerWidth*0.92;
  canvas.height = window.innerHeight;
});

function animate(){
  c.clearRect(0,0,innerWidth*0.92,innerHeight);
  requestAnimationFrame(animate);
  for(var i = 0;i<circles.length;++i){
    circles[i].update();
    // if(mouse.x){
    //   drawLine(mouse,circles[i]);
    // }
  }
  for(var i = 0;i<circles.length;++i){
    for(var j = i+1;j<circles.length;++j){
      drawLine(circles[i],circles[j]);
    }
  }
}

animate();
