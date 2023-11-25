import React from 'react';
import Banner from './homeComponents/Banner';
import PopularCampusSection from './homeComponents/PopularCampusSection';
import Testimonials from './homeComponents/Testimonials';
import UpCommingCamps from './homeComponents/UpCommingCamps';
import WellnessBlogs from './homeComponents/WellnessBlogs';

const Home = () => {
    
    return (
        <div style={{}}>
            <Banner></Banner>
            <PopularCampusSection></PopularCampusSection>
            <Testimonials></Testimonials>
            <UpCommingCamps></UpCommingCamps>
            <WellnessBlogs></WellnessBlogs>
        </div>
    );
};

export default Home;