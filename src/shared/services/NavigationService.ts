import type { User } from '../../shared/domain/Auth';

export interface RouteConfig {
  [role: string]: string;
}

export class NavigationService {
  // Ruta por defecto 
  private static readonly DEFAULT_ROUTE = '/home';

  /**
   * Obtiene la ruta de destino basada en el rol del usuario
   */
  static getRouteForUser(user: User): string {
    if (!user?.role) {
      console.warn('NavigationService: Usuario o rol no válido, usando ruta por defecto');
      return this.DEFAULT_ROUTE;
    }

    // Admin y monitor van a la misma ruta inicial
    const role = user.role.toLowerCase();
    if (role === 'admin' || role === 'monitor') {
      console.log(`NavigationService: Usuario '${user.username}' con rol '${user.role}' dirigido a /home`);
      return '/home';
    }

    console.warn(`NavigationService: Rol '${user.role}' no autorizado para acceso`);
    return this.DEFAULT_ROUTE;
  }

  /**
   * Verifica si un usuario tiene acceso a una ruta específica
   */
  static canAccessRoute(user: User, route: string): boolean {
    if (!user?.role) {
      return false;
    }

    const role = user.role.toLowerCase();
    
    // Solo admin y monitor tienen acceso
    if (role !== 'admin' && role !== 'monitor') {
      return false;
    }

    // Admin y monitor tienen acceso a todas las rutas del sistema
    const allowedRoutes = [
      '/home',
      '/inventory',
      '/users', 
      '/resources'
    ];

    return allowedRoutes.some(allowedRoute => 
      route.startsWith(allowedRoute) || route === '/'
    );
  }

  /**
   * Obtiene las rutas disponibles para un rol específico
   */
  static getAvailableRoutes(user: User): Array<{path: string, label: string}> {
    if (!user?.role) {
      return [{ path: '/home', label: 'Inicio' }];
    }

    const role = user.role.toLowerCase();
    
    // Solo admin y monitor tienen acceso
    if (role !== 'admin' && role !== 'monitor') {
      return [{ path: '/home', label: 'Inicio' }];
    }

    // Ambos roles tienen acceso completo a todas las funcionalidades
    return [
      { path: '/home', label: 'Inicio' },
      { path: '/inventory', label: 'Inventario' },
      { path: '/users', label: 'Usuarios' },
      { path: '/resources', label: 'Recursos' },
    ];
  }

  /**
   * Verifica si el usuario tiene un rol autorizado para acceder al sistema
   */
  static isAuthorizedRole(user: User): boolean {
    if (!user?.role) {
      return false;
    }

    const role = user.role.toLowerCase();
    return role === 'admin' || role === 'monitor';
  }
}