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
};

export type ApplicationModel = {
    id: number
    created_at: string
    user_email: string
    user_fullname: string
    user_application: string
    is_accepted: boolean
    application_type: "senior high" | "college"
}

//sub type for user_application after parse
export type FormModel = {
    selected_course: string
    present_address: string
    religion: string
    date_of_birth: string
    fathers_fname: string
    mothers_fname: string
}