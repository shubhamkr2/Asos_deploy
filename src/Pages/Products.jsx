import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ProductCard from "../Components/ProductCard/ProductCard";
import "./Products.css";
import axios from "axios";

import { Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";
import { CartContext } from "../Context/CartContext/CartContext";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const { wishlistedItems } = useContext(CartContext);
  const fetchProducts = () => {
    setloading(true);
    axios(`http://localhost:8080/products`).then((res) => {
      setProducts(res.data);
      setloading(false);
    });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Navbar />
      <div className="products-container">
        {loading ? (
          <Box
            boxShadow="lg"
            bg="white"
            width={"90vw"}
            height="80vh"
            margin="auto"
          >
            <Box padding="6" bg="white" width={"90vw"} margin="auto">
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
            <Box padding="6" bg="white" width={"90vw"} margin="auto">
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
            <Box padding="6" bg="white" width={"90vw"} margin="auto">
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
          </Box>
        ) : (
          products.map((el) => {
            const isWishlisted = wishlistedItems.find(({ id }) => el.id === id);
            if (isWishlisted)
              return (
                <ProductCard product={el} wishliststate={true} key={el.id} />
              );
            else return <ProductCard product={el} key={el.id} />;
          })
        )}
      </div>
    </>
  );
};

export default Products;
