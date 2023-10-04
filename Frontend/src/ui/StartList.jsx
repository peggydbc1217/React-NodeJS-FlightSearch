import Star from "./Star";

function StartList({ starsLength }) {
  return (
    <ul className="list-unstyled d-flex gap-1 gap-sm-3 me-12 mb-12">
      {Array.from({ length: starsLength }, (_, i) => (
        <Star key={i}></Star>
      ))}
    </ul>
  );
}

export default StartList;
