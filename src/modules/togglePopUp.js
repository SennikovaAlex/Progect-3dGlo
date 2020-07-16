const togglePopUp = () => {
    const popupContent = document.querySelector('.popup-content');
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');

    let count = 1;
    const animationPopup = () => {
        
        const popupContent = document.querySelector('.popup-content');
        let clientWidth = document.documentElement.clientWidth;
        let goAnimation;

        count += 1;

        popupContent.style.left = count + '%';

        if (count < 38 && clientWidth > 768) {
            goAnimation = setTimeout(animationPopup, 15);
        } else if (clientWidth < 768) {
            popupContent.style.left = 23 + '%';
        } else {
            clearInterval(goAnimation);
            count = 1;
        }
    };

    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {

            popup.style.display = 'block';
            animationPopup();
            
            

        });
    });

    popup.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popup.style.display = 'none';
            }
        }
    });
    
 

    
};

export default togglePopUp;

// let count = 1;
//     const animationPopup = () => {
//         let clientWidth = document.documentElement.clientWidth;
//         let goAnimation;

//         count += 1;

//         popupContent.style.left = count + '%';

//         if (count < 38 && clientWidth > 768) {
//             goAnimation = setTimeout(animationPopup, 15);
//         } else if (clientWidth < 768) {
//             popupContent.style.left = 23 + '%';
//         } else {
//             clearInterval(goAnimation);
//             count = 1;
//         }
//     };