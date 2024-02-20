import type { Session } from "@supabase/supabase-js";
import {writable} from "svelte/store";
import type { ApplicationModel, FormModel, SearchStoreModel } from "./types";

export const navState = writable({

    activeItem: "",

    session:<Session | null> null,

    creator: [
        {
            title: "Mike Shares Code",
            url: "/"
        }
    ],

    defaultNav: [
        {
            title: "Home",
            url: "/"
        },

        {
            title: "Scholarship",
            url: "/scholarship"
        },

        {
            title: "Admission",
            url: "/admission",
        },
    ],

    studentNav: [
        {
            title: "Home",
            url: "/"
        },

        {
            title: "Scholarship",
            url: "/scholarship"
        },

        {
            title: "Admission",
            url: "/admission",
        },

        {
            title: "Status",
            url: "/status"
        },
    ],

    adminNav: [
        {
            title: "Home",
            url: "/"
        },

        {
            title: "Scholarship",
            url: "/scholarship"
        },

        {
            title: "Admission",
            url: "/admission",
        },

        {
            title: "Pending",
            url: "/pending"
        },

    ],
})

export const adminState = writable({

});

export const studentState = writable({
    student_form:<ApplicationModel | null> null,
});

//generators
export const generatedText = writable([
    "Embark on a journey of education and connection! Join our website for seamless enrollment and vibrant global interactions with fellow students.",

    "Enroll effortlessly and amplify your learning experience. Our platform fosters global connections through interactive posting and chatting.",

    "Empower your education with us! Enroll easily and engage in dynamic conversations, fostering a global community of knowledge seekers.",

    "Seize the opportunity to enroll and connect! Our website combines easy enrollment with interactive features for global student networking.",

    "Unlock a world of learning and friendship! Enroll seamlessly and dive into lively discussions with students worldwide.",

    "Join our educational hub for effortless enrollment and vibrant global interactions. Explore, post, and connect with students worldwide!",

    "Enroll with ease and connect globally! Our platform promotes learning through interactive discussions and student-to-student networking.",

    "Enrich your academic journey with us! Seamless enrollment, interactive posting, and global chatting unite students worldwide.",

    "Revolutionize your learning experience! Enroll effortlessly and engage in dynamic global conversations with fellow students.",

    "Enrollment made simple, connections made global! Join our platform for an interactive experience with students around the world.",

    "Seamless enrollment, boundless interactions! Join us to connect with students globally through vibrant posting and chatting.",

    "Enroll and explore a world of knowledge! Our platform fosters global connections, interactive posting, and student engagement.",

    "Join our vibrant community! Effortless enrollment meets global interactions – the perfect platform for students seeking knowledge and connections.",

    "Enroll with ease and connect effortlessly! Our website is your gateway to global learning and dynamic student interactions.",

    "Elevate your educational experience! Enroll seamlessly and engage in dynamic global conversations with students passionate about learning.",

    "Empower your education, amplify your connections! Our platform offers easy enrollment and dynamic global interactions for students worldwide.",

    "Seamless enrollment, boundless connections! Join us for an enriching educational journey filled with global interactions and vibrant discussions.",

    "Enroll with ease, connect globally! Join our platform for interactive posting and dynamic chatting with a diverse community of students.",

    "Discover a world of learning and camaraderie! Effortless enrollment, interactive posting, and global chatting await you on our platform.",

    "Transform your education journey! Enroll effortlessly and immerse yourself in global interactions, vibrant posting, and student camaraderie.",

    "Join us for an educational adventure! Effortless enrollment, interactive posting, and global chatting connect students around the world.",

    "Enroll effortlessly, connect instantly! Dive into a world of global interactions and dynamic conversations with fellow students.",

    "Unlock the door to knowledge and connections! Seamless enrollment and vibrant global interactions define our platform.",

    "Seamless enrollment, boundless connections! Join us for an educational experience that includes interactive posting and global chatting.",

    "Empower your education, amplify your connections! Our platform offers easy enrollment and dynamic global interactions for students worldwide.",

    "Seamless enrollment, boundless connections! Join us for an enriching educational journey filled with global interactions and vibrant discussions.",

    "Join our vibrant community! Effortless enrollment meets global interactions – the perfect platform for students seeking knowledge and connections.",

    "Enroll with ease and connect effortlessly! Our website is your gateway to global learning and dynamic student interactions.",

    "Elevate your educational experience! Enroll seamlessly and engage in dynamic global conversations with students passionate about learning.",

    "Empower your education, amplify your connections! Our platform offers easy enrollment and dynamic global interactions for students worldwide.",

    "Seamless enrollment, boundless connections! Join us for an enriching educational journey filled with global interactions and vibrant discussions.",

    "Enroll with ease, connect globally! Join our platform for interactive posting and dynamic chatting with a diverse community of students.",

    "Discover a world of learning and camaraderie! Effortless enrollment, interactive posting, and global chatting await you on our platform.",

    "Transform your education journey! Enroll effortlessly and immerse yourself in global interactions, vibrant posting, and student camaraderie.",

    "Join us for an educational adventure! Effortless enrollment, interactive posting, and global chatting connect students around the world.",

    "Enroll effortlessly, connect instantly! Dive into a world of global interactions and dynamic conversations with fellow students.",

    "Unlock the door to knowledge and connections! Seamless enrollment and vibrant global interactions define our platform.",

    "Seamless enrollment, boundless connections! Join us for an enriching educational journey filled with global interactions and vibrant discussions.",

    "Join our vibrant community! Effortless enrollment meets global interactions – the perfect platform for students seeking knowledge and connections.",

    "Enroll with ease and connect effortlessly! Our website is your gateway to global learning and dynamic student interactions.",

    "Elevate your educational experience! Enroll seamlessly and engage in dynamic global conversations with students passionate about learning.",

    "Empower your education, amplify your connections! Our platform offers easy enrollment and dynamic global interactions for students worldwide.",

    "Seamless enrollment, boundless connections! Join us for an enriching educational journey filled with global interactions and vibrant discussions.",

    "Enroll with ease, connect globally! Join our platform for interactive posting and dynamic chatting with a diverse community of students.",

    "Discover a world of learning and camaraderie! Effortless enrollment, interactive posting, and global chatting await you on our platform.",

    "Transform your education journey! Enroll effortlessly and immerse yourself in global interactions, vibrant posting, and student camaraderie.",

    "Join us for an educational adventure! Effortless enrollment, interactive posting, and global chatting connect students around the world.",

    "Enroll effortlessly, connect instantly! Dive into a world of global interactions and dynamic conversations with fellow students.",

    "Unlock the door to knowledge and connections! Seamless enrollment and vibrant global interactions define our platform.",

    "Seamless enrollment, boundless connections! Join us for an enriching educational journey filled with global interactions and vibrant discussions.",

    "Join our vibrant community! Effortless enrollment meets global interactions – the perfect platform for students seeking knowledge and connections.",

    "Enroll with ease and connect effortlessly! Our website is your gateway to global learning and dynamic student interactions.",

    "Elevate your educational experience! Enroll seamlessly and engage in dynamic global conversations with students passionate about learning.",

    "Empower your education, amplify your connections! Our platform offers easy enrollment and dynamic global interactions for students worldwide.",

    "Seamless enrollment, boundless connections! Join us for an enriching educational journey filled with global interactions and vibrant discussions.",

    "Enroll with ease, connect globally! Join our platform for interactive posting and dynamic chatting with a diverse community of students.",

    "Discover a world of learning and camaraderie! Effortless enrollment, interactive posting, and global chatting await you on our platform.",

    "Transform your education journey! Enroll effortlessly and immerse yourself in global interactions, vibrant posting, and student camaraderie.",

    "Join us for an educational adventure! Effortless enrollment, interactive posting, and global chatting connect students around the world.",

    "Enroll effortlessly."
]);

//search store
export const createSearchStore = <T extends Record<PropertyKey, any>>(data: T[]) => 
{
    const {subscribe, set, update} = writable<SearchStoreModel<T>>({data, filtered: data, search: ""});

    return {subscribe, set, update};
};

export const searchHandler = <T extends Record<PropertyKey, any>>(store:SearchStoreModel<T>) =>
{
    const searchTerm = store.search.toLocaleLowerCase() || "";
    store.filtered = store.data.filter( (item) => { return item.searchTerms.toLocaleLowerCase().includes(searchTerm) });
};
