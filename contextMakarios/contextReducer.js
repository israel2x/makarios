
export const makariosReducer = (state, action) => {
    switch (action.type) {
      case 'SET_PRECIO':
        return { ...state, precio: action.payload };
      case 'SET_FECHA_CITA':
        return { ...state, fechaCita: action.payload };

      default:
        return state;
    }
  };
  
  
  