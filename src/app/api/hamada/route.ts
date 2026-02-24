import { getUserToken } from "@/lib/authUtils"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    let { productId } = await req.json()
    console.log("from api hamada", productId);


    let token = await getUserToken()

    try {
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId
        }, {
            headers: {
                token: token as string
            }
        })

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json(error.response?.data || { message: "Error in hamada route" }, { status: error.response?.status || 500 })
    }
}