class ButtonCount extends HTMLElement {
    constructor() {
      super();
      
      // Create a shadow root for this web component
      let shadow = this.attachShadow({ mode: 'open' });
      
      // Create a button element
      let button = document.createElement('button');
      
      // Set the button's initial text and click count
      button.textContent = 'Times Clicked: 0';
      button.count = 0;
      
      // Add a click event listener to the button
      button.addEventListener('click', () => {
        button.count++;
        button.textContent = `Times Clicked: ${button.count}`;
      });
      
      // Add the button to the shadow DOM
      shadow.appendChild(button);
    }
  }
  
  // Define the 'button-count' custom element in the custom elements registry
  customElements.define('button-count', ButtonCount);
  