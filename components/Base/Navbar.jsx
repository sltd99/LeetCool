import React from "react"
import classNames from "classnames"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import Link from "next/link"
import { CodeIcon } from "@heroicons/react/solid"
import { useRouter } from "next/dist/client/router"
import { signOut } from "next-auth/client"
import Button from "./Button"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Daily Questions", href: "/daily" },
  { name: "Performance", href: "/performance" },
]

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
}

const userNavigation = [{ name: "Sign out" }]

export default function Navbar({ session }) {
  const router = useRouter()

  const currentRoute = router.asPath.endsWith("#") ? router.asPath.slice(0, -1) : router.asPath

  return (
    <div className="flex justify-between h-16 border-b border-gray-200 px-3">
      <div className="flex">
        <div className="flex-shrink-0 flex items-center">
          <img src="/logo.png" />
        </div>
        <div className="s-my-px -ml-8 flex space-x-8">
          {navigation.map(item => (
            <Link key={item.name} href={item.href}>
              <a
                className={classNames(
                  item.href === currentRoute
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "inline-flex items-center px-1 pt-1 border-b-2 font-medium"
                )}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="ml-6 flex items-center">
        {/* <button
          onClick={() => router.asPath !== "/upload" && router.push("/upload")}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
        >
          <CodeIcon className="-ml-1 mr-2 h-5 w-5" />
          Upload Solution
        </button> */}

        <Button
          Icon={CodeIcon}
          onClick={() => router.asPath !== "/upload" && router.push("/upload")}
        >
          Upload Solution
        </Button>

        {/* Profile dropdown */}
        <Menu as="div" className="ml-3 relative -mt-1">
          <div>
            <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full border focus:outline-none">
              <img className="h-8 w-8 rounded-full" src={session.user.image} alt="" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigation.map(item => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <button
                      onClick={() => signOut()}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "text-left w-full px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      {item.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
