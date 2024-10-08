import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { clsx } from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  // const isActive = path === location.pathname;
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar className="border-b-2">
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg mr-1 text-white shadow-gray-400 shadow-sm-light">Abhinav's</span>
        Blog
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun className="flex justify-center items-center" /> : <FaMoon className="flex justify-center items-center" />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user'
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm font-light subpixel-antialiased'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
              sign in
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="focus:bg-gray-600">
        <Navbar.Link className={clsx("rounded-xl", { "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animated-background": path === "/" })} active={path === "/"} as={"div"}>
          <Link to='/' className={clsx("block px-4 py-2", { "text-white": path === "/" })}> Home </Link>
        </Navbar.Link>
        <Navbar.Link className={clsx("rounded-xl", { "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animated-background": path === "/about" })} active={path === "/about"} as={"div"}>
          <Link to='/about' className={clsx("block px-4 py-2", { "text-white": path === "/about" })}>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link className={clsx("rounded-xl", { "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animated-background": path === "/projects" })} active={path === "/projects"} as={"div"}>
          <Link to='/projects' className={clsx("block px-4 py-2", { "text-white": path === "/projects" })}>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
