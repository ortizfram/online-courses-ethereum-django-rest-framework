import { Fragment, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";


const navigation = [
  { name: "Blog", href: "/blog", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
  { name: "Home", href: "/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {

  // SEARCH
  const [effectSearch, setEffectSearch] = useState(false);
  const [term,setTerm]=useState('')

  const handleChange=e=>{
    setTerm(e.target.value)
  }

  const onSubmit= e =>{
    e.preventDefault()
    setTimeout(() => window.location.href=('/search/'+term), 0.2);
    setTerm('')
  }

  return (
    <div>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="/">
                      <img
                        className="block h-15 w-auto"
                        src="https://bafybeib2ve4a6yrsyo7zb7ecftqchbzvhhx2otmhmebe4o4ujnfc4c4dry.ipfs.w3s.link/Captura.PNG"
                        alt="logo"
                      />
                    </a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <form onSubmit={e=>onSubmit(e)} className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <button 
                          type="submit"
                          className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon
                            className="h-5 w-2 text-gray-400"
                            aria-hidden="true"
                          />
                        </button>
                        <input
                        onChange={(e)=>{handleChange(e)}}
                          id="search"
                          name="search"
                          required
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Search for a post"
                          type="search"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">

                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>

{/* DESKTOP MENU */}
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                   <NavLink to='/blog' className={`mx-4 text-lg dark:hover:text-white hover:text-gray-900 text-gray-600 dark:text-dark-txt text-md font-semibold`}>
                      Blog
                   </NavLink>
                   <NavLink to='/about' className={`mx-4 text-lg dark:hover:text-white hover:text-gray-900 text-gray-600 dark:text-dark-txt text-md font-semibold`}>
                      About
                   </NavLink>
                   <NavLink to='/contact' className={`mx-4 text-lg dark:hover:text-white hover:text-gray-900 text-gray-600 dark:text-dark-txt text-md font-semibold`}>
                      Contact
                   </NavLink>
                  </div>

                  {/* Profile dropdown */}
                  <Menu as="div" className="flex-shrink-0 relative ml-5">
                    <div>
                      {/* <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        
                      </Menu.Button> */}
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    ></Transition>
                  </Menu>

                  <Link
                    to="/contact"
                    className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Hire me
                  </Link>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-50",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
}

export default Navbar;
