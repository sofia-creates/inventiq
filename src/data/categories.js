export class ItemCategory {
    static VEGETABLES = "vegetables"
    static FRUIT = "fruit"
    static DAIRY = "dairy"
    static CANNED = "canned"
    static CLEANING = "cleaning"

    static categories = [
        this.VEGETABLES,
        this.FRUIT,
        this.DAIRY,
        this.CANNED,
        this.CLEANING
    ]

    static isCategory(category = "") {
        return this.categories.includes(category)
    }
} 


//Class for user here