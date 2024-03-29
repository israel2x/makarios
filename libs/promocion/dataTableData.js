/* eslint-disable react/prop-types */
// ProductsList page components
import IdCell from "/pagesComponents/ecommerce/orders/order-list/components/IdCell";
import DefaultCell from "/pagesComponents/ecommerce/orders/order-list/components/DefaultCell";
import StatusCell from "/pagesComponents/ecommerce/orders/order-list/components/StatusCell";
import CustomerCell from "/pagesComponents/ecommerce/orders/order-list/components/CustomerCell";
import MDBadge from "/components/MDBadge";
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
        Header: "Detalle",
        accessor: "detalle",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
    {
      Header: "Codigo",
      accessor: "codigo",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Porcentaje",
      accessor: "porcentaje",
      Cell: ({ value }) => <DefaultCell value={value+ ' %'} />,
    },
    {
      Header: "Actividad",
      accessor: "actividad",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
        Header: "fecha Inicio",
        accessor: "fechainicio",
        Cell: ({ value }) => <DefaultCell value={value.split('T')[0]} />,
      },
      {
        Header: "fecha fin",
        accessor: "fechafin",
        Cell: ({ value }) => <DefaultCell value={value.split('T')[0]} />,
      },

    {
      Header: "Estado",
      accessor: "estado",
      Cell: ({ value }) => {
        let status;

        if (value === "A") {
          status = <MDBadge badgeContent="Activo" size="xs" color="success" container />
           // status = <StatusCell icon="done" color="success" status={value} />;
         } else if (value === "I") {
           status = <MDBadge badgeContent="Inactivo" size="xs" color="light" container />
        }  else {
          status = <StatusCell icon="close" color="error" status="Canceled" />;
        }
        return status;
      },
    },
  
  ],

  rows: [
    {
      id: "#10431",
      date: "2 Nov, 3:12 PM",
      status: "paid",
      customer: ["Karl Innas", { image: "K" }],
      product: "Kitchen Gadgets",
      revenue: "$164,90",
    },
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
