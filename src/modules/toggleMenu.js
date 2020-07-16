const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        body =  document.querySelector('body');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    body.addEventListener('click', (event) => {
        const target = event.target;
        if (target.closest('.menu')) {
            handlerMenu();
        } else if (target.closest('.active-menu') && target.tagName !== 'MENU') {
            handlerMenu();
        } else if (target.tagName !== 'MENU') {
            menu.classList.remove('active-menu');
        }
    });
};

export default toggleMenu;