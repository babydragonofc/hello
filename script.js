const verity = document.getElementById('verity');
const message = document.getElementById('message');

veritySay("HELLO! I am Verity, your personal assistent", 5)

function veritySay(text, sec) {
    verity.classList.add('saying')
    message.textContent = text;
    setTimeout(() => {
        verity.classList.remove('saying')
    }, sec * 1000);
}

const siteVer = 4;

setTimeout(() => {
    if (siteVer != localStorage.getItem("siteVer")) alert("Novas Mudanças ^^")
    localStorage.setItem("siteVer", siteVer)
}, 300);

document.addEventListener("DOMContentLoaded", function() {
  [...document.querySelectorAll("wonder")].forEach((el) => {    
      let text = el.textContent
      el.innerHTML = ""
  
      let palavra = [...text]
      let letras =[]
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

     window.scrollTo({
        top:0,
        behavior: 'smooth'
    });
});


document.querySelectorAll(".rainbow").forEach(el => {

    let text = el.textContent
    el.innerHTML = ""

    let palavra = [...text]
    let letras =[]
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

let activeCursor = localStorage.getItem("cursor") || 0;
setCursor(activeCursor);


function setCursor(id) {
    activeCursor = id;
    localStorage.setItem("cursor", id)
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


/*
pixelar()
async function pixelar(){

    const div = document.getElementById("mp3_scream");
    const canvas = document.getElementById("pixelCanvas");

    // captura a div
    const captura = await html2canvas(div,{
        backgroundColor:null
    });

    const fator = 8;

    const w = captura.width;
    const h = captura.height;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");

    // desativa suavização
    ctx.imageSmoothingEnabled = false;

    // canvas temporário em baixa resolução
    const temp = document.createElement("canvas");
    temp.width = w / fator;
    temp.height = h / fator;

    const tctx = temp.getContext("2d");
    tctx.imageSmoothingEnabled = false;

    // reduz
    tctx.drawImage(captura,0,0,temp.width,temp.height);

    // aumenta novamente
    ctx.drawImage(temp,0,0,temp.width,temp.height,0,0,w,h);
}*/

const audioPlayer = document.getElementById('audioPlayer');

const musicList = [
    {audio: "music/audios/24radio.mp3", img: "https://i.scdn.co/image/ab67616d0000e1a3c82af8cf3906e11b8164765f", title: "", artist: ""},
    {audio: "music/audios/anjo.mp3", img:"", title:"Anjo de papel mache", artist:"Rodrigo Zin"},
    {audio: "music/audios/lauro.mp3", img:"", title:"", artist:"AYAKASHI"},
    {audio: "music/audios/photo.mp3", img: "", title:"Photophomia", artist:"AYAKASHI"},
]
let isPlaying = false;
let currentMusic = 0;

function playMusic() { 
    isPlaying = !isPlaying
    if (isPlaying) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

function nextMusic() { 
    ++currentMusic;
    if (currentMusic >= musicList.length) currentMusic = 0;

    audioPlayer.src = musicList[currentMusic].audio;
    audioPlayer.play()
}

function prevMusic() {
    --currentMusic;
    if (currentMusic < 0) currentMusic = musicList.length - 1

    audioPlayer.src = musicList[currentMusic].audio;
    audioPlayer.play()
}

const mp3_place = document.getElementById('mp3_place')

const mp3 = document.getElementById('mp3')