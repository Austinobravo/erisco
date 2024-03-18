import React from 'react'
import Button from './Button'
import { Facebook, Instagram, Mail, Map, Phone, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const usefulLinks = [
    {
        name: 'Useful Links',
        links:[
            {
                href: '',
                name: 'About'
            },
            {
                href: '',
                name: 'Products'
            },
            {
                href: '',
                name: 'Privacy Policy'
            },
            {
                href: '',
                name: 'Terms of Use'
            },
        ]
    }
]
const socialIcons = [
    {
        href: '',
        icon: Facebook
    },
    {
        href: '',
        icon: Twitter
    },
    {
        href: '',
        icon: Instagram
    },
    {
        href: '',
        icon: Youtube
    },
]

const contactInfo = [
    {
        name: 'Contact Info',
        links: [
            {
                href: '',
                icon: Phone,
                heading: '1-001-234-5678',
                title: 'Mon - Fri 10am - 8pm'
            },
            {
                href: '',
                icon: Mail,
                heading: 'admin@erisco.com',
                title: 'Information & support'
            },
            {
                href: '',
                icon: Map,
                heading: '3 Rockaway St., New Rochelle, NY 1080',
                title: 'Main office location'
            },
        ]
    }
]
const Footer = () => {
  return (
    <section>
        <div className='bg-blue-500 p-10 space-y-8'>
            <div className='text-center flex justify-center text-white text-3xl'>
                <h3 className='w-[800px] font-bold'>Join thousands of companies,business owners & constumers who trust Erisco</h3>
            </div>
            <div className='flex justify-center gap-x-2'>
                <Button title='Call Us Now'icon={Phone} href=''/>
                <Button title='Reach Us On Mail'icon={Mail} bgColor='bg-blue-500' border='border' href='' />
            </div>
        </div>
        <div className='bg-black'>
            <div>
                <Link href='/'>
                    <Image src={`https://eriscofoodsltd.com.ng/images/logo.png`} width={100} height={100} alt='logo'/>
                </Link>
                <div>
                    <div>
                        <p className='text-white'>Erisco Foods Limited (A subsidiary of Erisco Bonpet Group) manufacturers of tomato paste and other food products</p>
                        <div className='flex'>
                            {socialIcons.map((icon, index) => {
                                const Icon = icon.icon
                                return(
                                    <Link key={index} href={icon.href} className='bg-blue-500 rounded-full text-white p-2'>
                                        <Icon size={15}/>
                                    </Link>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <div>
                        {usefulLinks.map((usefulLink, index) => (
                            <div key={index}>
                                <h2 className='text-blue-500'>{usefulLink.name}</h2>
                                <ul className='text-slate-500'>
                                    {usefulLink.links.map((link, index) => (
                                        <li key={index}>
                                            <Link href={link.href}>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div>
                        {contactInfo.map((info, index) => (
                            <div key={index}>
                                <h2 className='text-blue-500'>{info.name}</h2>
                                <div>
                                    {info.links.map((link, index) => {
                                        const Icon = link.icon
                                        return (
                                            <div key={index} className='text-slate-500'>
                                                <div>
                                                    <Icon/>
                                                </div>
                                                <div>
                                                    <h2>{link.heading}</h2>
                                                    <p>{link.title}</p>
                                                </div>

                                            </div>

                                        )
                                    }
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
      
    </section>
  )
}

export default Footer
