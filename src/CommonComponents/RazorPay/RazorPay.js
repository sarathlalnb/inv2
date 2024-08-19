// import React, { useEffect, useRef } from "react";
// import { Helmet } from "react-helmet";

// function RazorPay() {
//   const formRef = useRef(null);

//   useEffect(() => {
//     const formElement = formRef.current;

//     // Create script element
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/payment-button.js";
//     script.setAttribute("data-payment_button_id", "pl_OUhLbVWs7ofSOF");
//     script.async = true;

//     // Append the script to the form
//     if (formElement) {
//       formElement.appendChild(script);
//     }

//     // Cleanup function to remove the script when the component unmounts
//     return () => {
//       if (formElement) {
//         formElement.removeChild(script);
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <form ref={formRef}>
//         <form ref={formRef}>
//           {/* The Razorpay button will be added here by the script */}
//         </form>
//       </form>
//     </div>
//   );
// }

// export default RazorPay;
