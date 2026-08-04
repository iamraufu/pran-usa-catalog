import { useEffect, useState } from "react";
import { Search, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";

import { getProducts } from "./api/products";

import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import OrderDrawer from "./components/OrderDrawer";
import Settings from "./components/Settings";
import Toast from "./components/Toast";
import ProductSkeleton from "./components/ProductSkeleton";
import CategoryNav from "./components/CategoryNav";
import CategorySkeleton from "./components/CategorySkeleton";

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("ALL");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();

        setProducts(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const categories = ["ALL", ...new Set(products.map((p) => p.Category_Name))];

  const filtered = products.filter((product) => {
    const matchSearch = product.Item_Name.toLowerCase().includes(
      search.toLowerCase(),
    );

    const matchCategory =
      category === "ALL" || product.Category_Name === category;

    return matchSearch && matchCategory;
  });

  return (
    <div
      className="
min-h-screen
bg-gray-100
"
    >
      {/* HEADER */}

      <header
        className="
  bg-gradient-to-r
  from-red-600
  to-red-700
  text-white
  sticky
  top-0
  z-50
  shadow-lg
  "
      >
        <div
          className="
    w-full
    px-4
    sm:px-6
    lg:px-8
    py-3
    sm:py-4
    "
        >
          <div
            className="
      flex
      items-center
      justify-between
      "
          >
            <div>
              <h1
                className="
          text-xl
          sm:text-2xl
          lg:text-3xl
          font-bold
          "
              >
                PRAN Product Catalog
              </h1>

              <p
                className="
          hidden
          sm:block
          mt-1
          text-red-100
          "
              >
                Premium Food & Beverage Collection
              </p>
            </div>

            <button
              onClick={() => setShowSettings(true)}
              className="
        bg-white/20
        hover:bg-white/30
        rounded-xl
        px-3
        py-2
        text-sm
        transition
        "
            >
              ⚙️
            </button>
          </div>

          <div
            className="
      mt-3
      bg-white
      rounded-2xl
      flex
      items-center
      px-4
      shadow-md
      "
          >
            <Search
              className="
        text-gray-400
        flex-shrink-0
        "
            />

            <input
              className="
        w-full
        p-3
        sm:p-4
        outline-none
        text-gray-800
        text-sm
        sm:text-base
        "
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

{/* CATEGORY */}
      {loading ? (
        <CategorySkeleton />
      ) : (
        <CategoryNav
          categories={categories}
          products={products}
          category={category}
          setCategory={setCategory}
        />
      )}

      </header>

      <main className="w-full px-3 sm:px-6 lg:px-8">
        {/* PRODUCTS */}

        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
md:grid-cols-2
lg:grid-cols-3
xl:grid-cols-3
2xl:grid-cols-4
gap-5
"
        >
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : filtered.map((product) => (
                <motion.div
                  key={product.column_id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  <ProductCard
                    product={product}
                    open={() => setSelectedProduct(product)}
                  />
                </motion.div>
              ))}
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        close={() => setSelectedProduct(null)}
      />

      <OrderDrawer />

      {/* SETTINGS MODAL */}

      {showSettings && (
        <div
          onClick={() => setShowSettings(false)}
          className="
fixed
inset-0
bg-black/50
backdrop-blur-sm
z-50
flex
items-center
justify-center
p-5
"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            className="
bg-white
rounded-3xl
shadow-2xl
w-full
max-w-md
overflow-hidden
"
          >
            <Settings
              close={() => setShowSettings(false)}
              showToast={(msg) => {
                setToast(msg);

                setTimeout(() => {
                  setToast("");
                }, 2500);
              }}
            />
          </motion.div>
        </div>
      )}
      {toast && <Toast message={toast} />}
    </div>
  );
}
