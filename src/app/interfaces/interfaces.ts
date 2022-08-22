import { AnimationBuilder } from "@ionic/angular";

export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
}

export interface Slides {
    img:    string;
    titulo: string;
    desc:   string;
}

export interface Perfil {
    id: string;
    usuario: string;
    nombre: string;
    telefono: string;
    avatar: string;
    rol: number;
}
export interface Complejo{
    idComplejo: string;
    id: string;
    usuario: string;
    nombre: string;
    ubicacion: string;
    direccion: string;
    telefono: string;
    fb: string;
    ig: string;
    canchas: string;
    servicios: string;
    likes?: number;

}

export interface Like {
    uid: string;
    user: Perfil;
    fecha: any;
    like: boolean;

}

export interface Rate {
    uid: string;
    estado: boolean;
    fecha: any;
    rates: number;

}

export interface HoraLibre{
    hlid: string;
    dia: string;
    horas: string;
    cancha: string;
    estadoP: EstadoPublicacion;
    fechaCreacion: Date;
}

export interface Reserva {
    rid: string;
    cuid: string;
    alquiler: AlquilerSolicitado[];
    estadoAlquiler: EstadoAlquiler;
    uid?: Perfil;
    fechaPick?: string;
    nombre: string;

}


 export interface AlquilerSolicitado {
     reserva: HoraLibre;
     cantidad: number;
 }


export type TipoRol = 'jugador' | 'complejo';

export type Turnos = 'Mañana' | 'Tarde' | 'Noche';

export type TurnoM = '08' | '09' | '10' | '11' | '12' | '13';

export type TurnoT = '14' | '15' | '16' | '17' | '18' ;

export type TurnoN = '19' | '20' | '21' | '22' | '23' ;

export type Canchas = 'Cancha 1' | 'Cancha 2' | 'Cancha 3' | 'Cancha 4';

export type EstadoAlquiler = 'Libre' | 'Alquilada' | 'Pagado' | 'No Pagado';

export type EstadoPublicacion = 'Publicado' | 'Publicar';
