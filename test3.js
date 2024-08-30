class ProgressRing {
    constructor(circleSelector, inputSelector, animatedElementSelector, hideElementSelector) {
      this.circle = document.querySelector(circleSelector);
      this.r = this.circle.r.baseVal.value;
      this.circumference = 2 * Math.PI * this.r;
      this.input = document.querySelector(inputSelector);
      this.animatedElement = document.querySelector(animatedElementSelector);
      this.hideElement = document.querySelector(hideElementSelector);
  
      this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
      this.circle.style.strokeDashoffset = this.circumference;
  
      this.animationFrameId = null;
      this.isAnimating = false;
      this.rotation = 0; 
  
      this.init();
    }
  
    setProgress(value) {
      const offset = this.circumference - (value / 100 * this.circumference);
      this.circle.style.strokeDashoffset = offset;
    }
  
    animateRotation() {
      if (this.isAnimating) {
        this.rotation += 1; 
        document.querySelector('.progress-ring').style.transform = `rotate(${this.rotation}deg)`;
        this.animationFrameId = requestAnimationFrame(() => this.animateRotation());
      }
    }
  
    startAnimation() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      const value = this.input.value;
      this.setProgress(value);
      this.animateRotation();
    }
  
    stopAnimation() {
      this.isAnimating = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      this.rotation = 0; 
      document.querySelector('.progress-ring').style.transform = `rotate(0deg)`; 
      this.setProgress(0); 
    }
  
    init() {
 
      this.input.setAttribute('min', '0');
      this.input.setAttribute('max', '100');
  
      this.input.addEventListener('input', () => {
        let value = parseInt(this.input.value, 10);
  
        
        if (value < 0) value = 0;
        if (value > 100) value = 100;
  
        this.input.value = value; 
        this.setProgress(value); 
      });
  
      this.animatedElement.addEventListener('change', () => {
        if (this.animatedElement.checked) {
          this.startAnimation();
        } else {
          this.stopAnimation();
        }
      });
  
      this.hideElement.addEventListener('change', () => {
        if (this.hideElement.checked) {
          this.circle.style.display = 'none';    
        } else {
          this.circle.style.display = 'block';  
        }
      });
    }
  }
  
  // Создаем экземпляр класса и передаем селекторы
  const progressRing = new ProgressRing(
    '.progress-ring__circle',
    '.percente',
    '#check',
    '#check1'
  );
  