export const capitalize = (input: string) =>
    input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();

export const correctZona = (input: string) =>
    input
        .split("-")
        .map((el) => capitalize(el))
        .join(" ");
