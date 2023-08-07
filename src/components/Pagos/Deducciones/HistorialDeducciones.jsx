import { useQuery } from "react-query";
import { FaUserTie, FaRegTrashAlt } from "react-icons/fa";
import { sesion } from "../../../context/ValidateSesion";
import { useContext } from "react";

export default function HistorialDeducciones() {
  const { setLoader } = useContext(sesion);

  const deduccionesHisto = useQuery("deduccionesHisto", () =>
    fetch("http://localhost:3000/ListarHistorialD").then((res) => res.json())
  );

  if (deduccionesHisto.isLoading) {
    setLoader(true);
    return <></>;
  }

  if (deduccionesHisto.isSuccess) {
    setLoader(false);
  }

  return (
    <>
      <div className="w-11/12 flex flex-col items-center gap-10">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> Historial deducciones en la
            empresa
          </h1>
        </nav>
        {deduccionesHisto.data.error ? (
          <>No hay</>
        ) : (
          <table className="w-3/4 border-collapse border-2">
            <thead>
              <tr>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  Descripcion
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  Monto
                </th>
              </tr>
            </thead>
            {deduccionesHisto.data && (
              <tbody>
                {deduccionesHisto.data.map((deduccion) => (
                  <tr key={deduccion.iddeducciones}>
                    <td className={tableStyle}>
                      {deduccion.descripcion_deduccion}
                    </td>
                    <td className={tableStyle}>{deduccion.monto_deduccion}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
    </>
  );
}
