import {useMutation, useQuery } from 'react-query'
import AddModalPagos from './AddModalPagos';
import {FaRegTrashAlt, FaUserTie} from 'react-icons/fa'
import Swal from 'sweetalert2';

export default function Pagos() {
  const mutation = useMutation(
    (data) => {
      const res = fetch("http://localhost:3000/EliminarBancos", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        console.log(data)
        if (data.ok !== true) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Cuenta Eliminada!",
            icon: "success",
            timer: 3000,
          });
          bancos.refetch();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (e, id) => {
    e.preventDefault();
    const data = {
      idbancos: id,
    };
    mutation.mutate(data);
  };

  const bancos = useQuery("bancos", () =>
    fetch("http://localhost:3000/ListarBanco").then((res) => res.json())
  );
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  if (bancos.isLoading) {
    return <span>Cargando...</span>;
  }
  return (
      <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> Bancos en la empresa
          </h1>
          <AddModalPagos isEdit={false} update={bancos.refetch} />
        </nav>
        {bancos.data.error ? (
          <>No hay</>
        ) : (
          <table className=" border-collapse border-2">
            <thead>
              <tr>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  CODIGO
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  NOMBRE
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  NUMERO DE CUENTA
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  ACTION
                </th>
              </tr>
            </thead>
            {bancos.data && (
              <tbody>
                {bancos.data.map((banco) => (
                  <tr key={bancos.idbancos}>
                    <td className={tableStyle}>{banco.codigo}</td>
                    <td className={tableStyle}>{banco.nombre}</td>
                    <td className={tableStyle}>{banco.cuenta}</td>
                    <td className="border-b-2">
                      <div className="flex items-center justify-center text-2xl gap-3">
                        <button>
                          <FaRegTrashAlt
                            onClick={(e) => handleDelete(e, banco.idbancos)}
                          />
                        </button>
                        <AddModalPagos
                          id={banco.idbancos}
                          isEdit={true}
                          update={bancos.refetch}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
  );
}
