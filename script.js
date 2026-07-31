const siteVer = 3;

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
