"use server"

import axios from "axios"
import { getUserToken } from "@/lib/authUtils"


export async function addItemToCart(productId: string) {

    let token = await getUserToken()

    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
        productId
    }, {
        headers: {
            token: token as string
        }
    })

    return data
}