export  class Product{
    
      constructor(
        public productId:string, 
        public categoryId:string, 
        public image:string, 
        public title:string, 
        public price:number, 
        public description:string) {
    
      }

      getClone(){
        return new Product(this.productId, 
          this.categoryId, 
          this.image, 
          this.title, 
          this.price, 
          this.description);
      }
}

export interface ProductWrapperInterface{
  product:Product;
}