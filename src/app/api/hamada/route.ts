import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    let {productId} = await req.json()
    console.log("from api hamada", productId);
    

    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
        productId
    }, {
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGY2YTRiZTUwN2I1YzY5Yjk2MDMxOCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcxMDA2NjUxLCJleHAiOjE3Nzg3ODI2NTF9.Gw2QgkuwREMnHqMWJk4MkN8wyLHj2NsZ5UlWt52sk-0"
        }
    })

    return NextResponse.json(data)
}