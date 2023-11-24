import noUiSlider from 'nouislider';
import v from './../_vars.js';

export const rangeSlider = () => {
    const { LS, btnsShow, btnsThrowFilter } = v;
    const sliders = document.querySelectorAll('.range');

    if (sliders && sliders.length > 0) {
        sliders.forEach(slider => {
            noUiSlider.create(slider, {
                start: [100, 1000000],
                step: 100,
                connect: true,
                range: {
                    'min': [0],
                    'max': [1000000]
                },
            });

            slider.noUiSlider.on('update', (values, handle) => {
                const inputs = slider.previousElementSibling.querySelectorAll('[data-inp-range]');
                inputs[handle].value = Math.round(values[handle]);
            });
        });

        const saveInputsPrice = {}
        const inputsPrice = document.querySelectorAll('[data-inp-range]');

        inputsPrice.forEach(input => input.addEventListener('input', () => {
            savingThePrice(input);
        }));

        btnsShow.forEach(btn => btn.addEventListener('click', () => {
            const parentInputs = document.querySelector(btn.dataset.inpParent);

            if (parentInputs) {
                const inputs = parentInputs.querySelectorAll('[data-inp-range]');
                inputs.forEach(inp => savingThePrice(inp));
            }
        }));

        // Установка дефолтных значений по клику на кнопку
        //============================================================================================ 

        btnsThrowFilter.forEach(btn => btn.addEventListener('click', () => {

            const defStartPrice = 100;
            const defEndPrice = 10000000;
            
            sliders.forEach(slider => {
                const currentPrices = slider.noUiSlider.get();

                currentPrices[0] = defStartPrice;
                currentPrices[1] = defEndPrice;

                slider.noUiSlider.set(currentPrices);
            });

            inputsPrice.forEach(input => {
                if (input.dataset.inpRange == 0) input.value = defStartPrice;
                else input.value = defEndPrice;
            });
        }));

        //============================================================================================ 

        if (LS.getItem('saveInputsPrice')) {
            const objWithPrices = JSON.parse(LS.getItem('saveInputsPrice'));

            for (const key in objWithPrices) {
                sliders.forEach(slider => {
                    const newPrices =  slider.noUiSlider.get();
                    
                    newPrices[key] = objWithPrices[key];
                    slider.noUiSlider.set(newPrices);
                });
            }
        }

        function savingThePrice(input) {
            const id = input.dataset.inpRange;

            if (LS.getItem('saveInputsPrice')) {
                const saveData = JSON.parse(LS.getItem('saveInputsPrice'));

                saveData[id] = input.value;
                LS.setItem('saveInputsPrice', JSON.stringify(saveData));
            }
            else {
                saveInputsPrice[id] = input.value;
                LS.setItem('saveInputsPrice', JSON.stringify(saveInputsPrice));
            }
        }
    }
}