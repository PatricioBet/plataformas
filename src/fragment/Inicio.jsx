import logo from '../logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";

const Inicio = () => {
    return (
        
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="App">
                <p>
                    Práctica número 2 - Por: Patricio Betancourt
                </p>
                <div className="d-flex flex-column" >
                <a type="button" href={"/agregar"} class="btn btn-success">Añadir</a>
                <a type="button" href={"/listar"} class="btn btn-primary">Listar y editar</a>
                </div>
                </div>
            </header>
        
    );
}

export default Inicio;