export default function ArticleCard({ result }) {
    return (
      <div className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
        <div className="relative w-full aspect-square overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
          <img 
            src={result.image_url} 
            alt={result.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {result.name}
          </h3>
          <p className="text-gray-600 font-medium">
            IDR {result.price}
          </p>
        </div>
      </div>
    );
}