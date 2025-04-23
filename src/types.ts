export interface IEntry {
    startTime: string;
    endTime: string;
    desc: string;
    id: string;
    category?: string;
    projectId?: string;
}

export interface Category {
    id: string;
    name: string;
    color: string;
}

export interface Project {
    id: string;
    name: string;
    color: string;
}