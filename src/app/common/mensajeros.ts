import {Injectable} from "@angular/core";

@Injectable()
export class Mensajeros {

  public static mensajeros=[
    {
      id:1,
      actividad:true,
      nombre: "Jairo Ortiz",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/42.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/42.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/42.jpg"
      }
    },
    {
      id:2,
      actividad:true,
      nombre: "Lenin Guzmán",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/43.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/43.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/43.jpg"
      },
    },
    {
      id:3,
      actividad:true,
      nombre: "Rafael Farinango",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/44.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/44.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/44.jpg"
      },
    },
    {
      id:4,
      actividad:false,
      nombre: "Óscar Apraez",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/45.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/45.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/45.jpg"
      },
    },
    {
      id:5,
      actividad:false,
      nombre: "Jonnathan Lovato",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/46.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/46.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/46.jpg"
      },
    },
    {
      id:6,
      actividad:false,
      nombre: "Jorge Mite Guayaquil",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture:{
        large:"https://randomuser.me/api/portraits/women/16.jpg",
        medium:"https://randomuser.me/api/portraits/med/women/16.jpg",
        thumbnail:"https://randomuser.me/api/portraits/thumb/women/16.jpg"
      },
    },
    {
      id:7,
      actividad:false,
      nombre: "Franklin Velázquez Guayaquil",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/48.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/48.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/48.jpg"
      },
    },
    {
      id:8,
      actividad:false,
      nombre: "Angel Alba",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/47.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/47.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      },
    },
    {
      id:9,
      actividad:false,
      nombre: "Maria Angustias Cervera",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/47.jpg",
        medium: "",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      },
    },
    {
      id:10,
      actividad:false,
      nombre: "Pascual Barea",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/47.jpg",
        medium: "",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      },
    },
    {
      id:11,
      actividad:false,
      nombre: "Armando de La Cruz",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/47.jpg",
        medium: "",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      },
    },
    {
      id:12,
      actividad:false,
      nombre: "Natália Rubio",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/47.jpg",
        medium: "",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      },
    },
    {
      id:13,
      actividad:false,
      nombre: "Eliseo Guillen",
      telefono: "593 96 991 6096",
      entregas:{
        mensajeria:5,
        delivery: 23
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/47.jpg",
        medium: "",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      },
    }
  ];

  public static entregasAc=[
    {
      fecha: "11/06/2020",
      tipo: "Delivery",
      local: "SOTOMAYOR ROCHE E HIJOS",
      entregaA: "Envío de documentos",
      detalle: "Retirar de dirección Ana de Ayala N 27-130 y La Touta y entregar en Barrio Vista Hermosa Calle B y Pasaje B, Lote 22 Las Casas, Tanya Saragozin +593 96-991-6096. Puede entregar hasta viernes max.",
      estatus: {
        id:"activo",
        fecha:""
      }
    },
    {
      fecha: "10/06/2020",
      tipo: "Delivery",
      local: "SOTOMAYOR ROCHE E HIJOS",
      entregaA: "Envío de documentos",
      detalle: "Retirar de dirección Ana de Ayala N 27-130 y La Touta y entregar en Barrio Vista Hermosa Calle B y Pasaje B, Lote 22 Las Casas, Tanya Saragozin +593 96-991-6096. Puede entregar hasta viernes max.",
      estatus: {
        id:"activo",
        fecha:""
      }
    },
    {
      fecha: "09/06/2020",
      tipo: "Mensajería",
      local: "SOTOMAYOR ROCHE E HIJOS",
      entregaA: "Envío de documentos 1",
      detalle: "Retirar de dirección Ana de Ayala N 27-130 y La Touta y entregar en Barrio Vista Hermosa Calle B y Pasaje B, Lote 22 Las Casas, Tanya Saragozin +593 96-991-6096. Puede entregar hasta viernes max.",
      estatus: {
        id:"Entregado",
        fecha:"09/06/2020"
      }
    },
    {
      fecha: "09/06/2020",
      tipo: "Delivery",
      local: "SOTOMAYOR ROCHE E HIJOS",
      entregaA: "Envío de documentos 2",
      detalle: "Retirar de dirección Ana de Ayala N 27-130 y La Touta y entregar en Barrio Vista Hermosa Calle B y Pasaje B, Lote 22 Las Casas, Tanya Saragozin +593 96-991-6096. Puede entregar hasta viernes max.",
      estatus: {
        id:"Entregado",
        fecha:"09/06/2020"
      }
    },
    {
      fecha: "09/06/2020",
      tipo: "Delivery",
      local: "SOTOMAYOR ROCHE E HIJOS",
      entregaA: "Envío de documentos 3",
      detalle: "Retirar de dirección Ana de Ayala N 27-130 y La Touta y entregar en Barrio Vista Hermosa Calle B y Pasaje B, Lote 22 Las Casas, Tanya Saragozin +593 96-991-6096. Puede entregar hasta viernes max.",
      estatus: {
        id:"Entregado",
        fecha:"09/06/2020"
      }
    },
    {
      fecha: "08/06/2020",
      tipo: "Mensajería",
      local: "SOTOMAYOR ROCHE E HIJOS",
      entregaA: "Envío de documentos 001",
      detalle: "Retirar de dirección Ana de Ayala N 27-130 y La Touta y entregar en Barrio Vista Hermosa Calle B y Pasaje B, Lote 22 Las Casas, Tanya Saragozin +593 96-991-6096. Puede entregar hasta viernes max.",
      estatus: {
        id:"Cancelado",
        fecha:"08/06/2020"
      }
    },
    {
      fecha: "08/06/2020",
      tipo: "Delivery",
      local: "SOTOMAYOR ROCHE E HIJOS",
      entregaA: "Envío de documentos 002",
      detalle: "Retirar de dirección Ana de Ayala N 27-130 y La Touta y entregar en Barrio Vista Hermosa Calle B y Pasaje B, Lote 22 Las Casas, Tanya Saragozin +593 96-991-6096. Puede entregar hasta viernes max.",
      estatus: {
        id:"Cancelado",
        fecha:"08/06/2020"
      }
    },
    {
      fecha: "08/06/2020",
      tipo: "Delivery",
      local: "SOTOMAYOR ROCHE E HIJOS",
      entregaA: "Envío de documentos 003",
      detalle: "Retirar de dirección Ana de Ayala N 27-130 y La Touta y entregar en Barrio Vista Hermosa Calle B y Pasaje B, Lote 22 Las Casas, Tanya Saragozin +593 96-991-6096. Puede entregar hasta viernes max.",
      estatus: {
        id:"Cancelado",
        fecha:"08/06/2020"
      }
    },

  ];

}
