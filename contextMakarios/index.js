import { createContext, useReducer  } from 'react';
import { makariosReducer } from './contextReducer';



const initialState = {
  precio: '',
  fechaCita: "",
  horaCita: "8:40",
};


export const UserCitaContext = createContext();

export const MakariosProvider = (props) => {
	
	const [state, dispatch] = useReducer(makariosReducer, initialState);
	
    return <MakariosProvider.Provider value={{ state, dispatch }}>{props.children}</MakariosProvider.Provider>;
};

