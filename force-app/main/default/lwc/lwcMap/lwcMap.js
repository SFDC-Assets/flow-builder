import { LightningElement, api, track } from 'lwc';

export default class LwcMap extends LightningElement {
    
    @api city
    @api country
    @api postalCode
    @api state
    @api street

    @track centerLocation = {}
    @track marker = []
    @track showMap = false
    @track timeout

    getLocation = locationData => {
        if (!this.city || !this.postalCode || !this.street) {
            return console.error(`UNdefined params:`, this.city, this.street)
        }
        console.warn(`Setting location:`, locationData)
        const { city, country, postalCode, state, street } = locationData
        return {
            location: {
                City: city,
                Country: country,
                PostalCode: postalCode,
                State: state,
                Street: street
            }  
        }
    }

    renderedCallback() {
        if (this.showMap) return
        console.log(`CITY:`, this.city)
        const newLocation = this.getLocation({
            city: this.city,
            country: this.country,
            postalCode: this.postalCode,
            state: this.state,
            street: this.street
        })
        this.centerLocation = newLocation
        this.marker = [newLocation]
        this.showMap = true
        console.log(`UPDATED LOCATION:`, newLocation)
    }
}