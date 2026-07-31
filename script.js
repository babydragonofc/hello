const siteVer = 2;

setTimeout(() => {
    if (siteVer != localStorage.getItem("siteVer")) alert("Novas Mudanças ^^")
    localStorage.setItem("siteVer", siteVer)
}, 300);

document.addEventListener("DOMContentLoaded", function() {
  [...document.querySelectorAll("wonder")].forEach((el) => {    
      text = el.textContent
      el.innerHTML = ""
  
      palavra = [...text]
      letras =[]
      for (let i = 0; i < palavra.length; i++) {
          const l = document.createElement('span')
          l.textContent = palavra[i]
          el.appendChild(l)
          letras.push(l)
      }
  
      letras.forEach((letra, index) => {
          if (letra.textContent != " ") letra.style.display = "inline-block"
          letra.style.animation = "wonderMove 2s infinite ease-in-out"
          letra.style.animationDelay = index *100 + "ms"
      })
  
      if (el.classList.contains("rainbow"))rainbow(letras)
  })
});


document.querySelectorAll(".rainbow").forEach(el => {

    text = el.textContent
    el.innerHTML = ""

    palavra = [...text]
    letras =[]
    for (let i = 0; i < palavra.length; i++) {
        const l = document.createElement('span')
        l.textContent = palavra[i]
        el.appendChild(l)
        letras.push(l)
    }
    
    rainbow(letras)
});

function rainbow(letras) {

    function update() {
        const t = performance.now() / 20;

        letras.forEach((letra, i) => {
            letra.style.color = `hsl(${(t + i * 25) % 360} 100% 60%)`;
        });

        requestAnimationFrame(update);
    }

    update();
}

function scrollF(elId) {
    const elemento = document.getElementById(elId);
    const retangulo = elemento.getBoundingClientRect();
    const topoAbsoluto = retangulo.top + window.scrollY;
    console.log(elemento)
    window.scrollTo({
        top: topoAbsoluto,
        behavior: 'smooth'
    });
}

const cursor = document.querySelector('.cursor-animado');
const cursors = [
    {normal: "", select: ""},
    {normal: "NormalSelect.cur", select: "LinkSelect.cur"},
    {normal: "mikuCursor.gif", select: "mikuCursor2.gif"},
    {normal: "https://www.rw-designer.com/cursor-view/184230.png", select: "https://www.rw-designer.com/cursor-view/184231.png"}
]

let activeCursor = 0;

function setCursor(id) {
    activeCursor = id;

    if(id == 0) {
        cursor.style.display = "none";
        document.querySelector('body').style.cursor = "default";
        return;
    }

    cursor.style.display = "block";
    document.querySelector('body').style.cursor = "none";

    cursor.style.backgroundImage = "url(" + cursors[id].normal + ")";

}


document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX - cursor.offsetWidth / 2 + 5 }px`;
  cursor.style.top = `${e.pageY - cursor.offsetHeight / 2 + 5}px`;
});

document.querySelectorAll('button, a, .cursor-select').forEach(el => {
    el.addEventListener('mouseover', () => {
        cursor.style.backgroundImage = "url(" + cursors[activeCursor].select + ")";
    });
    el.addEventListener('mouseout', () => {
        console.log(cursors[activeCursor].normal)
        cursor.style.backgroundImage = "url(" + cursors[activeCursor].normal + ")";
    });

})