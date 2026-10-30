import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  PERFIL_INICIAL,
  cargarPerfil,
  guardarPerfil,
} from '../utils/perfilStorage';

const UsuarioContext = createContext(null);

export function UsuarioProvider({ children }) {
  const [perfil, setPerfil] = useState({ ...PERFIL_INICIAL });
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [perfilCargado, setPerfilCargado] = useState(false);
  const [guardandoPerfil, setGuardandoPerfil] = useState(false);
  const [errorPerfil, setErrorPerfil] = useState(null);
  const perfilRef = useRef({ ...PERFIL_INICIAL });
  const lecturaCompletaRef = useRef(false);
  const guardandoRef = useRef(false);

  const reintentarCarga = useCallback(async () => {
    setCargandoPerfil(true);
    setErrorPerfil(null);

    try {
      const perfilGuardado = await cargarPerfil();

      if (perfilGuardado === null) {
        lecturaCompletaRef.current = false;
        setPerfilCargado(false);
        setErrorPerfil('No se pudo cargar el perfil. Reintentá la lectura.');
        return false;
      }

      perfilRef.current = perfilGuardado;
      setPerfil(perfilGuardado);
      lecturaCompletaRef.current = true;
      setPerfilCargado(true);
      return true;
    } finally {
      setCargandoPerfil(false);
    }
  }, []);

  useEffect(() => {
    void reintentarCarga();
  }, [reintentarCarga]);

  const actualizarPerfil = useCallback(async (cambios) => {
    if (
      !lecturaCompletaRef.current
      || guardandoRef.current
      || !cambios
      || typeof cambios !== 'object'
    ) {
      return false;
    }

    const cambiosPermitidos = {};

    if (typeof cambios.nombre === 'string') {
      cambiosPermitidos.nombre = cambios.nombre.trim();
    }

    if (typeof cambios.email === 'string') {
      cambiosPermitidos.email = cambios.email.trim();
    }

    if (typeof cambios.fotoUri === 'string' || cambios.fotoUri === null) {
      cambiosPermitidos.fotoUri = cambios.fotoUri;
    }

    if (Object.keys(cambiosPermitidos).length === 0) {
      return false;
    }

    guardandoRef.current = true;
    setGuardandoPerfil(true);

    const anterior = perfilRef.current;
    const siguiente = {
      ...anterior,
      ...cambiosPermitidos,
    };

    perfilRef.current = siguiente;
    setPerfil(siguiente);
    setErrorPerfil(null);

    try {
      await guardarPerfil(siguiente);
      return true;
    } catch {
      perfilRef.current = anterior;
      setPerfil(anterior);
      setErrorPerfil('No se pudieron guardar los cambios del perfil.');
      return false;
    } finally {
      guardandoRef.current = false;
      setGuardandoPerfil(false);
    }
  }, []);

  const value = useMemo(() => ({
    perfil,
    cargandoPerfil,
    perfilCargado,
    guardandoPerfil,
    errorPerfil,
    actualizarPerfil,
    reintentarCarga,
  }), [
    perfil,
    cargandoPerfil,
    perfilCargado,
    guardandoPerfil,
    errorPerfil,
    actualizarPerfil,
    reintentarCarga,
  ]);

  return (
    <UsuarioContext.Provider value={value}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error('useUsuario debe utilizarse dentro de UsuarioProvider.');
  }

  return context;
}
