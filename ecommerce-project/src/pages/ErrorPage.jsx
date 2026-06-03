import { Header } from "../components/Header";
import "./ErrorPage.css";

export function ErrorPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <h1 className="text">Page not found</h1>
    </>
  );
}
