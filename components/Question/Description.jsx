import parse from "html-react-parser"

export default function Description({ children }) {
  return <div className="prose">{parse(children)}</div>
}
