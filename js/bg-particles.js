const bgCanvas = document.getElementById("bg-particles");
const bgCtx = bgCanvas.getContext("2d");
let w = bgCanvas.width = window.innerWidth;
let h = bgCanvas.height = window.innerHeight;
window.addEventListener("resize",()=>{ w=bgCanvas.width=window.innerWidth; h=bgCanvas.height=window.innerHeight; });

const particles = [];
for(let i=0;i<120;i++){
  particles.push({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*1.5+0.5,
    dx: (Math.random()-0.5)*0.6,
    dy: (Math.random()-0.5)*0.6
  });
}

function animateParticles(){
  bgCtx.clearRect(0,0,w,h);
  for(let p of particles){
    bgCtx.beginPath();
    bgCtx.arc(p.x,p.y,p.r,0,Math.PI*2);
    bgCtx.fillStyle="rgba(200,200,200,0.4)";
    bgCtx.fill();

    p.x += p.dx; p.y += p.dy;

    // Wrap around
    if(p.x<0)p.x=w;
    if(p.x>w)p.x=0;
    if(p.y<0)p.y=h;
    if(p.y>h)p.y=0;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();
