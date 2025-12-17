import { CommentItem } from "../types/case.types";

export default function CommentList({ comments }: { comments: CommentItem[] }) {
  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg">Comments</h3>
      <div className="flex flex-col gap-3 mt-2">
        {comments.map((c) => (
          <div key={c.id} className="p-2 border rounded bg-gray-50">
            <p className="font-medium">{c.author}</p>
            <p className="text-sm">{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
