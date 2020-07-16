'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import getDots from './modules/getDots';
import slider from './modules/slider';
import changeFoto from './modules/changeFoto';
import enterCalcInput from './modules/enterCalcInput';
import calc from './modules/calc';
import sendForm from './modules/sendForm';




//timer
countTimer('20 july 20');
// меню
toggleMenu();
// popup
togglePopUp();

// табы
tabs();
//слайдер
getDots();
slider();
// смена картинок нашей команды
changeFoto();
// ограничиваем ввод в калькуляторе
enterCalcInput();
// калькулятор
calc(100);
// send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');
