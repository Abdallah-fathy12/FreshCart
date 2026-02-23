import { ProductType } from "../_types/product.type";

export async function getAllProducts(): Promise<ProductType[] | null> {

  try {

    let res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      cache: "force-cache"
    })

    let resData = await res.json()

    // console.log(resData.data);

    return resData.data

  } catch (error) {

    console.log("error", error);

    return null

  }

}


export async function getProduct(id: string): Promise<ProductType | null> {

  try {

    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

    let resData = await res.json()

    console.log(resData.data);

    return resData.data

  } catch (error) {

    console.log("error", error);

    return null

  }

}

export async function getProductsByCategoryId(categoryId: string): Promise<ProductType[] | null> {
  try {
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
    let resData = await res.json()
    return resData.data
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error)
    return null
  }
}
