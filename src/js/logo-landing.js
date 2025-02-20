function ajustarAltura() {
    const alturaVisible = window.innerHeight;
    document.querySelector('.container').style.height = `${alturaVisible}px`; 
}

window.addEventListener('load', ajustarAltura);
window.addEventListener('resize', ajustarAltura);