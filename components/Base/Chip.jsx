import classNames from "classnames"

export default function Chip({ children, className }) {
  return (
    <div
      className={classNames(
        className,
        "px-2 py-0.5 inline-flex text-sm leading-5 font-semibold rounded-full bg-gray-100 text-gray-900",
        children === "Easy" && "bg-green-100 text-green-600",
        children === "Medium" && "bg-yellow-100 text-yellow-600",
        children === "Hard" && "bg-red-100 text-red-500"
      )}
    >
      {children}
    </div>
  )
}
