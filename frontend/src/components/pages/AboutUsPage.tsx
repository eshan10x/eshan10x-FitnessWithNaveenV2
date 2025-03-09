import { Fade } from "react-awesome-reveal";
import { Text } from "../atoms/Text";
import { AboutTexts } from "../particles/Data";
import Image1 from "../../assets/gym/2.jpeg";
import Image2 from "../../assets/gym/3.jpeg";
import Image3 from "../../assets/gym/4.jpeg";
import Image4 from "../../assets/gym/5.jpeg";
import { Image } from "../atoms/Image";

const AboutPage = () => {
    return (
        <section className="w-full h-auto flex flex-col items-center bg-zinc-900 pt-24">
            {/* Hero Section */}
            <div className="w-full py-16 bg-zinc-950">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="flex flex-col items-center relative before:absolute before:-bottom-6 before:left-0 before:right-0 before:mx-auto before:w-20 before:h-1 before:rounded-lg before:bg-primary before:from-amber-500 before:to-red-500 z-10">
                                <Text as="p" className="text-primary lg:text-sm text-xs tracking-widest uppercase font-medium">{AboutTexts.firstText}</Text>
                                <Text as="h1" className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl">{AboutTexts.secondText}</Text>
                            </div>
                            <Text as="h2" className="text-zinc-200 mt-16 mb-4 text-xl md:text-2xl">{AboutTexts.caption}</Text>
                            <Text as="p" className="text-zinc-400 text-base max-w-3xl">{AboutTexts.paragraph1}</Text>
                        </div>
                    </Fade>
                </main>
            </div>

            {/* Our Story Section */}
            <div className="w-full py-16 bg-zinc-900">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="md:h-[400px] h-[300px] grid grid-cols-3 grid-rows-3 gap-2">
                                <Image alt="Gym Image" objectCover="object-cover" className="col-span-3 row-span-2 w-full h-full" image={Image1} />
                                <Image alt="Gym Image" objectCover="object-cover" className="w-full h-full" image={Image2} />
                                <Image alt="Gym Image" objectCover="object-cover" className="w-full h-full border border-primary" image={Image3} />
                                <Image alt="Gym Image" objectCover="object-cover" className="w-full h-full" image={Image4} />
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col relative before:absolute before:-bottom-4 before:left-0 before:w-16 before:h-1 before:rounded-lg before:bg-primary">
                                    <Text as="h2" className="text-zinc-100 text-2xl md:text-3xl font-bold">Our Story</Text>
                                </div>
                                <Text as="p" className="text-zinc-400 text-justify">
                                    Fitness With Naveen began with a simple yet powerful vision: to create a fitness space where everyone feels welcome, motivated, and empowered to transform their lives. Founded in 2020 by Naveen Kumar, a certified personal trainer with over 10 years of experience, our gym has grown from a small studio to a comprehensive fitness center.
                                </Text>
                                <Text as="p" className="text-zinc-400 text-justify">
                                    What sets us apart is our personalized approach to fitness. We believe that every individual is unique, and so should be their fitness journey. Our team of expert trainers works closely with each member to understand their goals, limitations, and preferences, creating tailored programs that deliver results.
                                </Text>
                                <Text as="p" className="text-zinc-400 text-justify">
                                    Over the years, we've helped hundreds of clients achieve their fitness goals, from weight loss and muscle building to improving overall health and wellness. Our success stories fuel our passion to continue making a positive impact in people's lives through fitness.
                                </Text>
                            </div>
                        </div>
                    </Fade>
                </main>
            </div>

            {/* Our Team Section */}
            <div className="w-full py-16 bg-zinc-950">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="flex flex-col items-center mb-16">
                            <div className="flex flex-col items-center relative before:absolute before:-bottom-6 before:left-0 before:right-0 before:mx-auto before:w-20 before:h-1 before:rounded-lg before:bg-primary before:from-amber-500 before:to-red-500 z-10">
                                <Text as="p" className="text-primary lg:text-sm text-xs tracking-widest uppercase font-medium">Expert Trainers</Text>
                                <Text as="h2" className="text-zinc-100 lg:text-4xl md:text-3xl text-2xl">Meet Our Team</Text>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Team Member 1 */}
                            <div className="bg-zinc-900 rounded-lg overflow-hidden group">
                                <div className="h-80 bg-zinc-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-0 transition-all duration-300"></div>
                                    {/* Replace with actual trainer image */}
                                    <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                                        <Text as="p" className="text-zinc-400">Trainer Image</Text>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <Text as="h3" className="text-zinc-100 text-xl font-bold mb-1">Naveen Kumar</Text>
                                    <Text as="p" className="text-primary text-sm mb-4">Founder & Head Trainer</Text>
                                    <Text as="p" className="text-zinc-400">
                                        With over 10 years of experience and multiple certifications, Naveen specializes in strength training, weight management, and functional fitness.
                                    </Text>
                                </div>
                            </div>

                            {/* Team Member 2 */}
                            <div className="bg-zinc-900 rounded-lg overflow-hidden group">
                                <div className="h-80 bg-zinc-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-0 transition-all duration-300"></div>
                                    {/* Replace with actual trainer image */}
                                    <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                                        <Text as="p" className="text-zinc-400">Trainer Image</Text>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <Text as="h3" className="text-zinc-100 text-xl font-bold mb-1">Priya Sharma</Text>
                                    <Text as="p" className="text-primary text-sm mb-4">Yoga & Pilates Instructor</Text>
                                    <Text as="p" className="text-zinc-400">
                                        Priya brings harmony to mind and body through her expert yoga and pilates instruction, helping clients improve flexibility and mindfulness.
                                    </Text>
                                </div>
                            </div>

                            {/* Team Member 3 */}
                            <div className="bg-zinc-900 rounded-lg overflow-hidden group">
                                <div className="h-80 bg-zinc-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-0 transition-all duration-300"></div>
                                    {/* Replace with actual trainer image */}
                                    <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                                        <Text as="p" className="text-zinc-400">Trainer Image</Text>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <Text as="h3" className="text-zinc-100 text-xl font-bold mb-1">Rajiv Patel</Text>
                                    <Text as="p" className="text-primary text-sm mb-4">Nutrition Specialist</Text>
                                    <Text as="p" className="text-zinc-400">
                                        Rajiv helps clients optimize their nutrition to complement their fitness routines, creating personalized meal plans for maximum results.
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </main>
            </div>

            {/* Our Approach Section */}
            <div className="w-full py-16 bg-zinc-900">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col relative before:absolute before:-bottom-4 before:left-0 before:w-16 before:h-1 before:rounded-lg before:bg-primary">
                                    <Text as="h2" className="text-zinc-100 text-2xl md:text-3xl font-bold">Our Approach</Text>
                                </div>
                                <Text as="p" className="text-zinc-400 text-justify">
                                    At Fitness With Naveen, we believe in a holistic approach to fitness. Our methodology combines:
                                </Text>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-primary">
                                            <Text as="span" className="text-primary font-bold">01</Text>
                                        </div>
                                        <div>
                                            <Text as="h3" className="text-zinc-100 text-lg font-bold mb-1">Personalized Training</Text>
                                            <Text as="p" className="text-zinc-400">
                                                Customized workout programs designed specifically for your body type, fitness level, and goals.
                                            </Text>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-primary">
                                            <Text as="span" className="text-primary font-bold">02</Text>
                                        </div>
                                        <div>
                                            <Text as="h3" className="text-zinc-100 text-lg font-bold mb-1">Nutrition Guidance</Text>
                                            <Text as="p" className="text-zinc-400">
                                                Expert advice on nutrition to complement your fitness routine and maximize results.
                                            </Text>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-primary">
                                            <Text as="span" className="text-primary font-bold">03</Text>
                                        </div>
                                        <div>
                                            <Text as="h3" className="text-zinc-100 text-lg font-bold mb-1">Community Support</Text>
                                            <Text as="p" className="text-zinc-400">
                                                A motivating environment where you can connect with like-minded individuals on similar fitness journeys.
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:h-[500px] h-[300px] bg-zinc-800 rounded-lg overflow-hidden relative">
                                {/* Replace with actual gym image */}
                                <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                                    <Text as="p" className="text-zinc-400">Gym Environment Image</Text>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 to-transparent p-8">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <Text as="h4" className="text-primary text-3xl font-bold">250+</Text>
                                            <Text as="p" className="text-zinc-300 text-sm">Active Members</Text>
                                        </div>
                                        <div className="text-center">
                                            <Text as="h4" className="text-primary text-3xl font-bold">15+</Text>
                                            <Text as="p" className="text-zinc-300 text-sm">Expert Trainers</Text>
                                        </div>
                                        <div className="text-center">
                                            <Text as="h4" className="text-primary text-3xl font-bold">1000+</Text>
                                            <Text as="p" className="text-zinc-300 text-sm">Success Stories</Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </main>
            </div>

            {/* CTA Section */}
            <div className="w-full py-16 bg-zinc-950">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="w-full bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-primary">
                            <div className="flex flex-col gap-4 md:max-w-[60%]">
                                <Text as="h2" className="text-zinc-100 text-2xl md:text-3xl font-bold">
                                    Ready to transform your fitness journey?
                                </Text>
                                <Text as="p" className="text-zinc-400">
                                    Join our fitness family today and experience the perfect blend of expert guidance, supportive community, and personalized workout plans.
                                </Text>
                            </div>
                            <button className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-md hover:opacity-90 transition-all duration-300 whitespace-nowrap">
                                Join Now!
                            </button>
                        </div>
                    </Fade>
                </main>
            </div>
        </section>
    );
};

export default AboutPage;