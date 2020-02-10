import { LightningElement, api, track, wire } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";
import { NavigationMixin } from 'lightning/navigation';
import EA_TRAIL1 from '@salesforce/resourceUrl/ea_trail1';
import EA_TRAIL2 from '@salesforce/resourceUrl/ea_trail2';
import EA_TRAIL3 from '@salesforce/resourceUrl/ea_trail3';
import BADGE_URL from '@salesforce/resourceUrl/completed_badge';
import CONFETTI from "@salesforce/resourceUrl/confetti_js";
import updateLearningModule from '@salesforce/apex/learningController.updateLearningModule';
import getParentLearningModule from '@salesforce/apex/learningController.getParentLearningModule';

export default class learningTopic extends NavigationMixin(LightningElement) {
    
    @api recordId;
    eaTrail1Url = EA_TRAIL1;
    eaTrail2Url = EA_TRAIL2;
    eaTrail3Url = EA_TRAIL3;
    badgeUrl = BADGE_URL;
    step = 1;
    @track answer1Class = '';
    @track answer2Class;
    @track buttonClass;
    @track modalClass = 'hide';
    myconfetti;
    @track confettiClass = 'confettiCanvas hide';    
    @wire(getParentLearningModule, { recordId: '$recordId' }) module;

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

    clickHandler() {
        this.step++;
        console.log('clickHandler: ' + this.step);
        console.log('module: ' + JSON.stringify(this.module));
        switch(this.step) {
            case 2:
                this.answer1Class = 'answer';
                break;
            case 3:
                this.answer2Class = 'answer';
                this.buttonClass = 'success'
                break;
            case 4:
                /*
                updateLearningModule({
                    recordId: this.module.data.Id,
                    complete: true
                })
                .then(() => {
                    console.log('Saved');
                    this[NavigationMixin.Navigate]({
                        type: 'standard__recordPage',
                        attributes: {
                            recordId: this.module.data.Id,
                            actionName: 'view'
                        }
                    });
                })
                .catch((error) => {
                    console.log('Error: ' + JSON.stringify(error));
                });
                */

                this.modalClass = "modal";
                this.confettiClass = 'confettiCanvas';
                this.basicCannon();
                break;
            default:
                this.step = 1;
                this.answer1Class = '';
                this.answer2Class = '';
                this.buttonClass = '';
                this.modalClass = 'hide';
                this.confettiClass = 'confettiCanvas hide';
                break;
        }
    }

    closeModal() {
        this.modalClass = "hide";
    }

    setUpCanvas() {
        var confettiCanvas = this.template.querySelector("canvas.confettiCanvas");
        this.myconfetti = confetti.create(confettiCanvas, { resize: true });
        this.myconfetti({
          zIndex: 10000
        });
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