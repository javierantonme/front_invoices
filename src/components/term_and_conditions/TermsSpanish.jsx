const TermsSpanish = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg max-w-3xl w-full p-6">
        <h1 className="text-3xl font-bold text-blue-500 mb-4 text-center">
          Términos y Condiciones
        </h1>
        <p className="text-gray-700 mb-4">
          Gracias por utilizar <strong>InvoiceApp</strong>, una plataforma
          creada con fines personales y educativos. Antes de usar la plataforma,
          es importante que leas y aceptes los siguientes términos y
          condiciones. Al utilizar InvoiceApp, reconoces y aceptas las
          disposiciones descritas a continuación:
        </p>
        <ol className="list-decimal list-inside text-gray-700 space-y-3">
          <li>
            <strong>Uso de la plataforma bajo tu responsabilidad: {" "}</strong>
            InvoiceApp es un proyecto personal, y aunque hemos hecho un esfuerzo
            significativo para garantizar su correcto funcionamiento,
            <strong>
             {" "}no garantizamos la precisión o fiabilidad de los cálculos
              realizados por la plataforma
            </strong>
            . Los usuarios aceptan que es su responsabilidad verificar la
            exactitud de los datos generados y cualquier uso que hagan de los
            mismos será bajo su propio riesgo.
          </li>
          <li>
            <strong>Disponibilidad del servicio: {" "}</strong>
            InvoiceApp es un proyecto que puede estar{" "}
            <strong>
              fuera de servicio temporalmente o de forma permanente sin previo
              aviso
            </strong>
            . No garantizamos la disponibilidad continua de la plataforma ni la
            resolución inmediata de problemas técnicos.
          </li>
          <li>
            <strong>Almacenamiento de información: {" "}</strong>
            InvoiceApp no asegura el almacenamiento permanente de los datos
            cargados o generados por los usuarios. Por lo tanto, los usuarios
            aceptan la responsabilidad de{" "}
            <strong>
              descargar y guardar sus propias facturas o datos relevantes de
              forma local
            </strong>
            .
          </li>
          <li>
            <strong>Cambios en el diseño y procesos: {" "}</strong>
            La plataforma se encuentra en constante evolución y{" "}
            <strong>
              podríamos realizar cambios en su diseño, funcionalidad o procesos
              sin previo aviso
            </strong>
            . Esto incluye modificaciones que puedan afectar la forma en que los
            usuarios interactúan con la plataforma.
          </li>
          <li>
            <strong>Exclusión de responsabilidad: {" "}</strong>
            InvoiceApp no se hace responsable por daños directos o indirectos
            que puedan derivarse del uso de la plataforma, incluida la pérdida
            de datos, errores en cálculos, interrupciones en el servicio o
            cualquier otro inconveniente que pueda surgir.
          </li>
          <li>
            <strong>Aceptación de riesgos: {" "}</strong>
            Al utilizar InvoiceApp, aceptas que comprendes y aceptas los riesgos
            asociados al uso de un proyecto personal, incluyendo posibles
            fallos, pérdida de datos, o errores en las funcionalidades.
          </li>
          <li>
            <strong>Modificación de los términos y condiciones: {" "}</strong>
            Nos reservamos el derecho de modificar estos términos y condiciones
            en cualquier momento sin previo aviso. La versión más reciente
            estará siempre disponible en la plataforma, y será responsabilidad
            del usuario revisarla periódicamente.
          </li>
        </ol>
        <p className="text-gray-700 mt-6 text-center">
          Si tienes preguntas o necesitas más información, por favor contacta al
          administrador de la plataforma.
        </p>
      </div>
    </div>
  );
};

export default TermsSpanish;
