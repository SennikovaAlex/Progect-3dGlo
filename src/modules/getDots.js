function getDots() {
    const portfolioContent = document.querySelector('.portfolio-content');

    let dots = document.createElement('ul');
    dots.classList.add('portfolio-dots');
    portfolioContent.appendChild(dots);

    const slide = document.querySelectorAll('.portfolio-item');
    for (let i = 0; i < slide.length; i++) {
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dots.appendChild(dot);
    }
};

export default getDots;