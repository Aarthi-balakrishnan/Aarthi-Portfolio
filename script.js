/* ---- Content config: add a "github" or "demo" URL to a project and its button appears ---- */
const PROJECTS=[
{title:"AI-Based Smart Rainwater & Groundwater Replenishment System",badge:"Academic / Ongoing Project",
 desc:"A data-driven system designed to analyze rainfall, groundwater, weather, soil, and geographical datasets to support smart water-resource management.",
 problem:"Water-resource planning needs rainfall, groundwater, soil and terrain data analysed together to guide replenishment decisions.",
 tech:["Python","React.js","JavaScript","SQL","GIS"],
 features:["Environmental data analysis","Rainfall and groundwater-related insights","Data visualization dashboard","Water-resource recommendations","Frontend/backend API integration"],
 github:"",demo:""},
{title:"AI-Based Real-Time Phishing Detection Chrome Extension",badge:"Machine Learning · Browser Extension",
 desc:"A browser extension designed to analyze URL/webpage characteristics and identify potentially suspicious websites.",
 problem:"Users can fall for phishing links; this tool flags potentially suspicious websites while browsing.",
 tech:["Python","JavaScript","HTML","CSS","Flask","Scikit-learn"],
 features:["URL analysis","Suspicious website detection","Machine-learning prediction","Flask API integration","Browser extension interface"],
 github:"https://aarthi-balakrishnan.github.io/Phishing-website-detection/",ghLabel:"GitHub (Live)",demo:""}];
const SKILLS={"Programming":["Java","Python","JavaScript"],"Web Technologies":["HTML","CSS","JavaScript","Django","REST APIs"],"Databases":["MySQL","MongoDB","SQL"],
"Core Concepts":["Object-Oriented Programming","Data Structures","DBMS","Problem Solving"],"Tools":["Git","GitHub","VS Code","Chrome Extension API"],
"Soft Skills":["Communication","Analytical & Problem-Solving","Teamwork","Quick Learning & Adaptability","Creative & Flexible Thinking"]};

const $=s=>document.querySelector(s);
const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;");
$("#skillGrid").innerHTML=Object.entries(SKILLS).map(([k,v])=>`<article class="card reveal"><h3>${esc(k)}</h3><ul class="tags">${v.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></article>`).join("");
const btn=(href,label,primary)=>href?`<a class="btn btn-sm ${primary?"btn-primary":"btn-ghost"}" href="${href}" target="_blank" rel="noopener">${label}</a>`:"";
$("#projGrid").innerHTML=PROJECTS.map(p=>`<article class="card proj reveal">
<div class="top"><span class="badge">${esc(p.badge)}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
<div><h4>Problem solved</h4><p>${esc(p.problem)}</p></div>
<div><h4>Technologies</h4><ul class="tags">${p.tech.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>
<div><h4>Key features</h4><ul class="feat">${p.features.map(f=>`<li>${esc(f)}</li>`).join("")}</ul></div>
<div class="actions">${btn(p.github,p.ghLabel||"GitHub",true)}${btn(p.demo,"Live Demo",true)}</div></article>`).join("");

/* nav */
const links=$("#links"),menu=$("#menu");
menu.onclick=()=>{const o=links.classList.toggle("open");menu.setAttribute("aria-expanded",o)};
links.addEventListener("click",e=>{if(e.target.tagName==="A"){links.classList.remove("open");menu.setAttribute("aria-expanded","false")}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){links.classList.remove("open");menu.setAttribute("aria-expanded","false")}});
const secs=[...document.querySelectorAll("main section")],anchors=[...links.querySelectorAll("a")];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)anchors.forEach(a=>{const on=a.getAttribute("href")==="#"+e.target.id;a.classList.toggle("active",on);on?a.setAttribute("aria-current","true"):a.removeAttribute("aria-current")})}),{rootMargin:"-45% 0px -50% 0px"});
secs.forEach(s=>spy.observe(s));
/* reveal */
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rv.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach((el,i)=>{el.style.transitionDelay=(i%3)*60+"ms";rv.observe(el)});
/* theme */
const root=document.documentElement;
try{const t=localStorage.getItem("theme");if(t)root.dataset.theme=t}catch(e){}
$("#theme").onclick=()=>{const dark=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;
const n=dark?"light":"dark";root.dataset.theme=n;try{localStorage.setItem("theme",n)}catch(e){}};
/* form */
const f=$("#form");
const rules={n:v=>v.trim()?"":"Please enter your name.",e:v=>!v.trim()?"Please enter your email address.":/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?"":"Please enter a valid email address.",m:v=>v.trim().length<10?"Please write a message of at least 10 characters.":""};
const check=id=>{const el=$("#"+id),msg=rules[id](el.value);$("#"+id+"-e").textContent=msg;el.setAttribute("aria-invalid",!!msg);return !msg};
["n","e","m"].forEach(id=>$("#"+id).addEventListener("blur",()=>check(id)));
f.addEventListener("submit",e=>{e.preventDefault();const bad=["n","e","m"].filter(id=>!check(id));
 if(bad.length){$("#"+bad[0]).focus();$("#status").textContent="";return}
 const s=encodeURIComponent("Portfolio enquiry from "+$("#n").value.trim()),b=encodeURIComponent($("#m").value.trim()+"\n\n"+$("#n").value.trim()+" ("+$("#e").value.trim()+")");
 location.href=`mailto:aarthibalakrishnan06@gmail.com?subject=${s}&body=${b}`;
 $("#status").textContent="Opening your email app to send the message. Thank you for reaching out.";f.reset()});
