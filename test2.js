customElements.define('progress-block', class extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        
       
        // Создание элемента <input> для Прогрессии
        const inputElement = document.createElement('input');
        inputElement.type = 'number';
        inputElement.min = "0"
        inputElement.max = "100"
        inputElement.value = this.getAttribute('value') || '';  // Устанавливаем значение из атрибута 'value', если оно есть

        // Создание элемента <input> Animate
        const animatedElement = document.createElement('input')
        animatedElement.type = 'checkbox'
       
        

        // Создание элемента <input> Hide
        const hideElement = document.createElement('input')
        hideElement.type = 'checkbox'
        hideElement.class = 'hideInput'


        // Обращение к шкалам прогресии
        const progressFill = document.querySelector('.progress-fill');
        const progressBar = document.querySelector('.progress-bar');
        

        // Добавляем обработчик события ввода
        inputElement.addEventListener('input', () => {
            // БОЛЬШЕ-МЕНЬШЕ 100.............................................................................
            
            const percentage = (inputElement.value /100) * 100;

            // Устанавливаем ширину прогресс-бара
            progressFill.style.width = `${percentage}%`;
        });

        // Добавляем обработчик события Animated
        animatedElement.addEventListener('change', () => {
            if (animatedElement.checked) {
                function clearProgressBar() {
                    return new Promise((resolve) => {
                        progressFill.style.width = '0%';
                        setTimeout(resolve, 500); 
                    });
                }
            

               function fillProgressBar() {
                return new Promise((resolve) => {
                    let counter = 0;
    
                    const interval = setInterval(() => {
                        if (counter < inputElement.value) {
                            counter += 1;
                            progressFill.style.width = `${counter}%`;
                        
                        if (counter >= 100) {
                            clearInterval(interval);
                            resolve();
                        }
                    }
                    }, 50); 
                });
           
            }
            
            clearProgressBar()
            .then(fillProgressBar)
            } else {
                progressFill.style.transition = 'none';
                progressFill.style.width = '0'; // Возвращаемся к началу, если чекбокс снят
            }
        });

     

        // Добавляем обработчик события Hide
        hideElement.addEventListener('change', () => {
            if (hideElement.checked) {
                progressBar.style.display = 'none';    
            } else {
                progressBar.style.display = 'block';  
            }
        });
    

        shadow.appendChild(inputElement);
        shadow.appendChild(animatedElement);  
        shadow.appendChild(hideElement)
    }



})

// Регистрация веб-компонента
const progressElement = document.createElement('progress-block');


// Вставка элемента в DOM (в этот момент connectedCallback() вызовется автоматически)
document.body.appendChild(progressElement);



