export default function FooterNav() {
  return (
    <div>
      <h2 className="text-lg font-bold bg-white bg-clip-text text-transparent">
        Navigation
      </h2>
      <ul className="mt-2 space-y-2 text-gray-200">
        {["home", "about", "hotel", "contact"].map((item) => (
          <li key={item} className="hover:text-white capitalize">
            <a
              href={
                item === "home"
                  ? "#"
                  : `#${item === "about" ? "about" : "hotel"}`
              }>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
