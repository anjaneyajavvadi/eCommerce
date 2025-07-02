import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products ,search,showSearch} = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, sortType,search,showSearch]);

  const applyFilter = () => {
    let productsCopy = [...products];
    if(showSearch &&search){
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break; // 'relevant' => no sort
    }

    setFilteredProducts(productsCopy);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 cursor-pointer my-2 text-xl"
        >
          <p className="text-inherit">FILTERS</p>
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden transition-transform duration-200 ${
              showFilter ? 'rotate-90' : ''
            }`}
            alt="toggle"
          />
        </div>

        {/* Category Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={cat}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub-Category Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
              <label key={sub} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={sub}
                  onChange={toggleSubCategory}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by Price: Low to High</option>
            <option value="high-low">Sort by Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
