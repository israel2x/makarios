/* eslint-disable react/prop-types */
// ProductsList page components
import IdCell from "/pagesComponents/ecommerce/orders/order-list/components/IdCell";
import DefaultCell from "/pagesComponents/ecommerce/orders/order-list/components/DefaultCell";
import StatusCell from "/pagesComponents/ecommerce/orders/order-list/components/StatusCell";
import CustomerCell from "/pagesComponents/ecommerce/orders/order-list/components/CustomerCell";

// Images
import team1 from "/assets/images/team-1.jpg";
import team2 from "/assets/images/team-2.jpg";
import team3 from "/assets/images/team-3.jpg";
import team4 from "/assets/images/team-4.jpg";
import team5 from "/assets/images/team-5.jpg";
import ivana from "/assets/images/ivana-squares.jpg";

const dataTableData = {
  columns: [
    {
      Header: "id",
      accessor: "id",
      Cell: ({ value }) => <IdCell id={value} />,
    },
    {
      Header: "descripción",
      accessor: "descripcion",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "precio",
      accessor: "precio",
      Cell: ({ value }) => <DefaultCell value={"$ " + value} />,
    },
    {
      Header: "Estado",
      accessor: "estado",
      Cell: ({ value }) => {
        let status;

        if (value === "A") {
          status = <StatusCell icon="done" color="success" status={value} />;
        } else if (value === "I") {
          status = <StatusCell icon="close" color="dark" status={value} />;
        } else {
          status = <StatusCell icon="close" color="error" status="Canceled" />;
        }
        return status;
      },
    },
    {
      Header: "fecha de creación",
      accessor: "createdAt",
      Cell: ({ value }) => <DefaultCell value={value.split('T')[0]} />,
    },
  ],

  rows: [
   
    {
      id: "#10432",
      date: "2 Nov, 5:12 PM",
      status: "paid",
      customer: ["Oana Kilas", { image: "O", color: "info" }],
      product: "Office Papers",
      revenue: "$23,90",
    },
  ],
};

export default dataTableData;
