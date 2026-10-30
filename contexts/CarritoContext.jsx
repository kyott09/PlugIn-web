import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { productos } from '../data/products';
import {
  cargarCarrito,
  guardarCarrito,
} from '../utils/carritoStorage';

const CarritoContext = createContext(null);
const idsProductos = new Set(productos.map((producto) => producto.id));

function normalizarItems(items) {
  const cantidades = new Map();

  items.forEach((item) => {
    if (
      Number.isInteger(item.id)
      && idsProductos.has(item.id)
      && Number.isInteger(item.cantidad)
      && item.cantidad > 0
    ) {
      cantidades.set(
        item.id,
        (cantidades.get(item.id) ?? 0) + item.cantidad
      );
    }
  });

  return [...cantidades.entries()].map(([id, cantidad]) => ({
    id,
    cantidad,
  }));
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cargandoCarrito, setCargandoCarrito] = useState(true);
  const [carritoCargado, setCarritoCargado] = useState(false);
  const [guardandoCarrito, setGuardandoCarrito] = useState(false);
  const [errorCarrito, setErrorCarrito] = useState(null);
  const itemsRef = useRef([]);
  const lecturaCompletaRef = useRef(false);
  const guardandoRef = useRef(false);

  const reintentarCarga = useCallback(async () => {
    setCargandoCarrito(true);
    setErrorCarrito(null);

    try {
      const carritoGuardado = await cargarCarrito();

      if (carritoGuardado === null) {
        lecturaCompletaRef.current = false;
        setCarritoCargado(false);
        setErrorCarrito('No se pudo cargar el carrito. Reintentá la lectura.');
        return false;
      }

      const itemsValidos = normalizarItems(carritoGuardado);
      itemsRef.current = itemsValidos;
      setItems(itemsValidos);
      lecturaCompletaRef.current = true;
      setCarritoCargado(true);
      return true;
    } finally {
      setCargandoCarrito(false);
    }
  }, []);

  useEffect(() => {
    void reintentarCarga();
  }, [reintentarCarga]);

  const commit = useCallback(async (nuevosItems) => {
    if (!lecturaCompletaRef.current || guardandoRef.current) {
      return false;
    }

    guardandoRef.current = true;
    setGuardandoCarrito(true);

    const anteriores = itemsRef.current;
    const siguientes = normalizarItems(nuevosItems);

    itemsRef.current = siguientes;
    setItems(siguientes);
    setErrorCarrito(null);

    try {
      await guardarCarrito(siguientes);
      return true;
    } catch {
      itemsRef.current = anteriores;
      setItems(anteriores);
      setErrorCarrito('No se pudieron guardar los cambios del carrito.');
      return false;
    } finally {
      guardandoRef.current = false;
      setGuardandoCarrito(false);
    }
  }, []);

  const agregarProducto = useCallback((producto) => {
    if (!producto || !idsProductos.has(producto.id)) {
      return Promise.resolve(false);
    }

    const actuales = itemsRef.current;
    const existe = actuales.find((item) => item.id === producto.id);
    const siguientes = existe
      ? actuales.map((item) => (
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ))
      : [...actuales, { id: producto.id, cantidad: 1 }];

    return commit(siguientes);
  }, [commit]);

  const cambiarCantidad = useCallback((id, delta) => {
    const item = itemsRef.current.find((actual) => actual.id === id);

    if (!item || (delta < 0 && item.cantidad <= 1)) {
      return Promise.resolve(false);
    }

    return commit(itemsRef.current.map((actual) => (
      actual.id === id
        ? { ...actual, cantidad: actual.cantidad + delta }
        : actual
    )));
  }, [commit]);

  const quitarProducto = useCallback((id) => (
    commit(itemsRef.current.filter((item) => item.id !== id))
  ), [commit]);

  const cantidadTotal = useMemo(
    () => items.reduce((total, item) => total + item.cantidad, 0),
    [items]
  );

  const total = useMemo(() => (
    items.reduce((importe, item) => {
      const producto = productos.find((actual) => actual.id === item.id);
      return importe + (producto ? producto.precio * item.cantidad : 0);
    }, 0)
  ), [items]);

  const value = useMemo(() => ({
    items,
    cantidadTotal,
    total,
    cargandoCarrito,
    carritoCargado,
    guardandoCarrito,
    errorCarrito,
    agregarProducto,
    cambiarCantidad,
    quitarProducto,
    reintentarCarga,
  }), [
    items,
    cantidadTotal,
    total,
    cargandoCarrito,
    carritoCargado,
    guardandoCarrito,
    errorCarrito,
    agregarProducto,
    cambiarCantidad,
    quitarProducto,
    reintentarCarga,
  ]);

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error('useCarrito debe utilizarse dentro de CarritoProvider.');
  }

  return context;
}
