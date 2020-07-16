const changeFoto = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');

    commandPhoto.forEach((item) => {
        const srcFoto = item.src;
        item.addEventListener('mouseenter', (e) => {
            event.target.src = event.target.dataset.img;
        });
        item.addEventListener('mouseout', (e) => {
            event.target.src = srcFoto;
        });
    });
};

export default changeFoto;