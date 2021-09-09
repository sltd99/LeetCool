import Chip from "@/components/Base/Chip";

export default function Tags({ tags }) {
  return (
    <div className="flex space-x-1 mt-5">
      {tags && tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}
    </div>
  );
}
