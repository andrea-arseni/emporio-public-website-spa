export const capitalize = (input: string) =>
    input.substring(0, 1).toUpperCase() + input.substring(1);

export const capitalizeAllWords = (input: string) =>
    input
        .split(" ")
        .map((el) => capitalize(el))
        .join(" ");

export const correctZona = (input: string) =>
    input
        .split("-")
        .map((el) => capitalize(el))
        .join(" ");
