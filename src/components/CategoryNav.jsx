import { X, Menu } from "lucide-react";
import { useState } from "react";

export default function CategoryNav({
  categories,
  products,
  category,
  setCategory,
}) {
  const [open, setOpen] = useState(false);

  function selectCategory(cat) {
    setCategory(cat);
    setOpen(false);
  }

  function getCount(cat) {
    return cat === "ALL"
      ? products.length
      : products.filter((p) => p.Category_Name === cat).length;
  }

  return (
    <>
      {/* DESKTOP CATEGORY */}

      <div
        className="
        hidden
        md:block
        bg-white/10
backdrop-blur-md
border-t
border-white/20
        "
      >
        <div
          className="
          w-full
          px-3
          sm:px-6
          lg:px-8
          py-3
          flex
          gap-3
          overflow-x-auto
          "
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                window.scrollTo(0, 0);
              }}
              className={`
              whitespace-nowrap
              px-5
              py-3
              rounded-xl
              font-medium
              transition
bg-white
text-red-600
              ${
                category === cat
                  ? "bg-white text-red-600 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }

              `}
            >
              {cat}

              <span
                className="
                ml-2
                text-xs
                opacity-70
                "
              >
                ({getCount(cat)})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE CATEGORY BUTTON */}

      <div
        className="
        md:hidden
        bg-gray-100
        px-3
        py-3
        "
      >
        <button
          onClick={() => setOpen(true)}
          className="
  w-full
  bg-white
  text-red-600
  rounded-xl
  py-3
  font-semibold
  shadow-sm
  border
  border-red-100
  flex
  items-center
  justify-center
  gap-2
  hover:bg-red-50
  transition
  "
        >
          <Menu size={18} />

          {category === "ALL" ? "All Products" : category}
        </button>
      </div>

      {/* MOBILE SIDEBAR */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
          fixed
          inset-0
          z-50
          bg-black/40
          md:hidden
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
           absolute
 left-0
 top-0
 bottom-0
 w-72
 bg-white
 shadow-xl
 overflow-y-auto
 p-2
            "
          >
            <div
              className="
  flex
  items-center
  justify-between
  px-5
  py-4
  mb-3
  border-b
  border-gray-200
  "
            >
              <div>
                <h2
                  className="
      text-xl
      font-bold
      text-gray-800
      "
                >
                  Categories
                </h2>

                <p
                  className="
      text-sm
      text-gray-500
      mt-1
      "
                >
                  Select products by category
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    bg-gray-100
    hover:bg-red-100
    text-gray-600
    hover:text-red-600
    transition
    "
              >
                <X size={20} />
              </button>
            </div>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  selectCategory(cat)
                window.scrollTo(0,0)
                }}
                className={`
w-full
text-left
px-4
py-3
rounded-xl
mb-2
flex
justify-between
items-center
transition

${
  category === cat
    ? "bg-red-600 text-white shadow-md"
    : "text-gray-700 hover:bg-gray-100"
}

`}
              >
                {cat}

                <span
                  className={`
  text-sm
  ${category === cat ? "text-white/80" : "text-gray-400"}
  `}
                >
                  {getCount(cat)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
