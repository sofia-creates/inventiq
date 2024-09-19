import { ItemCategory } from "@/data/categories";


export function validateItemData(data){
    let errors = {};

    if(!data.name){
        errors.name = "Name is required";
    }
    if(!data.description || data.description.length < 5) {
        errors.description = "Description has to be 5 chars or longer"
    }
    if(data.quantity < 0) {
        errors.quantity = "Quantity must be 0 or higher"
    }
    if(!ItemCategory.isCategory(data.category)){
        errors.category = `A valid category has to be added, pick one of these: [${ItemCategory.categories.join(", ")}]`
    }
    const hasErrors = Object.keys(errors).length > 0;
    return [hasErrors, errors]
}


