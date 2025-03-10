import Products from "./Products";
import styles from "../components/home.module.css"

export default function Home(props) {
  const {addToCart} = props
  console.log("ProductList received props:", props);  
  return (
      <div>
        <h2 className={styles.center}><strong>Welcome to the Stack</strong></h2>
        <h2 className={styles.centertwo}><strong>Featured Products</strong></h2>
        <Products addToCart={addToCart}/>
      </div>
    );
  }