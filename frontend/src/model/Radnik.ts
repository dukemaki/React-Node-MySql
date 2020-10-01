export default class Radnik {
    
    
    id: number;
    imePrezime: string;
 
    constructor(id: number, imePrezime: string) {
        this.id = id;
        this.imePrezime = imePrezime;
    }
 
    public getId() {
 
        return this.id;
    }
 
    public setId(id: number) {
 
        this.id = id;
    }
 
 
    public getImePrezime() {
 
        return this.imePrezime;
    }
 
   public setImePrezime(imePrezime: string) {
 
        this.imePrezime= imePrezime;
    }
 }