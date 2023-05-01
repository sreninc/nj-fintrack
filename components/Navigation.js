import {ImStatsDots} from 'react-icons/im'

function Nav() {
    return (
        <header className='container max-w-2xl px-6 py-6 mx-auto'>
          <div className='flex items-center justify-between'>
            {/* user information */}
            <div className='flex items-center gap-2'>
              {/* img */}
              <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
                <img 
                  className='w-full h-full object-cover'
                  src="https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/fe376f7d-9b1d-4d40-bea9-0f3f2d99d6fb/00223-935067604.png?format=1500w"
                  alt="Profile image"
                />
              </div>
              
              {/* name */}
              <small>Hi, Leon!</small>
            </div>
    
            {/* right side of navigation */}
            <nav className='flex items-center gap-2'>
              <div>
                <ImStatsDots className='text-2xl' />
              </div>
              <div>
                <button className='btn btn-danger'>Sign out</button>
              </div>
            </nav>
          </div>
        </header>
      );
}

export default Nav;