import { Disclosure } from "@headlessui/react"
import { ChevronRightIcon } from "@heroicons/react/solid"

export default function Title() {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="min-h-[30rem]">
          <Disclosure.Button>
            <div className="flex items-center space-x-2 bg-gray-100 shadow-sm rounded">
              <span>Alex's solution</span>

              <ChevronRightIcon className={`${open ? "rotate-90" : ""} h-5 w-5`} />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel>
            <div>Solution Here</div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
