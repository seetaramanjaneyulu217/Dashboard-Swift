export interface InputBoxProps {
    type: string;
    label: string;
    value: string | number;
}

export interface SortItemProps {
    sortItems: (sortType: string) => any;
    text: string;
}

export interface SortType {
    type: string;
    count: number;
}

export interface UserDetails {
    address?: {
        city: string;
        geo: {
            lat: string;
            lng: string;    
        },
        street: string;
        suite: string;
        zipcode: string;
    },
    company?: {
        bs: string;
        catchPhrase: string;
        name: string;
    },
    email?: string;
    id?: number;
    name?: string;
    phone?: string;
    username?: string;
    website?: string;
}

export interface CommentsDetails {
    body?: string;
    email?: string;
    id?: number;
    name?: string;
    postId?: number
}