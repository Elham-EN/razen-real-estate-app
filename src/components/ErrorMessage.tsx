interface props {
  data: string | number | boolean | undefined;
}

export default function ErrorMessage({ data }: props) {
  return (
    <div
      className={`${
        data
          ? "mt-3 bg-red-600 text-white py-2 px-3 text-center rounded shadow-md"
          : ""
      }`}
    >
      {data ? <div>{data}</div> : null}
    </div>
  );
}
