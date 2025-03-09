import { Fade } from "react-awesome-reveal";
import { Text } from "../atoms/Text";
import { ContactTexts, ContactUsTexts } from "../particles/Data";
import { useState } from "react";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
        });
    };

    return (
        <section className="w-full h-auto flex flex-col items-center bg-zinc-900 pt-24">

            {/* Hero Section */}
                  <div className="w-full py-16 bg-zinc-950">
                    <main className="lg:mx-20 md:mx-10 mx-6">
                      <Fade>
                        <div className="flex flex-col items-center text-center mb-10">
                          <div className="flex flex-col items-center relative before:absolute before:-bottom-6 before:left-0 before:right-0 before:mx-auto before:w-20 before:h-1 before:rounded-lg before:bg-primary before:from-amber-500 before:to-red-500 z-10">
                            <Text
                              as="p"
                              className="text-primary lg:text-sm text-xs tracking-widest uppercase font-medium"
                            >
                              {ContactUsTexts.firstText}
                            </Text>
                            <Text
                              as="h1"
                              className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl"
                            >
                              {ContactUsTexts.secondText}
                            </Text>
                          </div>
                          <Text
                            as="p"
                            className="text-zinc-400 mt-16 mb-4 text-base max-w-3xl"
                          >
                            {ContactUsTexts.description}
                          </Text>
                        </div>
                      </Fade>
                    </main>
                  </div>

            {/* Contact Form Section */}
            <div className="w-full py-20 bg-zinc-900">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="w-full bg-zinc-800 rounded-lg p-8 md:p-12">
                            <div className="flex flex-col items-center mb-10">
                                <Text as="h2" className="text-zinc-100 text-3xl md:text-4xl font-bold mb-4">
                                    Send Us A Message
                                </Text>
                                <Text as="p" className="text-zinc-400 text-center max-w-2xl">
                                    Fill out the form below and our team will get back to you within 24 hours. We're committed to helping you achieve your fitness goals.
                                </Text>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-zinc-200 font-medium">Your Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            name="name" 
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-zinc-700 rounded-md py-3 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-zinc-200 font-medium">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-zinc-700 rounded-md py-3 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="phone" className="text-zinc-200 font-medium">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            name="phone" 
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="bg-zinc-700 rounded-md py-3 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="subject" className="text-zinc-200 font-medium">Subject</label>
                                        <input 
                                            type="text" 
                                            id="subject" 
                                            name="subject" 
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="bg-zinc-700 rounded-md py-3 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="What is this regarding?"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 mb-8">
                                    <label htmlFor="message" className="text-zinc-200 font-medium">Your Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows={6} 
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="bg-zinc-700 rounded-md py-3 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <div className="flex justify-center">
                                    <button 
                                        type="submit" 
                                        className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-10 rounded-md hover:opacity-90 transition-all duration-300"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Fade>
                </main>
            </div>
            
            {/* Map Section */}
            <div className="w-full py-12 bg-zinc-950">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="w-full h-[400px] bg-zinc-800 rounded-lg overflow-hidden">
                            {/* Replace with actual map implementation */}
                            <div className="w-full h-full flex items-center justify-center bg-zinc-700 text-zinc-400">
                                <Text as="p" className="text-center px-4">
                                    Map will be displayed here. Integrate with Google Maps or your preferred map service.
                                </Text>
                            </div>
                        </div>
                    </Fade>
                </main>
            </div>
            
            {/* CTA Section */}
            <div className="w-full py-16 bg-zinc-900">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="w-full bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-primary">
                            <div className="flex flex-col gap-4 md:max-w-[60%]">
                                <Text as="h2" className="text-zinc-100 text-2xl md:text-3xl font-bold">
                                    Ready to start your fitness journey?
                                </Text>
                                <Text as="p" className="text-zinc-400">
                                    Join our fitness family today and transform your life with expert guidance, supportive community, and personalized workout plans.
                                </Text>
                            </div>
                            <button className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-md hover:opacity-90 transition-all duration-300 whitespace-nowrap">
                                {ContactTexts.button}
                            </button>
                        </div>
                    </Fade>
                </main>
            </div>
        </section>
    );
};

export default ContactPage;