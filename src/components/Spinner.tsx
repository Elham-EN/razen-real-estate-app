import spinner from "../assets/svg/Blocks-1s-200px.svg";

export default function Spinner() {
  return (
    <div
      className="flex items-center justify-center fixed left-0 
        right-0 bottom-0 top-0 z-50 bg-red-300"
    >
      <div>
        <img src={spinner} alt="Loading..." />
      </div>
    </div>
  );
}
