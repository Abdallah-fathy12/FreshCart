"use server"

import axios from "axios";

/**
 * Fetches all brands from the API
 */
export async function getAllBrands() {
    try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        return data;
    } catch (error: any) {
        console.error("Error fetching brands:", error.message);
        return { status: "error", message: error.message };
    }
}

/**
 * Fetches a specific brand by ID
 */
export async function getSpecificBrand(brandId: string) {
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
        return data;
    } catch (error: any) {
        console.error("Error fetching specific brand:", error.message);
        return { status: "error", message: error.message };
    }
}
