/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";
import CONFETTI from "@salesforce/resourceUrl/confetti_js";
export default class lightningWebComponentExample extends LightningElement {

    myconfetti;
    @track confettiClass = 'confettiCanvas hide';

    renderedCallback() {
        console.log('connectedCallback: ' + CONFETTI);
        
        Promise.all([
            loadScript(this, CONFETTI)
        ])
        .then(() => {
            this.setUpCanvas();
        })
        .catch(error => {
            console.log('Error : ' + JSON.stringify(error));
        });   
    }

    setUpCanvas() {
        var confettiCanvas = this.template.querySelector("canvas.confettiCanvas");
        this.myconfetti = confetti.create(confettiCanvas, { resize: true });
        this.myconfetti({
          zIndex: 10000
        });
        this.confettiClass = 'confettiCanvas';
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(function() {
            this.basicCannon();
        }.bind(this), 500);  
    }

    basicCannon() {
        console.log('basicCannon');
        confetti({
          particleCount: 200,
          spread: 60,
          startVelocity: 80,
          origin: {
            y: 1
          }
        });
      }
}