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
      Header: "Fecha registro",
      accessor: "date",
      Cell: ({ value }) => <DefaultCell value={value.split('T')[0] + ' / '+ value.split('T')[1].split('-')[0]} />,
    },
    {
      Header: "participante",
      accessor: "customer",
      Cell: ({ value: [name, data] }) => (
        <CustomerCell
          image={data.image}
          color={data.color || "dark"}
          name={name}
        />
      ),
    },
    // {
    //   Header: "status",
    //   accessor: "status",
    //   Cell: ({ value }) => {
    //     let status;

    //     if (value === "Paid") {
    //       status = <StatusCell icon="done" color="success" status={value} />;
    //     } else if (value === "I") {
    //       status = <StatusCell icon="close" color="dark" status={value} />;
    //     } else {
    //       status = <StatusCell icon="close" color="error" status="Canceled" />;
    //     }
    //     return status;
    //   },
    // },

    {
      Header: "Actividad",
      accessor: "product",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Programación",
      accessor: "program",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Promoción",
      accessor: "promocion",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Valor",
      accessor: "revenue",
      Cell: ({ value }) => <DefaultCell value={value} money={false} />,
    },
    // {
    //   Header: "fecha de creación",
    //   accessor: "createdAt",
    //   Cell: ({ value }) => <DefaultCell value={value.split('T')[0]} />,
    // },
  ],

  rows: [
    
    {
      id: "#10422",
      date: "1 Nov, 10:53 AM",
      status: "paid",
      customer: ["Alice Murinho", { image: team1 }],
      product: "Valvet T-shirt",
      revenue: "$42,00",
    },
    {
      id: "#10423",
      date: "1 Nov, 11:13 AM",
      status: "refunded",
      customer: ["Michael Mirra", { image: "M" }],
      product: ["Leather Wallet", { suffix: "+1 more" }],
      revenue: "$25,50",
    },
   
  ],
};

export default dataTableData;
