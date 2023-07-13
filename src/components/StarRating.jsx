export default function ({ rating }) {
    
    const starRating = Math.ceil((rating / 100) * 5);

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((_, index) => (
            <span
                key={index}
                className={`text-2xl ${
                index < starRating ? 'text-yellow-500' : 'text-gray-400'
                }`}
            >
            ★
            </span>
            ))}
        </div>
    )
}