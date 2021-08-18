import { Disclosure } from "@headlessui/react"
import { ChevronRightIcon } from "@heroicons/react/solid"
import Markdown from "./Markdown"

export default function Solutions({ user, children }) {
  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <Disclosure.Button>
            <div className="flex items-center font-semibold bg-[#1F2937] text-white justify-between w-[40rem] px-3 py-3 shadow-sm rounded">
              <span>{user}'s Solution</span>

              <ChevronRightIcon className={`${open ? "rotate-90" : ""} h-5 w-5`} />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel>
            <div className="mt-3">
              <Markdown>{children}</Markdown>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
