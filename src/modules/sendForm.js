const sendForm = (formSelect) => {
    const errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка ...',
        successMesage = 'Спасибо! Мы скоро с Вами свяжемся';

    const form = document.getElementById(formSelect);
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white';

    const phoneInputs = form.querySelector('[type="tel"]');
    phoneInputs.addEventListener('input', () =>{
        phoneInputs.value = phoneInputs.value.replace(/[^\d+]/g, '');
        //(/(?<!^)\+|[^\d+]/g, '');
    });

    const textInputs = form.querySelector('[type="text"]');
    textInputs.addEventListener('input', () =>{
        textInputs.value = textInputs.value.replace(/[^А-Яа-я\s]/g, '');
    });

    const messageInputs = document.querySelector('#form2-message');
    messageInputs.addEventListener('input', () =>{
        messageInputs.value = messageInputs.value.replace(/[^А-Яа-я\s]/g, '');
    });



    form.addEventListener('submit', (event) => {

        event.preventDefault();
        form.appendChild(statusMessage);
        if (!statusMessage.textContent) {
            statusMessage.insertAdjacentHTML('beforeend', '<img src="./images/5.gif">');
        } else {
            statusMessage.textContent = '';
            statusMessage.insertAdjacentHTML('beforeend', '<img src="./images/5.gif">');
        }

        const formData = new FormData(form);
        let body = {};

        for (let val of formData.entries()) {
            body[val[0]] = val[1];

        };

        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMesage;
                setTimeout(()=>{
                    statusMessage.remove();
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
                statusMessage.textContent = errorMessage;
                setTimeout(()=>{
                    statusMessage.remove();
                }, 5000);
            });

        const inputs = form.querySelectorAll('input');
        inputs.forEach((elem) => elem.value = '');

    });
    const postData = (body) => { 
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
};

export default sendForm;
