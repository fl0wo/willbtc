import FAQ from "@/components/FAQ";
import FeaturesListicle from "@/components/FeaturesListicle";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import WithWithout from "@/components/WithWithout";
import Testimonial1Small from "@/components/Testimonial1Small";
import VideoYoutubeTalk from "@/components/VideoYoutube";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import TestimonialsAvatars from "@/components/TestimonialsAvatars";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";

export default function Page() {
    return (
        <>
            <Header/>

            <Hero/>

            {/*<Testimonial1Small/>*/}
            <TestimonialsAvatars priority={true}/>

            <Problem/>

            <Solution/>

            {/*<FeaturesAccordion/>*/}

            {/*<WithWithout/>*/}

            {/*<Problem/>*/}

            {/*<FeaturesListicle/>*/}

            {/*<VideoYoutubeTalk/>*/}
            {/*<FeaturesAccordion/>*/}
            {/*<Testimonial1Small/>*/}

            {/*<Pricing/>*/}

            {/*<FAQ/>*/}

            {/*<Testimonials11/>*/}

            <Footer/>

        </>
    );
}
