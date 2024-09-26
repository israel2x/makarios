/* eslint-disable react/prop-types */
// ProductsList page components
import MDBadge from "/components/MDBadge";
import DefaultCell from "/pagesComponents/ecommerce/orders/order-list/components/DefaultCell";
import IdCell from "/pagesComponents/ecommerce/orders/order-list/components/IdCell";
import StatusCell from "/pagesComponents/ecommerce/orders/order-list/components/StatusCell";
// Images

const dataTableData = {
  columns: [
    {
      Header: "id",
      accessor: "id",
      Cell: ({ value, checked }) => <IdCell id={String(value)} checked={checked} />,
    },
    {
      Header: "Actividad",
      accessor: "actividad",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
        Header: "Detalle",
        accessor: "detalle",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "fecha tope",
        accessor: "fechatope",
        Cell: ({ value }) => <DefaultCell value={value.split('T')[0]} />,
      },
      {
        Header: "Cupos habilitados",
        accessor: "cupo",
        Cell: ({ value }) => <DefaultCell value={String(value)} />,
      },
      {
        Header: "Registrados",
        accessor: "registrados",
        Cell: ({ value }) => <DefaultCell value={value>0 ? value : ''} />,
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
        } else {
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
