/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "/pagesComponents/ecommerce/orders/order-list/components/DefaultCell";
import IdCell from "/pagesComponents/ecommerce/orders/order-list/components/IdCell";
import StatusCell from "/pagesComponents/ecommerce/orders/order-list/components/StatusCell";
// @mui material components
// NextJS Material Dashboard 2 PRO components
// Images
import MDBadge from "/components/MDBadge";

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
      Cell: ({ value }) => <DefaultCell value={"$ " + value}/>,
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
        
          // status = <StatusCell icon="close" color="dark" status={value} />;
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

  ],
};

export default dataTableData;
