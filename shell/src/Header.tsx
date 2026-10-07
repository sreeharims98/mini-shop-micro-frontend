import { Link, NavLink } from "react-router";
import styles from "./Header.module.css";

export default function Header(props: {
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <header className={styles.fascia}>
      <div className={styles.bar}>
        <h1 className={styles.title}>
          <Link to="/" className={styles.brand}>
            Mini Shop
          </Link>
        </h1>
        <input
          type="search"
          className={styles.search}
          placeholder="Search products"
          aria-label="Search products"
          value={props.query}
          onChange={(event) => props.onQueryChange(event.target.value)}
        />
        {/* NavLink sets aria-current="page" on the cart route; the stylesheet keys off it. */}
        <NavLink to="/cart" className={styles.cart}>
          Cart
        </NavLink>
      </div>
    </header>
  );
}
