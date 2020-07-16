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

export default enterCalcInput;