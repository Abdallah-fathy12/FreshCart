"use server"

import { getUserToken } from "@/lib/authUtils"
import axios from "axios"

export async function UpdateCart(id :string , count :number){

    const token = await getUserToken()

    const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        count
    } , {
        headers : {
            token: token as string
        }
    })

    return data
}