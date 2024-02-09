const iniciarDatos=(dataPago)=> {
    if (Data) {
        Data.init(dataPago);
    }
  }
  
  const reload=(data)=> {
    if (Data) {
      Data.reload(data);
    }
  }
  
  export {iniciarDatos,reload};
  // export default iniciarDatos;