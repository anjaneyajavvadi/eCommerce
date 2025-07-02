import React, { use, useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

const RelatedProducts = ({category,subcategory}) => {

    const {products}=useContext(ShopContext);
    const [related,setRelated]=useState([]);

    useEffect(()=>{
        if(products.length>0){
            let productsCopy=[...products];
            productsCopy=productsCopy.filter((item)=>item.category===category && item.subCategory===subcategory);
        }
    },[products,category,subcategory]);
  return (
    <div>RelatedProducts</div>
  )
}

export default RelatedProducts