import React from "react";
import { Image } from "react-native";

import Onboarding from 'react-native-onboarding-swiper';


const TelaEmbarque = ({ navigation }) => {
    return (
        <Onboarding
            skipLabel="Pular"
            nextLabel="Próximo"
            onSkip={() => navigation.replace("Inicial")}
            onDone={() => navigation.navigate("Inicial")}
            pages={[
                {
                backgroundColor: '#a6e4d0',
                image: <Image source={require('../../../assets/onboarding-img11.png')} />,
                title: 'Connect to te World',
                subtitle: 'A New Way To Connect with The World',
                },
                {
                backgroundColor: '#fdeb93',
                image: <Image source={require('../../../assets/onboarding-img22.png')} />,
                title: 'Share Your Favorites',
                subtitle: 'Share Your Thoughts With Similar Kind of People',
                },
                {
                backgroundColor: '#e9bcbe',
                image: <Image source={require('../../../assets/onboarding-img33.png')} />,
                title: 'Become The Star',
                subtitle: 'Let The Spot Light Capture You',
                },
            ]}
        />
    );
};

export default TelaEmbarque;