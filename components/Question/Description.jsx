import parse from "html-react-parser";

export default function Description({ children }) {
  return <div className="prose overflow-visible	">{parse(children)}</div>;
}
