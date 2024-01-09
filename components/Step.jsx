const Step = ({ number, title, desc }) => (
  <div>
    <div className="flex items-center justify-center w-14 h-14 mx-auto bg-white border border-gray-200 rounded-full shadow-sm">
      <span className="text-xl font-semibold text-gray-700">{number}</span>
    </div>
    <h3 className="mt-4 text-xl font-semibold leading-tight md:mt-6">{title}</h3>
    <p className="mt-4 text-base text-gray-600">{desc}</p>
  </div>
);

export default Step;