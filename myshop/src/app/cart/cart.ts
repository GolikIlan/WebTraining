import { Injectable } from "@angular/core";
import { CartManagementService } from "../cartManagementService";


@Injectable()
export class Cart{

    constructor(private cartManagementService:CartManagementService) {
        
    }

}