import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
// import NewsLetterBox from '../components/NewsLetterBox'
import NewsLetterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center  gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt consectetur expedita natus voluptas odit obcaecati, quod maxime consequuntur et deserunt vel veritatis rem similique inventore error provident. Aliquam, animi a!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum soluta, repudiandae voluptatibus officia animi deleniti hic quo consectetur perspiciatis? Dolorum enim culpa unde itaque doloremque rem dicta aspernatur illum?</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our Mission Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem repellat ipsam fuga, obcaecati totam aut quisquam, placeat illo ratione asperiores perferendis laudantium voluptatum temporibus nam accusantium sunt deserunt maiores amet!</p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-5">
        <div className="border px-10 md:px-16 py-8 sm:py-20  flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p>we meticulosly select aca Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt omnis error neque aliquam, quod ex!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20  flex flex-col gap-5">
          <b>Convenience:</b>
          <p>with our User  friendly interface  sit amet consectetur, adipisicing elit. Sunt omnis error neque aliquam, quod ex!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20  flex flex-col gap-5">
          <b>Exceptional Customer Serives:</b>
          <p>our team  of dedicated  interface  sit amet consectetur, adipisicing elit. Sunt omnis error neque aliquam, quod ex!</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About