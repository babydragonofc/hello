const siteVer = 2;

setTimeout(() => {
    if (siteVer != localStorage.getItem("siteVer")) alert("Novas Mudanças ^^")
    localStorage.setItem("siteVer", siteVer)
}, 300);