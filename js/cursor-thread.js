const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");
let w=canvas.width=window.innerWidth;
let h=canvas.height=window.innerHeight;

window.addEventListener("resize",()=>{ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; });

let points=[], MAX_POINTS=60;
let mouse={x:w/2,y:h/2};
let current={x:w/2,y:h/2};
let glowing=false;

const projectItems = document.querySelectorAll("#project-list li");
projectItems.forEach(item=>{
  item.addEventListener("mouseenter", ()=> glowing=true);
  item.addEventListener("mouseleave", ()=> glowing=false);
});

function animate(){
  ctx.clearRect(0,0,w,h);
  current.x += (mouse.x-current.x)*0.35;
  current.y += (mouse.y-current.y)*0.35;
  points.push({x:current.x, y:current.y});
  if(points.length>MAX_POINTS) points.shift();

  ctx.beginPath();
  for(let i=0;i<points.length-1;i++){
    const p=points[i], next=points[i+1];
    ctx.lineWidth = (glowing?1.2:0.6)*(i/points.length) + 0.2;
    ctx.strokeStyle = glowing? `rgba(255,200,50,${i/points.length})` : `rgba(255,50,50,${i/points.length})`;
    ctx.moveTo(p.x,p.y);
    ctx.lineTo(next.x,next.y);
    ctx.stroke();
  }
  requestAnimationFrame(animate);
}
animate();
