export default function Review({ review }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <p className="italic">"{review.review}"</p>
      <p className="text-right font-bold mt-2">- {review.name}</p>
    </div>
  )
}