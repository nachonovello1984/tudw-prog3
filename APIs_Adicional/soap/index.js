const soap = require('soap');

const url = 'http://localhost:8080/SoapJavaProject/HelloSoap?wsdl';

const args = {
  name: "Nacho Novello"
};

soap.createClient(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  // Llama a una función del servicio web SOAP
  client.hello(args, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(result);
  });
});

// const soap = require('soap');

// const url = 'http://localhost:8080/SoapJavaProject/PersonasSoap?wsdl';

// const args = {
//   persona:{
//     apellido: "Novello",
//     nombre: "Ignacio",
//     edad: 38
//   }
// };

// soap.createClient(url, (err, client) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   // Llama a una función del servicio web SOAP
//   client.playback(args, (err, result) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     console.log(result);
//   });
// });