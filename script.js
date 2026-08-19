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
const music_img = document.getElementById('music-img')

const musicList = [
    {audio: "music/audios/24radio.mp3", img: "https://i.scdn.co/image/ab67616d0000e1a3c82af8cf3906e11b8164765f", title: "24 Radio", artist: ""},
    {audio: "music/audios/anjo.mp3", img:"https://i.scdn.co/image/ab67616d0000e1a35c5f2ab295f5f6bd63d6fe4c", title:"Anjo de papel mache", artist:"Rodrigo Zin"},
    {audio: "music/audios/lauro.mp3", img:"https://i.scdn.co/image/ab67616d0000e1a32206ae204a6434bebcf2b4b4", title:"No Fim do Labirinto", artist:"AYAKASHI"},
    {audio: "music/audios/photo.mp3", img: "https://i.scdn.co/image/ab67616d0000e1a31c3fcaecbd50c9e8969d5bac", title:"Photophomia", artist:"AYAKASHI"},
]
let isPlaying = false;
let currentMusic = 0;

playMusic()
setMusicImage()

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
    isPlaying = true
    setMusicImage()
}

function prevMusic() {
    --currentMusic;
    if (currentMusic < 0) currentMusic = musicList.length - 1

    audioPlayer.src = musicList[currentMusic].audio;
    audioPlayer.play()
    isPlaying = true
    setMusicImage()
}

function setMusicImage() {
    music_img.style.backgroundImage = `url(${musicList[currentMusic].img})`
}

const mp3_place = document.getElementById('mp3_place')

const mp3 = document.getElementById('mp3')


function prepareStickerParent(parent) {

    /* ==========================================
       SE NÃO FOR IMG
    ========================================== */

    if (
        !parent ||
        parent.tagName !== "IMG"
    ) {

        return parent;

    }


    /* ==========================================
       SE JÁ ESTIVER DENTRO DO WRAPPER
    ========================================== */

    if (
        parent.parentElement &&
        parent.parentElement.classList.contains(
            "sticker-image-parent"
        )
    ) {

        return parent.parentElement;

    }


    /* ==========================================
       CRIAR WRAPPER
    ========================================== */

    const img = parent;

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "sticker-image-parent";


    const rect =
        img.getBoundingClientRect();


    const computed =
        window.getComputedStyle(img);


    wrapper.style.position =
        "relative";


    wrapper.style.width =
        `${rect.width}px`;


    wrapper.style.height =
        `${rect.height}px`;


    wrapper.style.display =
        computed.display === "inline"
            ? "inline-block"
            : computed.display;


    /* ==========================================
       SUBSTITUI A IMAGEM PELO WRAPPER
    ========================================== */

    img.parentNode.insertBefore(
        wrapper,
        img
    );


    wrapper.appendChild(
        img
    );


    /* ==========================================
       IMAGEM OCUPA O WRAPPER
    ========================================== */

    img.style.display =
        "block";


    img.style.width =
        "100%";


    img.style.height =
        "100%";


    return wrapper;

}

function imagePlaceStart(
    imgLink,
    initialWidth = 100,
    initialHeight = 100
) {

    /* ==========================================
       ESTADO
    ========================================== */

    let width = initialWidth;
    let height = initialHeight;

    let x = 0;
    let y = 0;

    let rotation = 0;

    let anchorX = "center";
    let anchorY = "center";

    let relativeElement = null;

    let dragging = false;
    let selectingElement = false;

    let highlightedElement = null;

    let originalAspectRatio = null;
    let keepOriginalRatio = true;

    let dragOffsetX = 0;
    let dragOffsetY = 0;


    /* ==========================================
       CRIAR STICKER
    ========================================== */

    const sticker = document.createElement("div");

    sticker.className = "sticker";

    sticker.dataset.sticker = "true";

    sticker.style.position = "absolute";
    sticker.style.zIndex = "999999";

    sticker.style.width = `${width}px`;
    sticker.style.height = `${height}px`;

    sticker.style.touchAction = "none";
    sticker.style.userSelect = "none";

    sticker.style.cursor = "grab";


    /* ==========================================
       IMAGEM DO STICKER
    ========================================== */

    const image = document.createElement("img");

    image.src = imgLink;

    image.referrerPolicy = "no-referrer";

    image.draggable = false;

    image.style.width = "100%";
    image.style.height = "100%";

    image.style.display = "block";

    image.style.pointerEvents = "none";


    sticker.appendChild(image);

    document.body.appendChild(sticker);


    /* ==========================================
       PROPORÇÃO ORIGINAL DA IMAGEM
    ========================================== */

    image.addEventListener("load", () => {

        if (
            image.naturalWidth > 0 &&
            image.naturalHeight > 0
        ) {

            originalAspectRatio =
                image.naturalWidth /
                image.naturalHeight;


            if (keepOriginalRatio) {

                height =
                    width /
                    originalAspectRatio;

                updateSticker();

            }

        }

    });


    /* ==========================================
       ENVOLVER IMAGEM SELECIONADA EM UMA DIV
    ========================================== */

    function prepararImagemComoParent(img) {

        if (
            !img ||
            img.tagName !== "IMG"
        ) {
            return img;
        }


        /*
            Se já estiver dentro de um wrapper
            criado pelo sistema, reutiliza.
        */

        if (
            img.parentElement &&
            img.parentElement.classList.contains(
                "sticker-image-parent"
            )
        ) {

            return img.parentElement;

        }


        const rect =
            img.getBoundingClientRect();


        const wrapper =
            document.createElement("div");


        wrapper.className =
            "sticker-image-parent";


        wrapper.dataset.stickerImageParent =
            "true";


        const computedStyle =
            window.getComputedStyle(img);


        wrapper.style.position =
            "relative";


        wrapper.style.width =
            `${rect.width}px`;


        wrapper.style.height =
            `${rect.height}px`;


        if (
            computedStyle.display === "inline"
        ) {

            wrapper.style.display =
                "inline-block";

        }

        else {

            wrapper.style.display =
                computedStyle.display;

        }


        img.parentNode.insertBefore(
            wrapper,
            img
        );


        wrapper.appendChild(img);


        img.style.display = "block";

        img.style.width = "100%";

        img.style.height = "100%";


        return wrapper;

    }


    /* ==========================================
       GERAR SELETOR ÚNICO
    ========================================== */

    function createUniqueSelector(element) {

        if (!element) {
            return null;
        }


        /*
            ID
        */

        if (element.id) {

            return `#${CSS.escape(element.id)}`;

        }


        /*
            Identificador existente
        */

        if (element.dataset.stickerParent) {

            return `[data-sticker-parent="${element.dataset.stickerParent}"]`;

        }


        /*
            Tenta criar um caminho único
        */

        const path = [];

        let current = element;


        while (
            current &&
            current !== document.documentElement
        ) {

            let selector =
                current.tagName.toLowerCase();


            const classes =
                [...current.classList]
                    .filter(className => {

                        return (
                            !className.startsWith(
                                "image-place"
                            ) &&
                            className !== "sticker" &&
                            className !==
                                "sticker-image-parent"
                        );

                    })
                    .slice(0, 2);


            if (classes.length > 0) {

                selector +=
                    "." +
                    classes
                        .map(
                            className =>
                                CSS.escape(className)
                        )
                        .join(".");

            }


            const parent =
                current.parentElement;


            if (parent) {

                const sameTagElements =
                    [...parent.children]
                        .filter(
                            child =>
                                child.tagName ===
                                current.tagName
                        );


                if (
                    sameTagElements.length > 1
                ) {

                    const index =
                        sameTagElements.indexOf(
                            current
                        ) + 1;


                    selector +=
                        `:nth-of-type(${index})`;

                }

            }


            path.unshift(selector);


            const testSelector =
                path.join(" > ");


            try {

                const matches =
                    document.querySelectorAll(
                        testSelector
                    );


                if (
                    matches.length === 1 &&
                    matches[0] === element
                ) {

                    return testSelector;

                }

            }

            catch {}


            current = parent;

        }


        /*
            Último recurso
        */

        const uniqueId =
            `sticker-parent-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`;


        element.dataset.stickerParent =
            uniqueId;


        return `[data-sticker-parent="${uniqueId}"]`;

    }


    /* ==========================================
       PAINEL
    ========================================== */

    const panel = document.createElement("div");

    panel.className = "image-place-panel";


    panel.innerHTML = `

        <div class="image-place-header">

            <strong>STICKER EDITOR</strong>

            <button
                type="button"
                class="close-panel"
            >
                ×
            </button>

        </div>


        <!-- REFERÊNCIA -->

        <div class="image-place-section">

            <label>Posição relativa a</label>

            <select class="position-mode">

                <option value="page">
                    Página
                </option>

                <option value="element">
                    Elemento
                </option>

            </select>

        </div>


        <!-- ELEMENTO -->

        <div class="element-controls">

            <input
                type="text"
                class="element-selector"
                placeholder="Clique em Selecionar"
            >

            <button
                type="button"
                class="select-element"
            >
                Selecionar elemento
            </button>

        </div>


        <!-- ÂNCORA -->

        <div class="image-place-section">

            <label>Ponto de referência</label>

            <div class="anchor-preview">

                <button
                    type="button"
                    class="anchor-point top-left"
                    data-x="left"
                    data-y="top"
                    title="Canto superior esquerdo"
                ></button>

                <button
                    type="button"
                    class="anchor-point top-center"
                    data-x="center"
                    data-y="top"
                    title="Centro superior"
                ></button>

                <button
                    type="button"
                    class="anchor-point top-right"
                    data-x="right"
                    data-y="top"
                    title="Canto superior direito"
                ></button>


                <button
                    type="button"
                    class="anchor-point center-left"
                    data-x="left"
                    data-y="center"
                    title="Centro esquerdo"
                ></button>

                <button
                    type="button"
                    class="anchor-point center active"
                    data-x="center"
                    data-y="center"
                    title="Centro"
                ></button>

                <button
                    type="button"
                    class="anchor-point center-right"
                    data-x="right"
                    data-y="center"
                    title="Centro direito"
                ></button>


                <button
                    type="button"
                    class="anchor-point bottom-left"
                    data-x="left"
                    data-y="bottom"
                    title="Canto inferior esquerdo"
                ></button>

                <button
                    type="button"
                    class="anchor-point bottom-center"
                    data-x="center"
                    data-y="bottom"
                    title="Centro inferior"
                ></button>

                <button
                    type="button"
                    class="anchor-point bottom-right"
                    data-x="right"
                    data-y="bottom"
                    title="Canto inferior direito"
                ></button>

            </div>

        </div>


        <!-- POSIÇÃO -->

        <div class="image-place-section">

            <label>Posição</label>

            <div class="two-inputs">

                <div>

                    <span>X</span>

                    <input
                        type="number"
                        class="position-x"
                        value="0"
                    >

                </div>


                <div>

                    <span>Y</span>

                    <input
                        type="number"
                        class="position-y"
                        value="0"
                    >

                </div>

            </div>

        </div>


        <!-- TAMANHO -->

        <div class="image-place-section">

            <label>Tamanho</label>

            <div class="two-inputs">

                <div>

                    <span>W</span>

                    <input
                        type="number"
                        min="1"
                        class="image-width"
                        value="${width}"
                    >

                </div>


                <div>

                    <span>H</span>

                    <input
                        type="number"
                        min="1"
                        class="image-height"
                        value="${height}"
                    >

                </div>

            </div>


            <label class="keep-ratio-label">

                <input
                    type="checkbox"
                    class="keep-ratio"
                    checked
                >

                Manter proporção original

            </label>

        </div>


        <!-- ROTAÇÃO -->

        <div class="image-place-section">

            <label>Rotação</label>

            <div class="rotation-controls">

                <input
                    type="range"
                    class="rotation-range"
                    min="-180"
                    max="180"
                    value="0"
                >

                <input
                    type="number"
                    class="rotation-input"
                    value="0"
                >

                <span>°</span>

                <button
                    type="button"
                    class="reset-rotation"
                    title="Resetar rotação"
                >
                    ↺
                </button>

            </div>

        </div>


        <!-- CONTEÚDO -->

        <div class="image-place-section">

            <label>Conteúdo adicional</label>

            <textarea
                class="sticker-content"
                placeholder="Texto ou HTML"
            ></textarea>

        </div>


        <!-- BOTÕES -->

        <div class="image-place-buttons">

            <button
                type="button"
                class="reset-position"
            >
                Resetar posição
            </button>

            <button
                type="button"
                class="copy-position"
            >
                Copiar código
            </button>

        </div>


        <!-- CÓDIGO -->

        <textarea
            class="image-code"
            readonly
        ></textarea>

    `;


    document.body.appendChild(panel);


    /* ==========================================
       ELEMENTOS DA INTERFACE
    ========================================== */

    const positionMode =
        panel.querySelector(".position-mode");

    const elementControls =
        panel.querySelector(".element-controls");

    const elementSelector =
        panel.querySelector(".element-selector");

    const selectElementButton =
        panel.querySelector(".select-element");


    const anchorButtons =
        panel.querySelectorAll(".anchor-point");


    const xInput =
        panel.querySelector(".position-x");

    const yInput =
        panel.querySelector(".position-y");


    const widthInput =
        panel.querySelector(".image-width");

    const heightInput =
        panel.querySelector(".image-height");


    const keepRatio =
        panel.querySelector(".keep-ratio");


    const rotationRange =
        panel.querySelector(".rotation-range");

    const rotationInput =
        panel.querySelector(".rotation-input");

    const resetRotationButton =
        panel.querySelector(".reset-rotation");


    const stickerContent =
        panel.querySelector(".sticker-content");


    const resetButton =
        panel.querySelector(".reset-position");

    const copyButton =
        panel.querySelector(".copy-position");

    const closeButton =
        panel.querySelector(".close-panel");

    const code =
        panel.querySelector(".image-code");


    /* ==========================================
       ÂNCORA
    ========================================== */

    function getAnchorValues() {

        const horizontal = {

            left: "0%",
            center: "50%",
            right: "100%"

        };


        const vertical = {

            top: "0%",
            center: "50%",
            bottom: "100%"

        };


        return {

            left:
                horizontal[anchorX],

            top:
                vertical[anchorY]

        };

    }


    function getTranslateX() {

        if (anchorX === "left") {
            return "0%";
        }

        if (anchorX === "center") {
            return "-50%";
        }

        return "-100%";

    }


    function getTranslateY() {

        if (anchorY === "top") {
            return "0%";
        }

        if (anchorY === "center") {
            return "-50%";
        }

        return "-100%";

    }


    /* ==========================================
       ATUALIZAR STICKER
    ========================================== */

    function updateSticker() {

        const anchor =
            getAnchorValues();


        sticker.style.left =
            `calc(${anchor.left} + ${x}px)`;


        sticker.style.top =
            `calc(${anchor.top} + ${y}px)`;


        sticker.style.width =
            `${width}px`;


        sticker.style.height =
            `${height}px`;


        sticker.style.transform =
            `
            translate(
                ${getTranslateX()},
                ${getTranslateY()}
            )
            rotate(${rotation}deg)
            `;


        xInput.value =
            Math.round(x);

        yInput.value =
            Math.round(y);


        widthInput.value =
            Math.round(width);

        heightInput.value =
            Math.round(height);


        rotationRange.value =
            rotation;

        rotationInput.value =
            rotation;


        updateCode();

    }


    /* ==========================================
       MOVER PARA REFERÊNCIA
    ========================================== */

    function moveToReference() {

        if (
            positionMode.value === "element" &&
            relativeElement
        ) {

            const computed =
                window.getComputedStyle(
                    relativeElement
                );


            if (
                computed.position === "static"
            ) {

                relativeElement.style.position =
                    "relative";

            }


            relativeElement.appendChild(
                sticker
            );

        }

        else {

            document.body.appendChild(
                sticker
            );

        }


        updateSticker();

    }


    /* ==========================================
       CONTEÚDO DO STICKER
    ========================================== */

    function updateStickerContent() {

        let extra =
            sticker.querySelector(
                ".sticker-extra-content"
            );


        if (extra) {
            extra.remove();
        }


        const content =
            stickerContent.value;


        if (content.trim()) {

            extra =
                document.createElement("div");

            extra.className =
                "sticker-extra-content";

            extra.innerHTML =
                content;

            sticker.appendChild(extra);

        }


        updateCode();

    }


    /* ==========================================
       GERAR HTML INTERNO
    ========================================== */

    function getStickerInnerHTML() {

        const content =
            stickerContent.value.trim();


        let result =
`    <img
        src="${imgLink}"
        style="
            width: 100%;
            height: 100%;
            display: block;
        "
    >`;


        if (content) {

            result +=

`\n
    <div class="sticker-extra-content">
        ${content}
    </div>`;

        }


        return result;

    }


    /* ==========================================
       GERAR CÓDIGO
    ========================================== */

    function updateCode() {

        const anchor =
            getAnchorValues();


        const innerHTML =
            getStickerInnerHTML();


        const stickerHTML =
`<div
    class="sticker"
    style="
        position: absolute;

        width: ${Math.round(width)}px;
        height: ${Math.round(height)}px;

        left: calc(${anchor.left} + ${Math.round(x)}px);
        top: calc(${anchor.top} + ${Math.round(y)}px);

        transform:
            translate(${getTranslateX()}, ${getTranslateY()})
            rotate(${rotation}deg);

        z-index: 999999;
    "
>
${innerHTML}
</div>`;


        /* ======================================
           RELATIVO A ELEMENTO
        ====================================== */

        if (
            positionMode.value === "element" &&
            relativeElement
        ) {

            const selector =
                elementSelector.value;


            code.value =
`{
    let parent = document.querySelector(
        ${JSON.stringify(selector)}
    );

    if (parent) {

        /*
            Se o elemento for uma IMG,
            cria um container para ela.
        */

        if (parent.tagName === "IMG") {

            let wrapper =
                parent.parentElement;


            /*
                Se ainda não existir um wrapper,
                cria um.
            */

            if (
                !wrapper.classList.contains(
                    "sticker-image-parent"
                )
            ) {

                wrapper =
                    document.createElement("div");


                wrapper.className =
                    "sticker-image-parent";


                const rect =
                    parent.getBoundingClientRect();


                const computed =
                    getComputedStyle(parent);


                wrapper.style.position =
                    "relative";


                wrapper.style.width =
                    rect.width + "px";


                wrapper.style.height =
                    rect.height + "px";


                wrapper.style.display =
                    computed.display === "inline"
                        ? "inline-block"
                        : computed.display;


                parent.parentNode.insertBefore(
                    wrapper,
                    parent
                );


                wrapper.appendChild(
                    parent
                );


                parent.style.display =
                    "block";


                parent.style.width =
                    "100%";


                parent.style.height =
                    "100%";

            }


            parent = wrapper;

        }


        /*
            Garante que o elemento seja
            referência para position:absolute.
        */

        if (
            getComputedStyle(parent).position ===
            "static"
        ) {

            parent.style.position =
                "relative";

        }


        parent.insertAdjacentHTML(
            "beforeend",
            \`${stickerHTML}\`
        );

    }
}`;


            return;

        }


        /* ======================================
           RELATIVO À PÁGINA
        ====================================== */

        code.value =
`document.body.insertAdjacentHTML(
    "beforeend",
    \`${stickerHTML}\`
);`;

    }


    /* ==========================================
       MODO PÁGINA / ELEMENTO
    ========================================== */

    positionMode.addEventListener(
        "change",
        () => {

            if (
                positionMode.value === "page"
            ) {

                elementControls.style.display =
                    "none";


                relativeElement =
                    null;


                document.body.appendChild(
                    sticker
                );

            }

            else {

                elementControls.style.display =
                    "block";

            }


            updateSticker();

        }
    );


    elementControls.style.display =
        "none";


    /* ==========================================
       INICIAR SELEÇÃO
    ========================================== */

    selectElementButton.addEventListener(
        "click",
        () => {

            selectingElement = true;


            selectElementButton.textContent =
                "Clique em um elemento...";


            panel.style.pointerEvents =
                "none";


            sticker.style.pointerEvents =
                "none";


            document.body.style.cursor =
                "crosshair";

        }
    );


    /* ==========================================
       HIGHLIGHT
    ========================================== */

    document.addEventListener(
        "pointermove",
        event => {

            if (!selectingElement) {
                return;
            }


            const element =
                document.elementFromPoint(
                    event.clientX,
                    event.clientY
                );


            if (!element) {
                return;
            }


            if (
                highlightedElement &&
                highlightedElement !== element
            ) {

                highlightedElement.classList.remove(
                    "image-place-highlight"
                );

            }


            highlightedElement =
                element;


            highlightedElement.classList.add(
                "image-place-highlight"
            );

        }
    );


        /* ==========================================
        CONFIRMAR ELEMENTO
        ========================================== */

        document.addEventListener(
            "pointerdown",
            event => {

                if (!selectingElement) {
                    return;
                }


                event.preventDefault();
                event.stopPropagation();


                let element =
                    document.elementFromPoint(
                        event.clientX,
                        event.clientY
                    );


                if (!element) {
                    return;
                }


                /* ======================================
                PARAR MODO DE SELEÇÃO
                ====================================== */

                selectingElement = false;


                panel.style.pointerEvents =
                    "";


                sticker.style.pointerEvents =
                    "";


                document.body.style.cursor =
                    "";


                selectElementButton.textContent =
                    "Selecionar elemento";


                /* ======================================
                REMOVER HIGHLIGHT
                ====================================== */

                if (highlightedElement) {

                    highlightedElement.classList.remove(
                        "image-place-highlight"
                    );

                }


                highlightedElement =
                    null;


                /* ======================================
                CRIAR SELETOR
                ====================================== */

                let selector;


                /* ======================================
                SE FOR UMA IMAGEM
                ====================================== */

                if (
                    element.tagName === "IMG"
                ) {

                    /*
                        Primeiro salva o seletor da IMG.

                        A imagem ainda existe neste momento.
                    */

                    selector =
                        createUniqueSelector(
                            element
                        );


                    /*
                        Depois transforma a IMG
                        em um container.
                    */

                    element =
                        prepararImagemComoParent(
                            element
                        );

                }


                /* ======================================
                QUALQUER OUTRO ELEMENTO
                ====================================== */

                else {

                    selector =
                        createUniqueSelector(
                            element
                        );

                }


        /* ======================================
           SALVAR REFERÊNCIA
        ====================================== */

        relativeElement =
            element;


        elementSelector.value =
            selector;


        positionMode.value =
            "element";


        x = 0;
        y = 0;


        moveToReference();

    },
    true
);


    /* ==========================================
       SELETOR MANUAL
    ========================================== */

    elementSelector.addEventListener(
        "change",
        () => {

            try {

                let element =
                    document.querySelector(
                        elementSelector.value
                    );


                if (!element) {

                    alert(
                        "Elemento não encontrado."
                    );

                    return;

                }


                /*
                    Se for IMG, salva o seletor
                    ANTES de criar o wrapper.
                */

                if (
                    element.tagName === "IMG"
                ) {

                    const selector =
                        createUniqueSelector(
                            element
                        );


                    element =
                        prepararImagemComoParent(
                            element
                        );


                    elementSelector.value =
                        selector;

                }


                relativeElement =
                    element;


                positionMode.value =
                    "element";


                x = 0;
                y = 0;


                moveToReference();

            }

            catch {

                alert(
                    "Seletor inválido."
                );

            }

        }
    );


    /* ==========================================
       SELEÇÃO DE ÂNCORA
    ========================================== */

    anchorButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    anchorX =
                        button.dataset.x;

                    anchorY =
                        button.dataset.y;


                    anchorButtons.forEach(
                        btn => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    x = 0;
                    y = 0;


                    updateSticker();

                }
            );

        }
    );


    /* ==========================================
       POSIÇÃO X
    ========================================== */

    xInput.addEventListener(
        "input",
        () => {

            x =
                Number(xInput.value) || 0;


            updateSticker();

        }
    );


    /* ==========================================
       POSIÇÃO Y
    ========================================== */

    yInput.addEventListener(
        "input",
        () => {

            y =
                Number(yInput.value) || 0;


            updateSticker();

        }
    );


    /* ==========================================
       LARGURA
    ========================================== */

    widthInput.addEventListener(
        "input",
        () => {

            width =
                Math.max(
                    1,
                    Number(widthInput.value) || 1
                );


            if (
                keepOriginalRatio &&
                originalAspectRatio
            ) {

                height =
                    width /
                    originalAspectRatio;

            }


            updateSticker();

        }
    );


    /* ==========================================
       ALTURA
    ========================================== */

    heightInput.addEventListener(
        "input",
        () => {

            height =
                Math.max(
                    1,
                    Number(heightInput.value) || 1
                );


            if (
                keepOriginalRatio &&
                originalAspectRatio
            ) {

                width =
                    height *
                    originalAspectRatio;

            }


            updateSticker();

        }
    );


    /* ==========================================
       MANTER PROPORÇÃO
    ========================================== */

    keepRatio.addEventListener(
        "change",
        () => {

            keepOriginalRatio =
                keepRatio.checked;


            if (
                keepOriginalRatio &&
                originalAspectRatio
            ) {

                height =
                    width /
                    originalAspectRatio;


                updateSticker();

            }

        }
    );


    /* ==========================================
       ROTAÇÃO
    ========================================== */

    rotationRange.addEventListener(
        "input",
        () => {

            rotation =
                Number(rotationRange.value);


            updateSticker();

        }
    );


    rotationInput.addEventListener(
        "input",
        () => {

            rotation =
                Number(rotationInput.value) || 0;


            updateSticker();

        }
    );


    /* ==========================================
       RESETAR ROTAÇÃO
    ========================================== */

    resetRotationButton.addEventListener(
        "click",
        () => {

            rotation = 0;

            updateSticker();

        }
    );


    /* ==========================================
       CONTEÚDO ADICIONAL
    ========================================== */

    stickerContent.addEventListener(
        "input",
        updateStickerContent
    );


    /* ==========================================
       COMEÇAR DRAG
    ========================================== */

    sticker.addEventListener(
        "pointerdown",
        event => {

            if (selectingElement) {
                return;
            }


            dragging = true;


            sticker.setPointerCapture(
                event.pointerId
            );


            const rect =
                sticker.getBoundingClientRect();


            dragOffsetX =
                event.clientX -
                (
                    rect.left +
                    rect.width / 2
                );


            dragOffsetY =
                event.clientY -
                (
                    rect.top +
                    rect.height / 2
                );


            sticker.style.cursor =
                "grabbing";


            sticker.classList.add(
                "dragging"
            );

        }
    );


    /* ==========================================
       MOVER STICKER
    ========================================== */

    document.addEventListener(
        "pointermove",
        event => {

            if (!dragging) {
                return;
            }


            let anchorPixelX = 0;
            let anchorPixelY = 0;


            if (
                positionMode.value === "element" &&
                relativeElement
            ) {

                const rect =
                    relativeElement.getBoundingClientRect();


                if (
                    anchorX === "center"
                ) {

                    anchorPixelX =
                        rect.width / 2;

                }

                else if (
                    anchorX === "right"
                ) {

                    anchorPixelX =
                        rect.width;

                }


                if (
                    anchorY === "center"
                ) {

                    anchorPixelY =
                        rect.height / 2;

                }

                else if (
                    anchorY === "bottom"
                ) {

                    anchorPixelY =
                        rect.height;

                }


                x =
                    event.clientX -
                    rect.left -
                    anchorPixelX -
                    dragOffsetX;


                y =
                    event.clientY -
                    rect.top -
                    anchorPixelY -
                    dragOffsetY;

            }

            else {

                const pageWidth =
                    Math.max(
                        document.body.scrollWidth,
                        document.documentElement.scrollWidth
                    );


                const pageHeight =
                    Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight
                    );


                if (
                    anchorX === "center"
                ) {

                    anchorPixelX =
                        pageWidth / 2;

                }

                else if (
                    anchorX === "right"
                ) {

                    anchorPixelX =
                        pageWidth;

                }


                if (
                    anchorY === "center"
                ) {

                    anchorPixelY =
                        pageHeight / 2;

                }

                else if (
                    anchorY === "bottom"
                ) {

                    anchorPixelY =
                        pageHeight;

                }


                x =
                    event.pageX -
                    anchorPixelX -
                    dragOffsetX;


                y =
                    event.pageY -
                    anchorPixelY -
                    dragOffsetY;

            }


            updateSticker();

        }
    );


    /* ==========================================
       TERMINAR DRAG
    ========================================== */

    document.addEventListener(
        "pointerup",
        () => {

            if (!dragging) {
                return;
            }


            dragging = false;


            sticker.style.cursor =
                "grab";


            sticker.classList.remove(
                "dragging"
            );

        }
    );


    /* ==========================================
       RESETAR POSIÇÃO
    ========================================== */

    resetButton.addEventListener(
        "click",
        () => {

            x = 0;
            y = 0;

            updateSticker();

        }
    );


    /* ==========================================
       COPIAR CÓDIGO
    ========================================== */

    copyButton.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    code.value
                );


                const originalText =
                    copyButton.textContent;


                copyButton.textContent =
                    "Copiado!";


                setTimeout(
                    () => {

                        copyButton.textContent =
                            originalText;

                    },
                    1500
                );

            }

            catch {

                alert(
                    "Não foi possível copiar o código."
                );

            }

        }
    );


    /* ==========================================
       FECHAR EDITOR
    ========================================== */

    closeButton.addEventListener(
        "click",
        () => {

            if (highlightedElement) {

                highlightedElement.classList.remove(
                    "image-place-highlight"
                );

            }


            sticker.remove();

            panel.remove();

        }
    );


    /* ==========================================
       INICIALIZAÇÃO
    ========================================== */

    updateSticker();


    /* ==========================================
       RETORNO
    ========================================== */

    return {

        sticker,

        image,

        panel,


        getPosition() {

            return {

                x,
                y,

                width,
                height,

                rotation,

                anchorX,
                anchorY,

                relativeElement

            };

        },


        setPosition(newX, newY) {

            x =
                Number(newX) || 0;

            y =
                Number(newY) || 0;


            updateSticker();

        },


        setRotation(value) {

            rotation =
                Number(value) || 0;


            updateSticker();

        },


        addContent(html) {

            const extra =
                document.createElement("div");


            extra.className =
                "sticker-extra-content";


            extra.innerHTML =
                html;


            sticker.appendChild(
                extra
            );


            updateCode();

        }

    };

}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard successfully!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

document.querySelector("#titleHeader").style.position = "relative";
document.querySelector("#titleHeader").insertAdjacentHTML(
    "beforeend",
    `<img
    referrerpolicy="no-referrer"
    src="https://i.imgur.com/nErLATw.png"
    style="
        position: absolute;
        width: 150px;
        height: 150px;
        left: calc(0% + -59px);
        top: calc(0% + -63px);
        transform: translate(0%, 0%);
    "
>`
);

document.querySelector("#flags").style.position = "relative";
document.querySelector("#flags").insertAdjacentHTML(
    "beforeend",
    `<img
    referrerpolicy="no-referrer"
    src="https://i.imgur.com/k2CgKns_d.webp"
    style="
        position: absolute;
        width: 100px;
        height: 100px;
        left: calc(0% + -41px);
        top: calc(100% + 44px);
        transform: translate(0%, -100%);
    "
>`
);

document.querySelector("#cursors").style.position = "relative";
document.querySelector("#cursors").insertAdjacentHTML(
    "beforeend",
    `<img
    src="https://i.imgur.com/Z4OTMdn_d.webp"
    style="
        position: absolute;
        width: 100px;
        height: 100px;

        left: calc(0% + -32px);
        top: calc(100% + 24px);

        transform:
            translate(
                0%,
                -100%
            )
            rotate(16deg);
    "
>`
);

{
    let parent = document.querySelector(
        "article.width-auto:nth-of-type(2) > div:nth-of-type(7) > div"
    );

    if (parent) {

        parent = prepareStickerParent(parent);

        parent.insertAdjacentHTML(
            "beforeend",
            `<div
    class="sticker"
    style="
        position: absolute;

        width: 100px;
        height: 100px;

        left: calc(0% + -40px);
        top: calc(100% + 32px);

        transform:
            translate(0%, -100%)
            rotate(-16deg);

        z-index: 999999;
    "
>
    <img
        src="https://i.imgur.com/Z4OTMdn_d.webp"
        style="
            width: 100%;
            height: 100%;
            display: block;
        "
    >
</div>`
        );

    }
}

{
    let parent = document.querySelector(
        "div:nth-of-type(7) > img:nth-of-type(1)"
    );

    if (parent) {

        /*
            Se o elemento for uma IMG,
            cria um container para ela.
        */

        if (parent.tagName === "IMG") {

            let wrapper =
                parent.parentElement;


            /*
                Se ainda não existir um wrapper,
                cria um.
            */

            if (
                !wrapper.classList.contains(
                    "sticker-image-parent"
                )
            ) {

                wrapper =
                    document.createElement("div");


                wrapper.className =
                    "sticker-image-parent";


                const rect =
                    parent.getBoundingClientRect();


                const computed =
                    getComputedStyle(parent);


                wrapper.style.position =
                    "relative";


                wrapper.style.width =
                    rect.width + "px";


                wrapper.style.height =
                    rect.height + "px";


                wrapper.style.display =
                    computed.display === "inline"
                        ? "inline-block"
                        : computed.display;


                parent.parentNode.insertBefore(
                    wrapper,
                    parent
                );


                wrapper.appendChild(
                    parent
                );


                parent.style.display =
                    "block";


                parent.style.width =
                    "100%";


                parent.style.height =
                    "100%";

            }


            parent = wrapper;

        }


        /*
            Garante que o elemento seja
            referência para position:absolute.
        */

        if (
            getComputedStyle(parent).position ===
            "static"
        ) {

            parent.style.position =
                "relative";

        }


        parent.insertAdjacentHTML(
            "beforeend",
            `<div
    class="sticker"
    style="
        position: absolute;

        width: 100px;
        height: 100px;

        left: calc(0% + -41px);
        top: calc(100% + 27px);

        transform:
            translate(0%, -100%)
            rotate(-23deg);

        z-index: 999999;
    "
>
    <img
        src="https://i.imgur.com/Z4OTMdn_d.webp"
        style="
            width: 100%;
            height: 100%;
            display: block;
        "
    >
</div>`
        );

    }
}