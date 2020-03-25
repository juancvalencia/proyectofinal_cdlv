//definir la configuración del proyecto
module.exports={

    entry:'./src/app/index.js',        //Ruta de entrada
    output:{
            path: __dirname + '/src/public',    //Ruta de salida -- aqui tambien puedo llamar modulos NodeJS
            filename: 'bundle.js'               //codigo convertido y compado
            },

//Traducir codigo moderno
// ...
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ],
  }
  // ...









};