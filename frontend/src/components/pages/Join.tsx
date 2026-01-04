import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { Text } from "../atoms/Text";
import { JoinUsTexts } from "../particles/Data";
import { Upload, Warning } from "@phosphor-icons/react";

const JoinPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    weight: "",
    height: "",
    bmi: "",
    purpose: "",
    program: "",
    heartCondition: "",
    chestPain: "",
    looseBalance: "",
    brokenBone: "",
    activityLevel: "",
  });

  // State for image uploads
  const [images, setImages] = useState<{
    frontView: File | null;
    sideView: File | null;
    backView: File | null;
  }>({
    frontView: null,
    sideView: null,
    backView: null,
  });

  // State for image previews
  const [previews, setPreviews] = useState({
    frontView: "",
    sideView: "",
    backView: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
  const MAX_IMAGE_DIMENSION = 1200;

  const compressImage = (file: File, maxWidth = MAX_IMAGE_DIMENSION, quality = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = (width * maxWidth) / height;
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file); // Return original if compression fails
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  // Calculate BMI when weight or height changes
  useEffect(() => {
    if (formData.weight && formData.height) {
      const heightInMeters = parseFloat(formData.height) / 100;
      const weightInKg = parseFloat(formData.weight);
      const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      setFormData({ ...formData, bmi });
    }
  }, [formData.weight, formData.height]);

  // Handle regular input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image uploads
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, view: string) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert(`File size too large. Please select an image smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      return;
    }

    try {
      setIsLoading(true);

      // Compress image if it's too large
      let finalFile = file;
      if (file.size > 1024 * 1024) { // Compress files larger than 1MB
        finalFile = await compressImage(file);
        console.log(`Compressed ${file.name} from ${(file.size / 1024 / 1024).toFixed(2)}MB to ${(finalFile.size / 1024 / 1024).toFixed(2)}MB`);
      }

      setImages({ ...images, [view]: finalFile });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews({ ...previews, [view]: reader.result as string });
        setIsLoading(false);
      };
      reader.readAsDataURL(finalFile);

    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
      setIsLoading(false);
    }
  };

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you would typically send the data to your backend
  //   console.log("Form Data:", formData);
  //   console.log("Images:", images);
  //   alert("Form submitted successfully! We'll contact you soon.");
  // };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate total payload size
      let totalSize = 0;
      Object.values(images).forEach(img => {
        if (img) totalSize += img.size;
      });
      
      if (totalSize > 15 * 1024 * 1024) { // 15MB total limit
        alert('Total file size too large. Please reduce image sizes.');
        setIsLoading(false);
        return;
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append('formData', JSON.stringify(formData));
      
      // Add compressed images
      if (images.frontView) formDataToSend.append('frontView', images.frontView);
      if (images.sideView) formDataToSend.append('sideView', images.sideView);
      if (images.backView) formDataToSend.append('backView', images.backView);
      
      // Use fetch with timeout (AbortController for timeout)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
      
      const response = await fetch('https://y8w9wvoj52.execute-api.us-east-1.amazonaws.com/api/submit-application', {
        method: 'POST',
        body: formDataToSend,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      console.log("Response:", response);
      
      const result = await response.json();
      
      if (result.success) {
        alert("Form submitted successfully! We'll contact you soon.");
        // Reset form
        setFormData({
          name: "", dob: "", gender: "", mobile: "", email: "",
          weight: "", height: "", bmi: "", purpose: "", program: "",
          heartCondition: "", chestPain: "", looseBalance: "", brokenBone: "", activityLevel: "",
        });
        setImages({ frontView: null, sideView: null, backView: null });
        setPreviews({ frontView: "", sideView: "", backView: "" });
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error instanceof Error && error.name === 'AbortError') {
        alert("Upload timeout. Please check your connection and try again.");
      } else if (error instanceof Error && error.message.includes('fetch')) {
        alert("Network error. Please check your connection and try again.");
      } else {
        alert("Failed to submit form. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-8 flex flex-col items-center gap-4 border border-zinc-600 shadow-xl min-w-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <Text as="h3" className="text-zinc-100 text-lg font-semibold">
          Submitting Application
        </Text>
        <Text as="p" className="text-zinc-400 text-center max-w-xs text-sm">
          Uploading your application and images. This may take a few moments for large files.
        </Text>
        
        {/* Visual indicator for large files */}
        <div className="flex items-center gap-2 text-zinc-500 text-xs">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );

  // Get BMI category
  const getBmiCategory = () => {
    const bmi = parseFloat(formData.bmi);
    if (!bmi) return "";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  // Get BMI category color
  const getBmiColor = () => {
    const bmi = parseFloat(formData.bmi);
    if (!bmi) return "text-zinc-400";
    if (bmi < 18.5) return "text-blue-400";
    if (bmi < 25) return "text-green-400";
    if (bmi < 30) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <section className="w-full h-auto flex flex-col items-center bg-zinc-900 pt-24">
      {/* Hero Section */}
      {isLoading && <LoadingPopup />}
      <div className="w-full py-16 bg-zinc-950">
        <main className="lg:mx-20 md:mx-10 mx-6">
          <Fade>
            <div className="flex flex-col items-center text-center mb-10">
              <div className="flex flex-col items-center relative before:absolute before:-bottom-6 before:left-0 before:right-0 before:mx-auto before:w-20 before:h-1 before:rounded-lg before:bg-primary before:from-amber-500 before:to-red-500 z-10">
                <Text
                  as="p"
                  className="text-primary lg:text-sm text-xs tracking-widest uppercase font-medium"
                >
                  {JoinUsTexts.firstText}
                </Text>
                <Text
                  as="h1"
                  className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl"
                >
                  {JoinUsTexts.secondText}
                </Text>
              </div>
              <Text
                as="p"
                className="text-zinc-400 mt-16 mb-4 text-base max-w-3xl"
              >
                {JoinUsTexts.description}
              </Text>
            </div>
          </Fade>
        </main>
      </div>

      {/* Form Section */}
      <div className="w-full py-16 bg-zinc-900">
        <main className="lg:mx-20 md:mx-10 mx-6">
          <Fade>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-4xl mx-auto bg-zinc-800 rounded-lg p-8 shadow-lg"
            >
              <div className="mb-8 pb-4 border-b border-zinc-700">
                <Text as="h2" className="text-zinc-100 text-2xl font-bold mb-1">
                  Personal Information
                </Text>
                <Text as="p" className="text-zinc-400 text-sm">
                  Tell us about yourself so we can tailor the perfect fitness journey for you.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Date of Birth*</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Gender*</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Gender</option>
                    {JoinUsTexts.genderOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Mobile Number*</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+94 76 123 4567"
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Email Address*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-8 pb-4 border-b border-zinc-700">
                <Text as="h2" className="text-zinc-100 text-2xl font-bold mb-1">
                  Body Metrics
                </Text>
                <Text as="p" className="text-zinc-400 text-sm">
                  These details help us understand your current fitness level and set realistic goals.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Weight */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Weight (kg)*</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="70"
                    min="30"
                    max="250"
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Height */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Height (cm)*</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="175"
                    min="100"
                    max="250"
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* BMI */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">BMI (Auto-calculated)</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="bmi"
                      value={formData.bmi}
                      readOnly
                      className="bg-zinc-700 border border-zinc-600 rounded-l-md p-3 text-zinc-100 focus:outline-none focus:border-primary w-full"
                    />
                    <div className={`p-3 bg-zinc-800 border border-l-0 border-zinc-600 rounded-r-md ${getBmiColor()}`}>
                      {getBmiCategory()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 pb-4 border-b border-zinc-700">
                <Text as="h2" className="text-zinc-100 text-2xl font-bold mb-1">
                  Fitness Goals
                </Text>
                <Text as="p" className="text-zinc-400 text-sm">
                  Let us know what you're looking to achieve with Fitness With Naveen.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Purpose of Joining */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Purpose of Joining*</label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Purpose</option>
                    {JoinUsTexts.purposeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interested Program */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Interested Program*</label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Program</option>
                    {JoinUsTexts.programOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-8 pb-4 border-b border-zinc-700">
                <Text as="h2" className="text-zinc-100 text-2xl font-bold mb-1">
                  Health Screening
                </Text>
                <Text as="p" className="text-zinc-400 text-sm">
                  Your safety is our priority. Please answer these questions honestly.
                </Text>
                <Warning size={20} className="text-yellow-500 flex-shrink-0 mt-1" />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                {/* Heart Condition */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium flex items-start gap-2">
                    <span>Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?*</span>
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="heartCondition"
                        value="Yes"
                        checked={formData.heartCondition === "Yes"}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-primary bg-zinc-700 border-zinc-600 focus:ring-primary"
                      />
                      <span className="text-zinc-300">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="heartCondition"
                        value="No"
                        checked={formData.heartCondition === "No"}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-primary bg-zinc-700 border-zinc-600 focus:ring-primary"
                      />
                      <span className="text-zinc-300">No</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium flex items-start gap-2">
                    <span>Do you feel pain in your chest when you do any physical activity?*</span>
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="chestPain"
                        value="Yes"
                        checked={formData.chestPain === "Yes"}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-primary bg-zinc-700 border-zinc-600 focus:ring-primary"
                      />
                      <span className="text-zinc-300">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="chestPain"
                        value="No"
                        checked={formData.chestPain === "No"}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-primary bg-zinc-700 border-zinc-600 focus:ring-primary"
                      />
                      <span className="text-zinc-300">No</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium flex items-start gap-2">
                    <span>Do you loose your balance because of dizziness or do you ever loose consciousness?*</span>
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="looseBalance"
                        value="Yes"
                        checked={formData.looseBalance === "Yes"}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-primary bg-zinc-700 border-zinc-600 focus:ring-primary"
                      />
                      <span className="text-zinc-300">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="looseBalance"
                        value="No"
                        checked={formData.looseBalance === "No"}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-primary bg-zinc-700 border-zinc-600 focus:ring-primary"
                      />
                      <span className="text-zinc-300">No</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium flex items-start gap-2">
                    <span>Do you have a bone or joint problem that could be made worse by a change in your physical activity?*</span>
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="brokenBone"
                        value="Yes"
                        checked={formData.brokenBone === "Yes"}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-primary bg-zinc-700 border-zinc-600 focus:ring-primary"
                      />
                      <span className="text-zinc-300">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="brokenBone"
                        value="No"
                        checked={formData.brokenBone === "No"}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-primary bg-zinc-700 border-zinc-600 focus:ring-primary"
                      />
                      <span className="text-zinc-300">No</span>
                    </label>
                  </div>
                </div>

                {/* Activity Level */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">How active are you currently?*</label>
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-700 border border-zinc-600 rounded-md p-3 text-zinc-100 focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Activity Level</option>
                    {JoinUsTexts.activityOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-8 pb-4 border-b border-zinc-700">
                <Text as="h2" className="text-zinc-100 text-2xl font-bold mb-1">
                  Body Photos
                </Text>
                <Text as="p" className="text-zinc-400 text-sm">
                  Upload 3 photos of yourself (front, side, and back view) to help us assess your current physique and track your progress.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Front View */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Front View</label>
                  <div className="border-2 border-dashed border-zinc-600 rounded-md p-4 text-center">
                    {previews.frontView ? (
                      <div className="relative">
                        <img
                          src={previews.frontView}
                          alt="Front view preview"
                          className="w-full h-40 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImages({ ...images, frontView: null });
                            setPreviews({ ...previews, frontView: "" });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center h-40">
                        <Upload size={40} className="text-zinc-500 mb-2" />
                        <Text as="p" className="text-zinc-400 text-sm">
                          Click to upload
                        </Text>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "frontView")}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Side View */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Side View</label>
                  <div className="border-2 border-dashed border-zinc-600 rounded-md p-4 text-center">
                    {previews.sideView ? (
                      <div className="relative">
                        <img
                          src={previews.sideView}
                          alt="Side view preview"
                          className="w-full h-40 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImages({ ...images, sideView: null });
                            setPreviews({ ...previews, sideView: "" });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center h-40">
                        <Upload size={40} className="text-zinc-500 mb-2" />
                        <Text as="p" className="text-zinc-400 text-sm">
                          Click to upload
                        </Text>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "sideView")}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Back View */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 font-medium">Back View</label>
                  <div className="border-2 border-dashed border-zinc-600 rounded-md p-4 text-center">
                    {previews.backView ? (
                      <div className="relative">
                        <img
                          src={previews.backView}
                          alt="Back view preview"
                          className="w-full h-40 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImages({ ...images, backView: null });
                            setPreviews({ ...previews, backView: "" });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center h-40">
                        <Upload size={40} className="text-zinc-500 mb-2" />
                        <Text as="p" className="text-zinc-400 text-sm">
                          Click to upload
                        </Text>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "backView")}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-8">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 text-primary bg-zinc-700 border-zinc-600 rounded focus:ring-primary"
                  />
                  <span className="text-zinc-300 text-sm">
                    I agree to the Terms and Conditions and Privacy Policy of Fitness With Naveen. I understand that my personal information will be used in accordance with the privacy policy.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-12 rounded-md hover:opacity-90 transition-all duration-300"
                >
                  Submit Application
                </button>
              </div>
            </form>
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
                  Have questions about joining?
                </Text>
                <Text as="p" className="text-zinc-400">
                  Our team is ready to answer any questions you might have about our programs, membership plans, or facilities. Feel free to reach out!
                </Text>
              </div>
              <button className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 whitespace-nowrap">
                Contact Us
              </button>
            </div>
          </Fade>
        </main>
      </div>
    </section>
  );
};

export default JoinPage;