import { LoginSevice, LoginData } from "../login-service/loginservice";
import { CartManagementService } from "./cartManagementService";
import { ProductsDataService } from "../product-services/products.service";
import { ProductsProvider } from "../product-services/products.mock";
import { LoginToken } from "../permissions-service/permissionservice";
import { Product } from "../product-model/product";



describe('CartManagementService test', () => {
    let loginService:LoginSevice;
    let cartManagementService:CartManagementService;
    let productsDataService:ProductsDataService;

    beforeEach(()=>{
        loginService = new LoginSevice({
            "g":"a",
        });
        productsDataService = new ProductsDataService(new ProductsProvider());
        cartManagementService = new CartManagementService(productsDataService, loginService);
    })

    it(`should has 0 products in cart when not logged in`, (() => {
        expect(cartManagementService.productsAmount).toBe(0);
    }));

    it(`should has 1 product when added`, (() => {
        loginService.login(new LoginData("a", "g"));
        spyOn(productsDataService, 'decrementStock').and.callFake((product) => {});
        cartManagementService.addProductToCart(new Product("1", "1", "image", "title", 1, "desc"));

        expect(productsDataService.decrementStock).toHaveBeenCalled();
        expect(cartManagementService.productsAmount).toBe(1);
    }));

    it(`should has 0 product after add/remove operations`, (() => {
        loginService.login(new LoginData("a", "g"));
        spyOn(productsDataService, 'decrementStock').and.callFake((product) => {});
        spyOn(productsDataService, 'incrementStock').and.callFake((product) => {});
        let p = new Product("1", "1", "image", "title", 1, "desc");
        cartManagementService.addProductToCart(p);
        cartManagementService.removeProductFromCart(p);

        expect(productsDataService.incrementStock).toHaveBeenCalled();
        expect(productsDataService.decrementStock).toHaveBeenCalled();
        expect(cartManagementService.productsAmount).toBe(0);
    }));

  });