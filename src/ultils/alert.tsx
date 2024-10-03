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
    position: "top-right"
    });
}
export function AlertLoading(msg:string) {
    const id = toast.loading(`${msg}`, {
    position: "top-right",
    autoClose: 60
    });
    return id
}
export function AlertUpdateLoading(id:any, type:"error"|"success", msg:string) {
    toast.update(id,{ render: msg, type:type, isLoading: false,position: "top-right" , autoClose: 1500 })
}