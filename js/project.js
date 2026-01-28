const projectOverlay = document.querySelector(".project-view");
const title = document.getElementById("project-title");
const desc = document.getElementById("project-desc");
const closeBtn = document.querySelector(".close");

const projectData = {
  p1:{ title:"Proyecto Uno", desc:"Experiencia web centrada en interacción y diseño limpio." },
  p2:{ title:"Proyecto Dos", desc:"Sistema UI experimental con animaciones y microinteracciones." },
  p3:{ title:"Proyecto Tres", desc:"Proyecto enfocado en motion y narrativa visual." }
};

document.querySelectorAll(".projects li").forEach(item=>{
  item.onclick = () => {
    const data = projectData[item.dataset.project];
    title.textContent = data.title;
    desc.textContent = data.desc;
    projectOverlay.classList.add("active");
    gsap.fromTo(".project-content",{y:40,opacity:0},{y:0,opacity:1,duration:0.6,ease:"power3.out"});
  };
});

closeBtn.onclick = ()=> projectOverlay.classList.remove("active");
