'use client';
import React, { useState, FunctionComponent, ChangeEvent, FormEvent } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { AnimatePresence, motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FiAlertCircle } from 'react-icons/fi';

interface SpringModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
}

declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

const FormService = ({ buttonText = "Transform Your Traffic Today !" }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="px-4 grid place-content-center">
      <button onClick={() => setIsOpen(true)} className="w-full text-white font-semibold px-3 py-2 rounded-sm overflow-hidden relative transition-transform hover:scale-105 active:scale-95">
        <span className="relative z-10">{buttonText}</span>
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: '-300%' }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 4,
            ease: 'linear',
          }}
          className="bg-[linear-gradient(to_right,#c3a177,#cc9f6e,#d19b61,#ce8442,#bf752b)] absolute z-0 inset-0 w-[400%]"
        ></motion.div>
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText={buttonText} />
    </div>
  );
};

const SpringModal: FunctionComponent<SpringModalProps> = ({ isOpen, setIsOpen }) => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    website: '',
    phone: '',
    message: '',
    services: 'Web Solutions',
    email: '',
    source: 'Website Form'
  });

  const metaApiToken = 'EAAIeh85nYDIBOZBPtvD57hw6a6kX053khHM6G5XXMJZC5SBpuwWlSeCzDaCZBb62Y2ac9ZAnZCQeTo76zz38Gn7eMGgze2RR4cyrZA6kkk7tX9llAZCkLNRydySNLBveXOm3ZCrnLJB6dDrRGBOJ96hHe2O6mMOg9v0jBnuv7CgvPiEUE9tdWsoz2kZA8IxsTZBn5qvwZDZD';

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Prepare data for API
      const leadData = {
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        message: `Service: ${form.services}\nWebsite: ${form.website}\n${form.message || ''}`,
        source: 'Website Form',
        status: 'LEAD'
      };
      
      // Send to the leads API endpoint
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        // Send data to Meta Ads
        await fetch(`https://graph.facebook.com/v12.0/1552827585519840/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: [{
              event_name: 'FormSubmission',
              event_time: Math.floor(new Date().getTime() / 1000),
              user_data: {
                email: form.email,
                phone: form.phone,
                first_name: form.name.split(' ')[0],
                last_name: form.name.split(' ').slice(1).join(' '),
              },
              custom_data: {
                company: form.company,
                website: form.website,
                services: form.services,
              },
            }],
            access_token: metaApiToken,
          }),
        });

        Swal.fire({
          icon: 'success',
          title: 'Thank you for completing the form.',
          text: 'Please wait while our customer service team reaches out to you as soon as possible.',
          background: '#272727',
          confirmButtonColor: '#C3A177',
          confirmButtonText: 'Okay',
        });
        setIsOpen(false);
        setForm({
          name: '',
          company: '',
          website: '',
          phone: '',
          message: '',
          services: 'Web Solutions',
          email: '',
          source: 'Website Form'
        });

        // Push form data to dataLayer for GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'formSubmission',
          formData: {
            name: form.name,
            company: form.company,
            website: form.website,
            phone: form.phone,
            message: form.message,
            services: form.services,
            email: form.email,
            source: form.source
          },
        });

        // Track events in Facebook
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead');
          window.fbq('track', 'Contact');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Failed to submit lead. Please try again.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Retry',
        });
      }
    } catch (error) {
      console.error('Failed to submit lead', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-primaryColor/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#222222] to-primaryColor text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-primaryColor grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Name" className="text-whiteColor" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email2" value="Your email" className="text-whiteColor" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    shadow
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Company" className="text-whiteColor" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Website" className="text-whiteColor" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    id="website"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="www.yourwebsite.com"
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="phone" value="Phone" className="text-whiteColor" />
                  </div>
                  <TextInput
                    id="phone"
                    type="text"
                    sizing="md"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="message" value="Message (Optional)" className="text-whiteColor" />
                  </div>
                  <TextInput
                    id="message"
                    type="text"
                    sizing="md"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Any additional information"
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Services" value="Select Service" className="text-left text-white" />
                  </div>
                  <Select
                    id="services"
                    name="services"
                    value={form.services}
                    onChange={handleChange}
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  >
                    <option value="Performance Marketing">Performance Marketing</option>
                    <option value="AI Marketing">AI Marketing</option>
                    <option value="Conversion rate optimization">Conversion rate optimization</option>
                    <option value="Google Marketing">Google Marketing</option>
                    <option value="Search engine optimization">Search engine optimization (SEO)</option>
                    <option value="Branding">Branding</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Website Solutions">Website Solutions</option>
                    <option value="Ecommerce Solutions">Ecommerce Solutions</option>
                    <option value="Email Marketing">Email Marketing</option>
                    <option value="Ads Management">Ads Management</option>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-xs text-white bg-secondaryColor hover:bg-[#b89469] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b89469]"
                >
                  Power Up Your Project
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormService;
