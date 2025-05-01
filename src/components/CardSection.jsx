import CardComponent from './CardComponent';

export default function CardSection({ id, title, subtitle, results, bgColor = "bg-white" }) {
  return (
    <section id={id} className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-left md:items-center mb-12 px-4 md:px-0">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-black">
              {title}
            </h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <CardComponent 
              key={index}
              result={result} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}