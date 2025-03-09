export interface Tarefa {
    id: string
    usuario_id: number
    descricao: string
    agendamento?: string
    comentarios?: string
}