import { ErrorCodes as EC } from '../interfaces';

export const MESSAGES: Record<EC, Record<string, string>> = {
  [EC.CredentialsNotValid]: {
    es: 'Credenciales incorrectas. Verifique su usuario y contraseña.',
    en: 'Incorrect credentials. Check your username and password.',
  },
  [EC.TokenNotValid]: {
    es: 'Token inválido.',
    en: 'Invalid token.',
  },
  [EC.CategoryNotFound]: {
    es: 'Categoría no encontrada.',
    en: 'Category not found.',
  },
  [EC.TransactionNotFound]: {
    es: 'Transacción no encontrada.',
    en: 'Transaction not found.',
  },
  [EC.BudgetNotFound]: {
    es: 'Presupuesto no encontrado.',
    en: 'Budget not found.',
  },
  [EC.GoalNotFound]: {
    es: 'Meta no encontrada.',
    en: 'Goal not found.',
  },
  [EC.UnauthorizedRequest]: {
    es: 'Sin permisos para realizar esta acción.',
    en: 'No permission to perform this action.',
  },
  [EC.FilterTransactionRequired]: {
    es: 'Se requiere al menos un filtro para las transacciones.',
    en: 'At least one filter is required for transactions.',
  },
  [EC.KeyAlreadyExist]: {
    es: 'El valor clave ya existe. Use uno diferente.',
    en: 'Key already exists. Use a different one.',
  },
  [EC.UnKnowException]: {
    es: 'Error inesperado. Contacte al administrador.',
    en: 'Unexpected error. Contact the administrator.',
  },
};
