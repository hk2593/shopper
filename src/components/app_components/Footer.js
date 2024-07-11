'use client'
import React from 'react';

const Footer = () => {
    return (
        <div className="bg-gray-800 mt-2vh">
            <div className="w-4/5 mx-auto flex py-5">
                <div className="w-1/2 flex flex-col gap-2.5">
                    <h1 className="text-white">Get in Touch</h1>
                    <p className="text-gray-400">
                        We'd love to hear from you! Whether you have questions, feedback, or need assistance, our team is here to help.
                        Feel free to reach out to us through any of the following methods:
                    </p>
                    <div className="flex gap-2.5">
                        <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Twitter Icon" />
                        <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/128/145/145807.png" alt="Facebook Icon" />
                        <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/128/145/145802.png" alt="LinkedIn Icon" />
                        <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png" alt="Instagram Icon" />
                    </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center">
                    <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/128/732/732200.png" alt="Email Icon" />
                    <h3 className="text-white">contact@example.com</h3>
                </div>
            </div>
        </div>
    );
}

export default Footer;

