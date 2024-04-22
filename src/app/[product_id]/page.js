import Product_page_component from "@/components/app_components/product_page_component";

   
   const page = ({params}) => {
     const id=params.product_id;
    return (
       <div>
         <Product_page_component id={id}></Product_page_component>
       </div>
     )
   }
   
   export default page
   