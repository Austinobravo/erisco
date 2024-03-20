import React from 'react'
import Button from './Button'
import { Facebook, Instagram, Locate, LocateFixed, Mail, MapPinned, Phone, Pin, Twitter, Youtube } from 'lucide-react'
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
        href: 'https://www.facebook.com/eriscofoods',
        icon: Facebook
    },
    {
        href: 'https://twitter.com/eriscoofficial',
        icon: Twitter
    },
    {
        href: 'https://instagram.com/eriscofoods',
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
                href: 'tel:+2348134440000',
                icon: Phone,
                heading: '+234 8134440000',
                title: 'Mon - Fri 10am - 8pm'
            },
            {
                href: 'mailto:eriscofoodsltd2009@gmail.com',
                icon: Mail,
                heading: 'eriscofoodsltd2009@gmail.com',
                title: 'Information & support'
            },
            {
                href: '',
                icon: MapPinned,
                heading: 'Plot 2, Oyeleke Street, Oregun-Alausa, Ikeja, Lagos.',
                title: 'Main office location'
            },
        ]
    }
]
const Footer = () => {
  return (
    <section>
        <div className='bg-blue-900 bg-cover bg-center p-10 space-y-8' style={{backgroundImage: `url(https://the7.io/elementor-main/wp-content/uploads/sites/77/2022/02/layered-waves-row-0.svg)`}}>
            <div className='text-center flex justify-center text-white'>
                <h3 className='md:w-[800px]  md:text-3xl text-lg font-bold'>Join thousands of companies,business owners & constumers who trust Erisco</h3>
            </div>
            <div className='flex justify-center gap-x-2'>
                <Button title='Call Us Now'icon={Phone} href=''/>
                <Button title='Reach Us On Mail'icon={Mail} bgColor='bg-blue-500' border='border' href='' />
            </div>
        </div>
        <div className='bg-black/90 p-10'>
            <div className='space-y-3'>
                <div className='w-fit '>
                    <Link href='/'>
                        <Image src={`https://eriscofoodsltd.com.ng/images/logo.png`} width={100} height={100} alt='logo' className=''/>
                    </Link>

                </div>
                <div className='flex md:flex-nowrap flex-wrap gap-x-3'>
                    <div className='md:basis-2/4 space-y-3 w-full'>
                        <p className='text-slate-300 text-sm'>Erisco Foods Limited (A subsidiary of Erisco Bonpet Group) manufacturers of tomato paste and other food products</p>
                        <div className='flex space-x-3 pb-5'>
                            {socialIcons.map((icon, index) => {
                                const Icon = icon.icon
                                return(
                                    <Link key={index} href={icon.href} className='bg-blue-500 rounded-full text-white p-2 hover:scale-110'>
                                        <Icon size={15}/>
                                    </Link>
                                )
                            }
                            )}
                        </div>
                    </div>                
                    <div className='md:basis-1/4 mr-5 md:mr-0 pb-5 '>
                        {usefulLinks.map((usefulLink, index) => (
                            <div key={index}>
                                <h2 className='text-blue-500 pb-2 font-bold'>{usefulLink.name}</h2>
                                <ul className='text-slate-300 space-y-3 w-fit '>
                                    {usefulLink.links.map((link, index) => (
                                        <li key={index} className='text-sm hover:font-bold hover:text-green-500'>
                                            <Link href={link.href}>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className='md:basis-1/4 space-y-3'>
                        {contactInfo.map((info, index) => (
                            <div key={index}>
                                <h2 className='text-blue-500 pb-2 font-bold'>{info.name}</h2>
                                <div className='space-y-3'>
                                    {info.links.map((link, index) => {
                                        const Icon = link.icon
                                        return (
                                            <div key={index} className='text-slate-300 border p-1 flex gap-x-2'>
                                                <div className='pt-1 text-blue-500'>
                                                    <Icon size={13}/>
                                                </div>
                                                <div className='space-y-1'>
                                                    <h2 className='text-white font-semibold text-sm'><Link href={link.href} target='_blank'>{link.heading}</Link></h2>
                                                    <p className='text-xs'>{link.title}</p>
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
        <div className='text-xs font-semibold text-center py-2 '>
            <p>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved</p>
        </div>
      
    </section>
  )
}

export default Footer
