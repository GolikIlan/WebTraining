export  class Product{
    
      constructor(public productId:string, public categoryId:string, public image:string, 
        public title:string, public price:number, public description:string) {
    
      }
}

export interface ProductWrapperInterface{
  product:Product;
}