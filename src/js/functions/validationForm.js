import v from '../_vars.js';
import IMask from 'imask';
import emailjs from '@emailjs/browser';

export const valid = (form) => {
    const { LS, formLoad } = v;
    const red = '#fddde6';
    const loadGif = './img/loading.gif';

    const inputs = [...form];
    const btnSubmit = form.querySelector('#sub-btn');

    // Функция для установки по умолчанию атрибута для валидации
    //==========================================================

    function installAllInputsDefIndexValid() {
        inputs.forEach(input => {
                if (input.type != 'submit') input.setAttribute('is-valid', 0);
        });
    }

    //==========================================================

    installAllInputsDefIndexValid();

    const errors = document.querySelectorAll('.form-main__error');

    errors.forEach(error => {
        if (!error.dataset.withInput) error.dataset.withInput = error.previousElementSibling.lastElementChild.name;
    });

    if (!LS.getItem('formData')) LS.setItem('formData', JSON.stringify({}));

    form.addEventListener('input', e => {
        if (e.target.getAttribute('is-valid')) {
            if (LS.getItem('formData')) {
                const data = JSON.parse(LS.getItem('formData'));
                data[e.target.name] = e.target.value;
                LS.setItem('formData', JSON.stringify(data));
            }

            if (e.target.dataset.reg) validWithReg(e.target, e.target.parentNode.nextElementSibling);
            else validWithoutReg(e.target, e.target.parentNode.nextElementSibling);
        }
    });


    btnSubmit.addEventListener('click', e => {
        e.preventDefault();

        let arrIndexValid = [];

        inputs.forEach(input => {
            if (input.getAttribute('is-valid')) arrIndexValid.push(input.getAttribute('is-valid'));
        });

        const resIndex = arrIndexValid.reduce((acc, item) => acc && item);

        if (resIndex == 1) {
            alert('Форма успешно заполнена, идёт отправка формы...');
            installAllInputsDefIndexValid();
            LS.removeItem('formData');
                
            if (!formLoad.classList.contains('wholesale-form__load--send-load')) {
                formLoad.classList.add('wholesale-form__load--send-load');
                formLoad.style.backgroundImage = `url(${loadGif})`;
            }

            sendData(form);
        } else {
            alert('Вы допустили ошибк(у/и) при заполнении формы. Попробуйте ещё раз.')

            inputs.forEach(input => {
                if (input.getAttribute('is-valid') == '0') unsuccessfulValid(input, input.parentNode.nextElementSibling);
            });
        }
    });

    const fieldWithTel = form.querySelector('[name="phone"]');

    const mask = IMask(fieldWithTel, { mask: '+{7}(000)000-00-00' });

    function validWithReg(input, error) {
        let reg;

        if (input.type == 'text' || input.type == 'email') reg = new RegExp(input.dataset.reg, 'i');
        else reg = new RegExp(input.dataset.reg);

        if (reg && reg.test(input.value)) successfulValid(input, error);
        else unsuccessfulValid(input, error);
    }

    function validWithoutReg(input, error) {
        if (input.value != '') successfulValid(input, error);
        else unsuccessfulValid(input, error);
    }

    if (LS.getItem('formData')) {
        const saveFormData = JSON.parse(LS.getItem('formData'));

        for (const key in saveFormData) {
            inputs.forEach(input => {
                if (key == input.name) {
                    input.value = saveFormData[key];
                    successfulValid(input, input.parentNode.nextElementSibling);
                }

                if (key.slice(0, 3) == 'err') {
                    const realName = key.slice(3);

                    if (realName == input.name) {
                        input.value = saveFormData[key];
                        unsuccessfulValid(input, input.parentNode.nextElementSibling);
                    }
                }
            });
        }
    }

    function successfulValid(input, error) {
        input.setAttribute('is-valid', 1);
        input.style.backgroundColor = '';
        error.innerHTML = '';
        if (error.classList.contains('form-main__error--active')) error.classList.remove('form-main__error--active');

        if (LS.getItem('formData')) {
                const data = JSON.parse(LS.getItem('formData'));

                for (const key in data) {

                    if (key.slice(0, 3) == 'err') delete data[key];
                }

                LS.setItem('formData', JSON.stringify(data));
        }
    }
        
    function unsuccessfulValid(input, error) {
        input.setAttribute('is-valid', 0);
            
        changeBackgroundFieldForm(input);

        error.innerHTML = 'Недопустимое значение';

        if (LS.getItem('formData')) {
            const data = JSON.parse(LS.getItem('formData'));

            data[`err${error.dataset.withInput}`] = input.value;
            delete data[error.dataset.withInput];

            LS.setItem('formData', JSON.stringify(data))
        }
    }

    function sendData(form) {
        const serviceId = 'service_azm43b7';
        const templateId = 'template_5jcckkd';
        const publicKey = 'gpKXwV-iMTZ9_3DV1';

        emailjs.sendForm(serviceId, templateId, form, publicKey)
            .then(function(response) {
                    form.reset();
                    alert('Форма отправлена! Проверьте почту');

                    if (formLoad.classList.contains('wholesale-form__load--send-load')) {
                        formLoad.classList.remove('wholesale-form__load--send-load');
                        formLoad.style.backgroundImage = '';
                    }

                    console.log('SUCCESS!', response.status, response.text);
            }, function(err) {
                console.log('FAILED...', err);
        });
    }

    function changeBackgroundFieldForm(input) {
        if (LS.getItem('colorTheme')) {
            const color = LS.getItem('colorTheme');

            if (color == 'light') input.style.backgroundColor = red;
            else input.style.backgroundColor = '';
        }
    }
}