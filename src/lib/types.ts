export type ServerNews<T> = {
    status: number
    type: string
    data: T
};

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
    data: T[]
    filtered: T[]
    search: string
};

export type CourseModel = {
    title: string
    img: string
    url: string
    intro: string
    curriculum: string
    compInro: string
    specialization: string
    opportunities: string
    experience: string
};

export type ResultModel<T> = {
    status: number
    type: string
    data: T
}