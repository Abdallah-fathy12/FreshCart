export type ProductType = {

    id: string,
    imageCover: string,
    price: number,
    priceAfterDiscount?: number,
    description: string,
    title: string,

    brand: BrandType,
    category: CategoryType,
    ratingsAverage: number,
    ratingsQuantity: number,
    images: string[],
}

export type BrandType = {
    name: string,
    _id: string,
    image: string,
    slug: string,
}
export type CategoryType = {
    name: string,
    _id: string,
    image: string,
    slug: string,
}