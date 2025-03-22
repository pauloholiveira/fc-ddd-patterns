//A entidade sempre vai ter que representar o stado correto e atual daquele elemento

import Address from './address';

export default class Customer {
    private _id: string; //Uma entidade é única(possui um ID)
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id:string, name:string) {
        this._id=id;
        this._name = name;
        this.validate();
    }
    
//Uma entidade por padrão sempre vai ter que se auto-validar e ela deixar essa responsabilidade para outra classe ou outro ponto do sistema,
//ela está correndo o risco de ficar com um estado inconsistente por algum erro do sistema
    validate() {
        if(this._id.length===0){
            throw new Error("ID is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        
    }

    //Regra de Negócio (change name significa uma intenção da aplicação) por isso é diferente de um simples getter/setter
    changeName(name:string){
        this._name = name;
        this.validate();
    }

    //Aqui estamos espressando uma regra de negócio. Permitindo a auto-validação da entidade.
    activate() {
        if(this._address === undefined){
            throw new Error("Address is required");
        }

        this._active=true;
    }

    deactivate(){
        this._active=false;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get address(){
        return this._address;
    }

    changeAddress(address: Address){
        this._address = address;
    }
    
    isActive(){
        return this._active;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

    get rewardPoints(): number{
        return this._rewardPoints;
    }
}

//OS DADOS A TODO MOMENTO PRECISA ESTAR CONSISTENTES
//Por exemplo, não existe cliente sem nome.