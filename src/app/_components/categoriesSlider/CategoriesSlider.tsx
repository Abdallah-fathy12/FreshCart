import { getAllCategories } from '@/app/_services/categories.services'
import React from 'react'
import MySlider from '../MySlider/MySlider'

export default async function CategoriesSlider() {

  let categoriesData = await getAllCategories()

  if (categoriesData == null) {
    return <h1> this website have an Erroe</h1>
  }

  let categoriesImages = categoriesData?.map((category) => category.image)

  return <>

    <MySlider imageList={categoriesImages} slidesPerView={5} spaceBetween={20} isHero={false} />

  </>
}
