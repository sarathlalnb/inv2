import React, { useEffect, useState } from "react";
import Header from "../../CommonComponents/Header/Header";
import { Container } from "react-bootstrap";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";

function PaymentHistory() {
  // NAV OBJECT
  const navObj = [
    { text: "Dashboard", link: "/investor/home" },
    { text: "My Projects", link: "/investor/projects" },
    { text: "Payments", link: "/investor/payments" },
    { text: "Messages", link: "/investor/messages" },
  ];

  //REQUEST
  const { request: getPayment } = useApi("get");

  //STATE
  const [paymentHistory, setPaymentHistory] = useState({});
  console.log(paymentHistory);

  //   GET PAYMENT HISTORY FUNCTION
  const getPaymentHistory = async () => {
    try {
      let url = `${endpoints.PAYMENT_HISTORY}`;
      let apiResponse = await getPayment(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setPaymentHistory(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPaymentHistory();
  }, []);

  return (
    <>
      <Header navObj={navObj} />
      <Container className="py-5">
        <h3>Payment History</h3>
        {paymentHistory?.length > 0 ? (
          <table className="w-100 text-center">
            <thead>
              <tr
                className="mb-4"
                style={{
                  borderBottom: " 1px solid silver",
                  backgroundColor: "silver",
                }}
              >
                <th>Project</th>
                <th>Project Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: " 1px solid silver",
                    backgroundColor: "lightgrey",
                  }}
                >
                  <td>{item.project}</td>
                  <td>{item.project_name}</td>
                  <td className="pe-5">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-danger text-center">
            <b>No Projects Available....!</b>
          </div>
        )}
      </Container>
    </>
  );
}

export default PaymentHistory;
