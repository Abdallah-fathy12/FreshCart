import { CategoryType } from "../_types/product.type"

export async function getAllCategories(): Promise<CategoryType[] | null> {
    try {
        let res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
        let resData = await res.json()
        return resData.data
    } catch (error) {
        console.error("Error fetching categories:", error)
        return null
    }
}

export async function getSpecificCategory(id: string): Promise<CategoryType | null> {
    try {
        let res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        let resData = await res.json()
        return resData.data
    } catch (error) {
        console.error(`Error fetching category ${id}:`, error)
        return null
    }
}
