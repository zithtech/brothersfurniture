/** Contact details — source: brothersfurniture.co.in (home + contact pages). */
export const company = {
  name: 'Brothers Furniture',
  addressLines: ['Plot No. 24, Sri Moogambigai Nagar,', 'Kallikuppam, Ambattur,', 'Chennai – 600 053'],
  phones: [
    { display: '+91 97907 40027', tel: '+919790740027' },
    { display: '+91 97100 02498', tel: '+919710002498' },
  ],
  email: 'brothersfurniture91@gmail.com',
  whatsapp: {
    number: '919790740027',
    message: 'Hi Brothers Furniture, I am interested in your furniture collections. Kindly share more details.',
  },
  map: {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4669.700625123098!2d80.17883717577328!3d13.129900311386454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267f9302b273b%3A0x98a91bd997905c5d!2sBROTHERS%20FURNITURE!5e1!3m2!1sen!2sin!4v1779714398666!5m2!1sen!2sin',
    /** Opens the Google Maps listing (place CID 0x98a91bd997905c5d). */
    link: 'https://maps.google.com/?cid=11000354186193820765',
  },
}

export const whatsappLink = `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(company.whatsapp.message)}`
export const fullAddress = company.addressLines.join(' ')
