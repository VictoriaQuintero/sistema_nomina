import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddModalBonificaciones({
  isEdit,
  id,
  update,
  bonificacionData,
}) {
  const [openModal, setOpenModal] = useState(false);

  //estados para el fetch
  const [monto, setMonto] = useState(
    isEdit ? bonificacionData.monto_bonificacion : ""
  );
  const [descripcion, setDescripcion] = useState(
    isEdit ? bonificacionData.descripcion_bonificacion : ""
  );

  const mutation = useMutation(
    (datos) => {
      const res = fetch(
        isEdit
          ? "http://localhost:3000/EditarBonificacion"
          : "http://localhost:3000/RegistrarBonificacion",
        {
          method: isEdit ? "PUT" : "POST",
          body: JSON.stringify(datos),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      return res;
    },
    {
      onSuccess: (data) => {
        if (data.ok !== true) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: isEdit
              ? "Bonificación Editado!"
              : "Bonificación registrado!",
            icon: "success",
            timer: 3000,
          });
          update();
        }
        setOpenModal(false);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = isEdit
      ? {
          idbonificaciones: id,
          monto,
          descripcion,
        }
      : {
          monto,
          descripcion,
        };
    mutation.mutate(datos);
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={
          isEdit
            ? ""
            : "flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
        }
      >
        {isEdit ? (
          <FaRegEdit />
        ) : (
          <>
            Añadir Bonificación <FaPlus className="text-xl" />
          </>
        )}
      </button>
      <div
        className={`${
          openModal ? "grid" : "hidden"
        } fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`grid fixed bg-DarkBlue right-5 w-3/4 h-3/4 place-items-center z-10 rounded-lg`}
        >
          <form
            className="flex flex-col items-center h-full justify-between gap-5 p-4"
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className="text-white text-left w-full border-b-2 border-white p-3">
              Ingrese los datos de la Bonificación
            </h2>
            <div className="flex flex-col items-center gap-4">
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese la descripcion de la deducción"
              />
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Ingrese el monto de la deducción"
              />
            </div>
            <div className="w-full border-t-2 border-white p-3 flex justify-end gap-3">
              <input
                className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded"
                type="submit"
                value="Enviar"
              />
              <input
                className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded"
                type="button"
                value="Cancelar"
                onClick={() => {
                  setOpenModal(false);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
