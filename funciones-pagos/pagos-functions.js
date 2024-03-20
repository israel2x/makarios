const iniciarDatos=(dataPago)=> {
  console.log("INICIA DATOS");
    if (Data) {
        Data.init(dataPago);
    }
  }
  
  const reload=(data)=> {
    console.log("RELOAD DATA");
    if (Data) {
      Data.reload(data);
    }
  }
  
  export {iniciarDatos,reload};
  // export default iniciarDatos;