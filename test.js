customElements.define('progress-block', class extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});

        // Создание элементов управления
        const inputElement = document.createElement('input');
        inputElement.type = 'number';
        inputElement.min = "0";
        inputElement.max = "100";
        inputElement.value = this.getAttribute('value') || '';

        const animatedElement = document.createElement('input');
        animatedElement.type = 'checkbox';

        const hideElement = document.createElement('input');
        hideElement.type = 'checkbox';
        hideElement.className = 'hideInput';

        // Обращение к шкалам прогресии
        const progressFill = document.querySelector('.circle .mask.full .fill');
        const progressBar = document.querySelector('.progress-bar');
        const numb = document.querySelector('.numb');

        // Обработчик ввода
        inputElement.addEventListener('input', () => {
            const percentage = Math.min(Math.max(inputElement.value, 0), 100); // Ограничиваем от 0 до 100
            updateProgressBar(percentage);
        });

        // Обработчик анимации
        animatedElement.addEventListener('change', () => {
            if (animatedElement.checked) {
                clearProgressBar().then(fillProgressBar);
            } else {
                progressFill.style.transition = 'none';
                updateProgressBar(0);
            }
        });

        // Обработчик скрытия
        hideElement.addEventListener('change', () => {
            progressBar.style.display = hideElement.checked ? 'none' : 'block';
        });

        // Функции анимации и очистки
        function clearProgressBar() {
            return new Promise((resolve) => {
                updateProgressBar(0);
                setTimeout(resolve, 500);
            });
        }

        function fillProgressBar() {
            return new Promise((resolve) => {
                let counter = 0;
                const target = Math.min(Math.max(inputElement.value, 0), 100);
                const interval = setInterval(() => {
                    if (counter < target) {
                        counter++;
                        updateProgressBar(counter);
                    } else {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
        }

        function updateProgressBar(percentage) {
            let counter1 = 0;
            const deg = percentage * 3.6; 
            progressFill.style.transform = `rotate(${deg}deg)`;
            counter1 += 1;
            progressFill.style.width = `${counter1}%`;
            numb.textContent = `${percentage}%`;
        }

        // Добавляем элементы в shadow DOM
        shadow.appendChild(inputElement);
        shadow.appendChild(animatedElement);
        shadow.appendChild(hideElement);
    }
});

// Регистрация веб-компонента
const progressElement = document.createElement('progress-block');

// Вставка элемента в DOM
document.body.appendChild(progressElement);
