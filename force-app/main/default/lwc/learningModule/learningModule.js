/* eslint-disable no-console */
import { LightningElement, track, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { loadScript } from "lightning/platformResourceLoader";
import getLearningModule from '@salesforce/apex/learningController.getLearningModule';
import getRelatedLearningTopic from '@salesforce/apex/learningController.getRelatedLearningTopic';
import LEARNING_MODULE_IMAGE_URL from '@salesforce/resourceUrl/LearningModule';
import LEARNING_MODULE_COMPLETE_IMAGE_URL from '@salesforce/resourceUrl/LearningModuleComplete';
import CONFETTI from "@salesforce/resourceUrl/confetti_js";
export default class learningModule extends NavigationMixin(LightningElement) {
    @api recordId;
    moduleIncompleteImageUrl = LEARNING_MODULE_IMAGE_URL;
    moduleCompleteImageUrl = LEARNING_MODULE_COMPLETE_IMAGE_URL;
    @track moduleImageUrl;
    myconfetti;
    @track confettiClass = 'confettiCanvas hide';
    module;
    @wire(getRelatedLearningTopic, { recordId: '$recordId' }) topic;

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

        if (this.module == null) {
            getLearningModule({
                recordId: this.recordId
            })
            .then((value) => {
                this.module = value;
                console.log('Return: ' + JSON.stringify(value));
                this.setModuleStatus();
            })
            .catch((error) => {
                console.log('Error2: ' + JSON.stringify(error));
            });
        }        
    }

    setModuleStatus() {
        console.log('setModuleStatus: ' + JSON.stringify(this.module));
        this.moduleImageUrl = this.moduleIncompleteImageUrl;
        if (this.module.Complete__c === true) {
            this.moduleImageUrl = this.moduleCompleteImageUrl;
        }
    }

    moduleClick() {
        console.log('moduleClick');
        console.log('topic: ' + JSON.stringify(this.topic));

        getLearningModule({
            recordId: this.recordId
        })
        .then((value) => {
            this.module = value;
            if (this.module.Complete__c === true) {
                this.setModuleStatus();
                this.confettiClass = 'confettiCanvas';
                // eslint-disable-next-line @lwc/lwc/no-async-operation
                setTimeout(function() {
                    this.basicCannon();
                }.bind(this), 500);                
            } else {
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: this.topic.data.Id,
                        actionName: 'view'
                    }
                });
            }
        })
        .catch((error) => {
            console.log('Error2: ' + JSON.stringify(error));
        });
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