import { toast } from 'react-toastify';

// Exportação nomeada
export function AlertSuccess(msg:string) {
    toast.success(`${msg}`, {
        position: "top-right"
    });
}
export function AlertWarning(msg:string) {
    toast.warn(`${msg}`, {
        position: "top-right"
    });
}
export function AlertError(msg:string) {
    toast.error(`${msg}`, {
        position: "top-right"
    });
}
export function AlertDefault(msg:string) {
    toast.info(`${msg}`, {
    position: "bottom-center"
    });
}