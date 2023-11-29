import React from 'react';
import Banner from './homeComponents/Banner';
import PopularCampusSection from './homeComponents/PopularCampusSection';
import Testimonials from './homeComponents/Testimonials';
import UpCommingCamps from './homeComponents/UpCommingCamps';
import WellnessBlogs from './homeComponents/WellnessBlogs';
import { Helmet } from 'react-helmet';

const Home = () => {
    
    return (
        <div>
            <Helmet>
        <title>Wellnex | Home</title>
           </Helmet>
            <Banner></Banner>
            <PopularCampusSection></PopularCampusSection>
            <Testimonials></Testimonials>
            <UpCommingCamps></UpCommingCamps>
            <WellnessBlogs></WellnessBlogs>
        </div>
    );
};

export default Home;