window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    //timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');


        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor((timeRemaining / 60 / 60));
            return {
                timeRemaining, hours, minutes, seconds
            };
        }

        function updateClock() {
            const timer = getTimeRemaining();

            function checkTime(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            timerHours.textContent = checkTime(timer.hours);
            timerMinutes.textContent = checkTime(timer.minutes);
            timerSeconds.textContent = checkTime(timer.seconds);

            if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(end);
            }
        }

        const end = setInterval(updateClock, 1000);
    }

    countTimer('20 july 20');


    // меню

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

    toggleMenu();



    // popup
    const popupContent = document.querySelector('.popup-content');
    const togglePopUp = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');

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

    togglePopUp();

    let count = 1;
    const animationPopup = () => {
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


    // табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {

            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {

                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });

            }
        });

    };
    tabs();

    //слайдер


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

    getDots();

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0;
        let interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;

            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });
        startSlide(1500);

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

    };
    slider();

    // смена картинок нашей команды
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
    changeFoto();

    // ограничиваем ввод в калькуляторе

    const enterCalcInput = () => {
        const inputCalc = document.querySelectorAll('.calc-item');

        inputCalc.forEach((item) => {
            item.addEventListener('input', () => {
                if (!item.matches('.calc-type')) {
                    item.value = item.value.replace(/\D/g, '');
                };
            });

        });

    };
    enterCalcInput();


    // калькулятор

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {

            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }



            if (typeValue && squareValue) {
                total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
            }
            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            // if(target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {
            // } также можно сравнить таргет с инпутами и селект
            if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
                countSum();
            }

        });

    };
    calc(100);

    // send-ajax-form

    const sendForm = (formSelect) => {
        const errorMessage = 'Что-то пошло не так',
            loadMessage = 'Загрузка ...',
            successMesage = 'Спасибо! Мы скоро с Вами свяжемся';

        const form = document.getElementById(formSelect);
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white';

        const phoneInputs = form.querySelector('[type="tel"]');
        phoneInputs.addEventListener('input', () =>{
            phoneInputs.value = phoneInputs.value.replace(/(?<!^)\+|[^\d+]/g, '');
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
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};

            for (let val of formData.entries()) {
                body[val[0]] = val[1];

            };
            postData(body, () => {
                statusMessage.textContent = successMesage;
            }, (error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });

            const inputs = form.querySelectorAll('input');
            inputs.forEach((elem) => elem.value = '');

        });
    };
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');

    const postData = (body, outputData, errorData) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {

            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                outputData();
            } else {
                errorData(request.status);
            }
        });
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
    };




});


