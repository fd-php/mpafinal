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

export type TipoRol = 'jugador' | 'complejo';
