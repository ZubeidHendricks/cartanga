function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className='bg-gray-800 text-white p-4 mt-8'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <h3 className='text-xl font-bold'>CarTanga</h3>
            <p className='text-sm'>Car Subscription Crowdfunding Platform</p>
          </div>
          
          <div className='flex space-x-8'>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Quick Links</h4>
              <ul className='text-sm'>
                <li className='mb-1'><a href='/vehicles' className='hover:text-blue-300'>Vehicles</a></li>
                <li className='mb-1'><a href='/campaigns' className='hover:text-blue-300'>Campaigns</a></li>
                <li className='mb-1'><a href='/register' className='hover:text-blue-300'>Join Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className='text-lg font-semibold mb-2'>Contact</h4>
              <ul className='text-sm'>
                <li className='mb-1'>info@cartanga.com</li>
                <li className='mb-1'>+1 555-123-4567</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className='border-t border-gray-700 mt-6 pt-4 text-center text-sm'>
          <p>&copy; {year} CarTanga. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
