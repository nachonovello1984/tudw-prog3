// import soap from 'soap';

// const url = 'http://localhost:8080/SoapJavaProject/HelloSoap?wsdl';

// const args = {
//   name: "Nacho Novello"
// };

// soap.createClient(url, (err, client) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   // Llama a una función del servicio web SOAP
//   client.hello(args, (err, result) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     console.log(result);
//   });
// });

// import soap from 'soap';

// const url = 'http://localhost:8080/SoapJavaProject/WsPersonas?wsdl';

// soap.createClient(url, (err, client) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   // Llama a una operación del servicio web SOAP
//   client.findAll((err, result) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     console.log(result);
//   });
// });

import soap from 'soap';

try {
  const url = 'http://localhost:8080/SoapJavaProject/WsPersonas?wsdl';
  const args = null;
  const client = await soap.createClientAsync(url);
  const [result] = await client["findAllAsync"](args);
  console.log(result);
} catch (exc) {
  console.log(err);
}