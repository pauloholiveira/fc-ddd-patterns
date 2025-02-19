export default class Address {
    //Como é private e não temos um método para alterar o valor, não conseguimos alterar.
    //tornando a classe imutável
    _street: string = "";
    _number: number = 0;
    _zipCode: string = "";
    _city: string = "";
    
    constructor(street:string, number:number, city:string, zipCode:string) {
        
        this._street = street;
        this._number = number;
        this._zipCode = zipCode;
        this._city = city;
        
    }

    validate(){
        if(this._street.length===0){
            throw new Error("Street is required");
        }
        if(this._number===0){
            throw new Error("Number is required");
        }
        if(this._zipCode.length===0){
            throw new Error("ZipCode is required");
        }
        if(this._city.length===0){
            throw new Error("City is required");
        }
    }

    toString(){
        return `${this._street}, ${this._number} - ${this._zipCode} - ${this._city}`;
    }   
}