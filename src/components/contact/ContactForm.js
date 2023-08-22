import React, { useState } from "react";
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import FullWithLayout from "hocs/layouts/FullWithLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Contact() {

  const [agreed, setAgreed] = useState (false)
  const [loading, setLoading] = useState(false)

  // form variables
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    budget: '',
  });

  // form fields
  const { 
    name,
    email,
    subject,
    message,
    phone,
    budget 
  } = formData;
  
  // form setting fields
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // *** on Submit 
  const onSubmit = e => {
    e.preventDefault();

    if(agreed){
      setLoading(true);

      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };

      const formData = new FormData()

      formData.append('name', name)
      formData.append('email', email)
      formData.append('subject', subject)
      formData.append('message', message)
      formData.append('phone', phone)
      formData.append('budget', budget)

      const fetchData = async () => {
        // POST
        axios.post(`${process.env.REACT_APP_API_URL}/api/contacts/`, formData, config)
        .then(res => {
          
          setLoading(false);
          toast.success("Mensaje enviado correctamente, estaremos en contacto muy pronto")
          
        })
        .catch(err => {
          
          setLoading(false);
          toast.error("Error al enviar mensaje")
        }) 
      }

      fetchData()


    }else {
      toast.error("Debes aceptar los terminos y politica de privacidad")
    }
  }
  // --- END submit

  return (
    <FullWithLayout>
      <div className="relative bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
        </div>
        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            {/* Contact/ Socials */}
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Get in touch
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                You'll get a response as soon as i see it
              </p>
              <dl className="mt-8 text-base text-gray-500">
                <div>
                  <dt className="sr-only">Postal address</dt>
                  <dd>
                    <p>Mendoza; Argentina</p>
                    <p>Mendoza City</p>
                  </dd>
                </div>
                <div className="mt-6">
                  <dt className="sr-only">Phone number</dt>
                  <dd className="flex">
                    <PhoneIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">+54 9 (261) 3005849</span>
                  </dd>
                </div>
                <div className="mt-3">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex">
                    <MailIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">ortizfranco48@yahoo.com</span>
                  </dd>
                </div>
                <div className="mt-3">
              <dt className="sr-only">Linkedin</dt>
              <dd className="flex">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-3">
                  <Link to="https://www.linkedin.com/in/ortizfram/" target="_blank">
                    ortizfram
                  </Link>
                </span>
              </dd>
            </div>
              </dl>
            </div>
          </div>
          {/* ------------------------------------- */}
          {/* *** FOrm */}
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <div className="max-w-lg mx-auto lg:max-w-none">

              <form
                onSubmit={e=>onSubmit(e)}
                action="#"
                method="POST"
                className="grid grid-cols-1 gap-y-6"
              >
                <div>
                  <label className="sr-only">
                    Full name
                  </label>
                  <input
                    type="text"
                    name='name'
                    value={name}
                    onChange={e=>onChange(e)}
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    name="email"
                    value={email}
                    onChange={e=>onChange(e)}
                    type="email"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={phone}
                    onChange={e=>onChange(e)}
                    type="number"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="Phone"
                  />
                </div>
                <div>
                  <label className="sr-only">
                    Subject
                  </label>
                  <input
                    type="text"
                    name='subject'
                    value={subject}
                    onChange={e=>onChange(e)}
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="Subject"
                    />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={e=>onChange(e)}
                    placeholder="Message"
                    rows={4}
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    defaultValue={""}
                  />
                </div>
                <div>
                            <label className="block text-sm font-gilroy-medium text-gray-700">
                                Presupuesto (opcional)
                            </label>
                            <select
                                name="budget"
                                onChange={e=>onChange(e)}
                                value={budget}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                defaultValue="Canada"
                            >
                                <option value="" disabled selected>Presupuesto?</option>
                                <option value="0-5,000">$0 - $5,000</option>
                                <option value="5,000-10,000">$5,000 - $10,000</option>
                                <option value="10,000+">$10,000+</option>
                            </select>
                        </div>

                        <Switch 
                          checked={agreed}
                          onChange={setAgreed}
                          className={classNames(
                            agreed ? 'bg-blue-600' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 dark:text-dark-txt border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            )}
                        >
                          <span className="sr-only">Acepta las politicas</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                                agreed ? 'translate-x-5' : 'translate-x-0',
                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                            />

                        </Switch>

                {/* *** Submit button */}
                <div>
                {
                  loading ?
                    
                      <button
                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Loading
                      </button>
                    
                :
                 
                    <button
                      type="submit"
                      className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>
                  
                }
                </div>
                {/* --- END submit */}
              </form>
          {/* --- END FOrm */}

            </div>
          </div>
        </div>
      </div>
    </FullWithLayout>
  );
}

export default Contact;
