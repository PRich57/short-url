import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  // Log error to console for debugging purposes
  console.error(error);

  return (
    <div id="error-page">
      <h2>Oops!</h2>
      <p>{error?.message || "An unknown error occurred."}</p>
      <button onClick={window.history.back}>Go Back</button>
    </div>
  );
}