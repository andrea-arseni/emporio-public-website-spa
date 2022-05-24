export const stringifyNumber = (input: number) => {
    let numberAsString = input.toString();
    let invertedString = "";
    let counter = 0;
    for (let i = numberAsString.length - 1; i >= 0; i--) {
        counter++;
        if (numberAsString[i] === ".") {
            invertedString = invertedString + ",";
            continue;
        }
        invertedString = invertedString + numberAsString[i];
        if (counter % 3 === 0 && i !== 0) invertedString = invertedString + ".";
    }
    let output = "";
    for (let i = invertedString.length - 1; i >= 0; i--) {
        output = output + invertedString[i];
    }
    return output;
};

export const cleanPhoneNumber = (input: string | number) => {
    return input.toString().trim().replaceAll(" ", "").replaceAll("/", "");
};
